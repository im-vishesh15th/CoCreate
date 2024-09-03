import React from 'react';
import styled from 'styled-components';
import { Search, LogOut, Plus } from 'lucide-react';

import  { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Avatar ,Box} from "@mui/material";
import { motion } from 'framer-motion';

const DashboardContainer = styled.div`
  font-family: 'Playfair Display', serif;
  color: #333;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
`;

const Header = styled.header`
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const AnimatedBox = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right:auto;
  color: #000000;
  font-size: 4rem;
  justify-content:center;
  text-align: center;

  @media (max-width: 800px) {
    margin-left: 0;
    font-size: 2.9rem;
  }
  @media (max-width: 600px) {
    margin-left: 0;
    font-size: 1.9rem;
  }
`;



const Logo = styled.h1`
  font-size: 2rem;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  width: 300px;
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
  }

  input {
    border: none;
    background: transparent;
    margin-left: 0.5rem;
    font-size: 1rem;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;



const LogoutButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const MainContent = styled.main`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #000;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
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

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const DocumentCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid black;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.563);
  }
`;


const DocumentInfo = styled.div`
  padding: 1rem;
  

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const DocumentTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DocumentDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CreateNewButton = styled.button`
  width: 70mm;
  height: 90mm;
  max-width: 100%;
  max-height: 80vh;
  background-color: #fff;
  border: 2px dashed #000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem auto;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 50mm;
    height: 60mm;
  }
`;


const CreateNewIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CreateNewText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export default function Dash() {
  
  const { user ,logout} = useAuth();
  const [documents, setDocuments] = useState({ docids: [], codocids: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState({ docids: [], codocids: [] });
  const navigate = useNavigate();


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDocuments(documents);
    } else {
      const filtered = {
        docids: documents.docids.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        codocids: documents.codocids.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      };
      setFilteredDocuments(filtered);
    }
  
  }, [documents, searchTerm]);
  const fetchnewDocuments = async () => {
    try {
      const id = uuid();
      const coverpageno = Math.floor(Math.random() * (10) + 1);
     
      await axios.post(`https://cocreate-80yn.onrender.com/documents/user/doc/new`, { id, user, coverpageno });
      navigate(`/docs/${id}`);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchDocuments = async () => {
        try {
          const { data } = await axios.get(`https://cocreate-80yn.onrender.com/documents/user/${user._id}`, { withCredentials: true });
         
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
    <DashboardContainer>
      <Header>
        <Logo>CoCreate</Logo>
        <SearchBar>
          <Search size={20} />
          <input type="text" placeholder="Search documents..."  value={searchTerm}
        onChange={handleSearchInputChange}/>
        </SearchBar>
        <UserActions>
         
          <Avatar style={{ height: "60px", width: "60px", border: "solid gray 2px"}} src={user.profileImage} />
          
          <LogoutButton onClick={logoutfunc}>
            <LogOut size={18} />
            Logout
          </LogoutButton>
        </UserActions>
      </Header>
      <MainContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", flex: 1 }}>
        <CreateNewButton variant="contained"
            
            onClick={() => fetchnewDocuments()}
            sx={{ m: 3, width: '300px', height: '400px',' @media (max-width: 600px)':{height:'100px'} }}>
          <CreateNewIcon>
            <Plus size={48} />
          </CreateNewIcon>
          <CreateNewText>Create New Document</CreateNewText>
        </CreateNewButton>
        <AnimatedBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >

            Welcome to CoCreate.   <br /> {user.username}

          </AnimatedBox>
        </Box>

        {filteredDocuments.docids.length === 0 && filteredDocuments.codocids.length === 0 && <SectionTitle>No Matches Found...</SectionTitle>}
        {filteredDocuments.docids && filteredDocuments.docids.length > 0 && (
          <>
        <SectionTitle>My Documents</SectionTitle>
        <DocumentGrid>
          {filteredDocuments.docids.map((doc) => (
            <DocumentCard key={doc.id}  onClick={() => navigate(`/docs/${doc._id}`)}>
             
                 <ImageContainer>
                        <img src={require(`../placeholders/${doc.coverpageno}.jpg`)} alt="coverpage" />

                      </ImageContainer>
              
              <DocumentInfo>
                <DocumentTitle>{doc.title}.txt</DocumentTitle>
                <DocumentDate>Last modified: {doc.updatedAt.substring(0, 10)}</DocumentDate>
              </DocumentInfo>
            </DocumentCard>
          ))}
        </DocumentGrid>
        </>
        )}
    {filteredDocuments.codocids && filteredDocuments.codocids.length > 0 && (
       <>
       <SectionTitle>Shared with Me</SectionTitle>
        <DocumentGrid>
          {filteredDocuments.codocids.map((doc) => (
            <DocumentCard key={doc.id}  onClick={() => navigate(`/docs/${doc._id}`)}>
              {/* <DocumentCover> */}
              <ImageContainer>
                        <img src={require(`../placeholders/${doc.coverpageno}.jpg`)} alt="coverpage" />

                      </ImageContainer>
              {/* </DocumentCover> */}
              <DocumentInfo>
                <DocumentTitle>{doc.title}.txt</DocumentTitle>
                <DocumentDate>Last modified: {doc.updatedAt && doc.updatedAt.substring(0, 10)} </DocumentDate>
              </DocumentInfo>
            </DocumentCard>
          ))}
        </DocumentGrid>
        </>
        )}
      </MainContent>
    </DashboardContainer>
  );
}
