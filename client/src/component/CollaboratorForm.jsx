import { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const GradientButton = styled(Button)`
  background-color: #1976d2;
  color: white;
  margin:10px;
  &:hover {
    background-color: #1565c0;
  }
`;


const CollaboratorForm = ({ documentId ,onClose, onCollaboratorAdded  }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const token = localStorage.getItem('token');
       const res= await axios.post('https://cocreate-o3gz.onrender.com/documents/user/add-collaborator', {
            documentId,
            collaboratorEmail: email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmail('');
        setError('');
       
        setMessage(res.data?.message)
        setTimeout(() => {
            onCollaboratorAdded();
            onClose();
          }, 2500);
      
    }catch(e)
    {
       
       setMessage("");
        console.error('Error adding collaborator:', e);
        setError(e.response?.data?.message || '');
    }
    };

    return (
        
        <FormContainer>
        <TextField
            label="Collaborator Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

    {error && <p style={{ color: 'red' }}>{error}</p>}
    {message && <p style={{ color: 'green' }}>{message}</p>}
        <GradientButton  label="Collaborator Email" variant="contained" onClick={handleSubmit}>Add Collaborator</GradientButton>
    </FormContainer>
    );
};

export default CollaboratorForm;
