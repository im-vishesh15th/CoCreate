import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  max-width: 400px;
  margin: 20px auto;
  background: #ffffffb7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width:300px;
  height: auto;
  margin:20px;
  padding: 10px;
`;

const Header = styled.div`
  background: white;
  color: black;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  font-size: 2rem;
  font-weight:bold;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px; /* Limit height for scrolling */
  overflow-y: auto; 
  /* Enable scrolling */
`;

const ListItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height:40px;
  border-radius: 50%;
  margin-right: 10px;
  border:1.5px solid black;
`;

const CollaboratorsList = ({ collaborators }) => {

    const {user}=useAuth();
    
  return (
    <Container>
      <Header>Shared With ...</Header>
      <List>
      <ListItem >
            <Avatar src={user.profileImage} alt="Avatar" />
            <span style={{fontSize:"1.25rem"}} >{user.username+" (You)"}</span>
          </ListItem>
        {collaborators.map((collaborator, index) => (
              (collaborator._id!==user._id &&
          <ListItem key={index}>
            <Avatar src={collaborator.profileImage} alt="Avatar" />
            <span style={{fontSize:"1.25rem"}}>{collaborator.username}</span>
          </ListItem>
        )))}
      </List>
    </Container>
  );
};

export default CollaboratorsList;