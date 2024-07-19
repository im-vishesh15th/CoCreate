import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  IconButton,


} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from "@mui/material";
import logo from "../logo.png"


const BackgroundBox = styled(Box)`
  background-color: #000;
  min-height: 100vh;
  padding-top: 2rem;
`;

const StyledCard = styled(Card)`
  border-radius: 15px;
  background: #1a1a1a;
  color: #e0e0e0;
  margin-bottom: 20px;
  margin-right: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 40px rgba(225, 255, 1, 0.7);
  }

  
`;

const ImageContainer = styled.div`
  height: 250px;
  width: auto;
  background: #333;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(145deg, #4000ffdd, #ffee0091);
  color: #fff;
  &:hover {
    background: linear-gradient(145deg, #4000ff66, #ffee0047);
    border: px solid grey;
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const AnimatedBox = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  margin-left: 20px;
  color: white;
  font-size: 3.5rem;
  justify-content: center;
  text-align: center;

  @media (max-width: 600px) {
    margin-left: 0;
    font-size: 1.5rem;
  }
`;



const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: #1a1a1a;
    input {
      color: #fff;
    }
  }
  fieldset {
    border-color: #555;
  }
  &:hover fieldset {
    border-color: #777;
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;



const LogoImage = styled.img`
  height: 100px;
  width: auto;
  margin-bottom: 20px;
  transform: translateX(-50%);
  
  @media (max-width: 600px) {
    height: 80px;
    margin-bottom: 10px;
    margin-left:20%
  }
`;


const ProfileBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AvatarWrapper = styled(Box)`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Dashboard = () => {
  const { user ,logout} = useAuth();
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const navigate = useNavigate();


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDocuments(documents);
    } else {
     
      const filtered = documents.docids.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filtered2 = documents.codocids.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      setFilteredDocuments({ docids: [...filtered], codocids: [...filtered2] });
    }
  
  }, [documents, searchTerm]);
  const fetchnewDocuments = async () => {
    try {
      const id = uuid();
      const coverpageno = Math.floor(Math.random() * (10) + 1);
     
      await axios.post(`https://glittering-sopapillas-817a00.netlify.app/documents/user/doc/new`, { id, user, coverpageno });
      navigate(`/docs/${id}`);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchDocuments = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3000/documents/user/${user._id}`, { withCredentials: true });
         
          setDocuments(data);
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      };

      fetchDocuments();
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const logoutfunc=async()=>{
   await logout();
   navigate('/');
  }

  return (
    <BackgroundBox>
      <Box sx={{ height: '155px', backgroundColor: 'black', borderBottom: '1px solid white',
         display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', zIndex: '2', marginTop: '0px' }}>
        <LogoImage src={logo} alt="Logo" />
      </Box>
      <Container maxWidth="lg" >
      <ProfileBox>
    <AvatarWrapper>
      <Avatar style={{ height: "60px", width: "60px", border: "solid gray 2px", margin: "20px" }} src={user.profileImage} />
      <GradientButton 
        startIcon={<LogoutIcon />} 
        onClick={logoutfunc}
        sx={{ ml: 2 }}
      >
        Logout
      </GradientButton>
    </AvatarWrapper>
  </ProfileBox>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
  <StyledTextField
    placeholder="Search documents..."
    value={searchTerm}
    onChange={handleSearchInputChange}
    InputProps={{
      endAdornment: (
        <IconButton>
          <SearchIcon sx={{ color: 'white' }} />
        </IconButton>
      ),
    }}
    sx={{ width: '100%', marginBottom: '1rem' }}
  />
</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", flex: 1 }}>

          <GradientButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => fetchnewDocuments()}
            sx={{ m: 3, width: '300px', height: '400px',' @media (max-width: 600px)':{height:'100px'} }}
          >
            New Document
          </GradientButton>
          <AnimatedBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >

            Welcome to CoCreate.   <br /> {user.username}

          </AnimatedBox>
        </Box>

        {filteredDocuments.docids && filteredDocuments.docids.length > 0 && (
          <>
            <Typography sx={{ color: '#ff5500da', fontSize: '2.5rem' }} variant="h5" gutterBottom>
              Your Documents
            </Typography>
            <Grid container spacing={3}>
              {filteredDocuments.docids.map((doc) => (
                <Grid item xs={6} sm={6} md={4} key={doc._id}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <StyledCard>
                      <ImageContainer>
                        <img src={require(`../placeholders/${doc.coverpageno}.jpg`)} alt="coverpage" />

                      </ImageContainer>
                      <CardContent>
                        <Typography variant="h6">
                          {doc.title}.txt
                        </Typography>
                        {doc.updatedAt && <Typography variant="h9" sx={{ color: "pink" }}>
                          Last Modified at {doc.updatedAt.substring(0, 10)}
                        </Typography>}
                      </CardContent>
                      <CardActions>
                        <GradientButton
                          startIcon={<EditIcon />}
                          onClick={() => navigate(`/docs/${doc._id}`)}
                        >
                          Edit
                        </GradientButton>
                      </CardActions>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {filteredDocuments.codocids && filteredDocuments.codocids.length > 0 && (
          <>
            <Typography sx={{ color: '#ff5500da', fontSize: '2.5rem', mt: "4" }} variant="h5" gutterBottom>
              Shared Documents
            </Typography>
            <Grid container spacing={3}>
              {filteredDocuments.codocids.map((doc) => (
                <Grid item xs={12} sm={6} md={4} key={doc._id}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <StyledCard>
                      <ImageContainer>
                        <img src={require(`../placeholders/${doc.coverpageno}.jpg`)} alt="coverpage" />
                      </ImageContainer>
                      <CardContent>
                        <Typography variant="h6">
                          {doc.title && doc.title}.txt
                        </Typography>
                        {doc.updatedAt && <Typography variant="h9" sx={{ color: "pink" }}>
                          Last Modified at {doc.updatedAt.substring(0, 10)}
                        </Typography>}
                      </CardContent>
                      <CardActions>
                        <GradientButton
                          startIcon={<EditIcon />}
                          onClick={() => navigate(`/docs/${doc._id}`)}
                        >
                          Edit
                        </GradientButton>
                      </CardActions>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}

      </Container>
    </BackgroundBox>
  );
};

export default Dashboard;