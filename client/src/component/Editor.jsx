import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';
import { Box, Button, TextField, Toolbar } from '@mui/material';
import styled from '@emotion/styled';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import CollaboratorForm from './CollaboratorForm';
import CollaboratorsList from './CollaboratorsList'
import { saveAs } from 'file-saver';
import * as quillToWord from 'quill-to-word';
import { Badge, IconButton, Menu, MenuItem, Dialog, DialogContent, DialogTitle } from '@mui/material';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import AddIcon from '@mui/icons-material/Add';

const EditorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const EditorBox = styled(Box)`
  flex: 1;
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTextField = styled(TextField)`

  .MuiInputBase-root {
    background-color: #ffffff;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #e0e0e0;
    }
    &:hover fieldset {
      border-color: #bdbdbd;
    }
  }
`;

const ExportButton = styled(Button)`
  margin-left: 16px;
  margin-bottom: 20px;
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #1565c0;
  }
`;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  ['direction', { 'align': [] }],
  ['link', 'image', 'video', 'formula'],
  ['clean']
];

const Editor = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const [title, setTitle] = useState("Untitled Document");
  const { id } = useParams();
  const { user } = useAuth();
  const cursorsRef = useRef(null);
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const [collabers, setCollabers] = useState([]);
  const [collabAnchorEl, setCollabAnchorEl] = useState(null);
 
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const isCollabMenuOpen = Boolean(collabAnchorEl);

  useEffect(() => {
    
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`https://cocreate-80yn.onrender.com/documents/user/doc/${id}`, { withCredentials: true });
        setTitle(response.data.title);
        if (response.data.user === user._id) {
          setAccess(true);
        } else if (response.data.collaborators.includes(`${user._id}`)) {
          setAccess(true);
        }
        const token = localStorage.getItem('token');
        const documentId = id;
        const res = await axios.post('hhttps://cocreate-80yn.onrender.com/documents/user/get-collaborator', {
          documentId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCollabers(res.data.collabers);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, user]);


   
  useEffect(() => {
    if (!access) return;

    const quillContainer = document.getElementById('container');
    if (quillContainer) {
      Quill.register('modules/cursors', QuillCursors);
      const quillServer = new Quill(quillContainer, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          cursors: true,
        }
      });
      quillServer.disable();
      quillServer.setText('Loading the document...');
      setQuill(quillServer);
    } else {
      console.error('Quill container not found');
    }
  }, [access]);

  useEffect(() => {
    if (!quill) return;

    cursorsRef.current = quill.getModule('cursors');
    if (cursorsRef.current) {
     
    } else {
      console.error('Failed to initialize cursors module.');
    }
  }, [quill]);

  useEffect(() => {
    if (!access) return;

    const socketServer = io('https://cocreate-80yn.onrender.com');
    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    };
  }, [access]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (delta, oldData, source) => {
      if (source!== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handleChange);

    return () => {
      quill.off('text-change', handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (delta) => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handleChange);

    return () => {
      socket.off('receive-changes', handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (quill === null || socket === null) return;

    socket.once('load-document', document => {
      quill.setContents(document);
      quill.enable();
      cursorsRef.current.createCursor(user._id, user.username, 'grey');
    });

    socket.emit('get-document', { id, user, title });
  }, [quill, socket, id, user, title]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const interval = setInterval(() => {
      const data = quill.getContents();
      socket.emit('save-document', { data, user });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill,user]);

  useEffect(() => {
    if (!socket ||!quill ||!user) return;

    const handleSelectionChange = (range) => {
      if (range) {
      
        cursorsRef.current.moveCursor(user._id, { index: range.index, length: range.length });
        socket.emit('send-cursor', { userId: user._id, index: range.index, length: range.length, name: user.username });
      }
    };

    quill.on('selection-change', handleSelectionChange);

    return () => {
      quill.off('selection-change', handleSelectionChange);
    };
  }, [quill, socket, user]);

  useEffect(() => {
   
    if (!socket ||!cursorsRef.current) return;
   
    const handleCursorChange = ({ userId, index, length, name }) => {
        cursorsRef.current.createCursor(userId, name, 'black');
      cursorsRef.current.moveCursor(userId, { index, length });
    };

    socket.on('receive-cursor', handleCursorChange);

    return () => {
      socket.off('receive-cursor', handleCursorChange);
    };
  }, [socket]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(quill.getText(), 10, 10);
    doc.save(`${title}.pdf`);
  };

  const exportDOCX = async () => {
    const quillDelta = quill.getContents();
    const quillToWordConfig = { exportAs: 'blob' };
    const docAsBlob = await quillToWord.generateWord(quillDelta, quillToWordConfig);
    saveAs(docAsBlob, `${title}.docx`);
  };

  const exportTXT = () => {
    const text = quill.getText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${title}.txt`);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    socket.emit('save-title', { id, title: e.target.value });
  };
  const handleExport = (format) => {
    switch (format) {
        case 'pdf':
            exportPDF();
            break;
        case 'docx':
            exportDOCX();
            break;
        case 'txt':
            exportTXT();
            break;
        default:
            break;
    }
};
  const handleCollaboratorAdded = async () => {
    try {
      const token = localStorage.getItem('token');
      const documentId = id;
      const res = await axios.post('http://localhost:3000/documents/user/get-collaborator', {
        documentId,
    }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCollabers(res.data.collabers);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  const handleExportMenuOpen = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportAnchorEl(null);
  };

  const handleCollabMenuOpen = (event) => {
    setCollabAnchorEl(event.currentTarget);
  };

  const handleCollabMenuClose = () => {
    setCollabAnchorEl(null);
  };

  const handleFormDialogOpen = () => {
    setFormDialogOpen(true);
  };

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
  };




  return (
      access ?
       
   ( <EditorContainer>
   
    <Toolbar >
        
<StyledTextField
    label="Document Title"
    value={title}
    onChange={handleTitleChange}
    fullWidth
    margin="normal"
    inputProps={{ maxLength: 20 }} 
    
/>
<ExportButton  sx={{margin:"20px"}} onClick={handleExportMenuOpen}>Export</ExportButton>
<Menu
    anchorEl={exportAnchorEl}
    open={Boolean(exportAnchorEl)}
    onClose={handleExportMenuClose}
>
    <MenuItem onClick={() => handleExport('pdf')}>Export as PDF</MenuItem>
    <MenuItem onClick={() => handleExport('docx')}>Export as DOCX</MenuItem>
    <MenuItem onClick={() => handleExport('txt')}>Export as TXT</MenuItem>
</Menu>

<IconButton onClick={handleCollabMenuOpen} color="inherit">
    <Badge badgeContent={collabers.length} color="primary">
        <FolderSharedOutlinedIcon  sx={{height:"30px" ,width:"30px",margin:"10px"}}/>
    </Badge>
</IconButton>
<Menu
    anchorEl={collabAnchorEl}
    open={isCollabMenuOpen}
    onClose={handleCollabMenuClose}
>
   <CollaboratorsList collaborators={collabers} />
</Menu>
    <IconButton onClick={handleFormDialogOpen} color="inherit">
    <AddIcon sx={{height:"30px" ,width:"30px",margin:"10px"}}/>
</IconButton>
<Dialog
    open={formDialogOpen}
    onClose={handleFormDialogClose}
    aria-labelledby="form-dialog-title"
    maxWidth="sm"
    fullWidth
    disableBackdropClick
    disableEscapeKeyDown
    PaperProps={{
        style: {
            backdropFilter: 'blur(5px)',
        },
    }}
>
    <DialogTitle id="form-dialog-title">Add Collaborator</DialogTitle>
    <DialogContent>
        <CollaboratorForm documentId={id} onClose={handleFormDialogClose} onCollaboratorAdded={handleCollaboratorAdded} />
    </DialogContent>
</Dialog>
</Toolbar>
    <EditorBox id="container"></EditorBox>
</EditorContainer>
  )
: <h1>Not Accessible</h1>
);

}
export default Editor;
