import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import 'firebase/storage';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center;
  background-size: cover;
  animation: ${fadeIn} 1s ease-in;
  padding: 10px;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 35px;
  background-color: rgba(0, 0, 0, 0.869);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgb(0, 229, 255);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #04e762;
  text-shadow: 0px 0px 20px rgb(0, 229, 255);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
   width: 80%;
  padding: 15px;
  margin: 10%;
  margin-bottom: 10px;
  margin-top: 10px;
  
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #ffffff;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
    background-color: #f9f9f9;
  }
`;

const Link = styled.a`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  text-decoration: none;

  &:hover {
    color: #04e762;
  }
`;


const Error = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
const firebaseConfig = {
    apiKey: "AIzaSyAiSs6Ckt7UZkmNvwJXYqshKfyDj3zmXjs",
    authDomain: "docs-clone-2447d.firebaseapp.com",
    projectId: "docs-clone-2447d",
    storageBucket: "docs-clone-2447d.appspot.com",
    messagingSenderId: "1013362966586",
    appId: "1:1013362966586:web:642f68ec6392e1caa67503"
  };
initializeApp(firebaseConfig);
const storage = getStorage();

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let profileImageUrl = '';

            const upload=async()=>{
                const storageRef = ref(storage, `profileImages/${profileImage.name}`);
                const snapshot = await uploadBytes(storageRef, profileImage);
                profileImageUrl = await getDownloadURL(snapshot.ref);
               
            }
        
             await upload();
            await register({ username, email, password, profileImage: profileImageUrl });
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Register</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder='Username'
                    />
                    <Input
                        label="Email"
                        placeholder='Email'
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Password'
                    />
                    <Input
                        type="file"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                    <Button type="submit" variant="contained">Register</Button>
                    {error && <Error>{error}</Error>}
                    <Link  onClick={() => navigate('/login',{ replace: true })}>Account Already Exists ...</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
