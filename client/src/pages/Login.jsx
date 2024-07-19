import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  background: url("https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?w=2000&t=st=1721074043~exp=1721074643~hmac=90cb94d9d98f73bf56e8f088b5d65bb312aa662eabebccf850b7c75776285a1e") center;
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
  //padding: 10px;
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

const Button = styled.button`
   width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #04e762;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px ;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8bf878;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  background: #04e762;
  color: white;
  transition: background 0.3s ease, transform 0.2s ease;
  &:hover {
    background: #8bf878;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
   // window.location.reload();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
          {error && <Error>{error}</Error>}
          <Link href="#">Forgot your password?</Link>
          <Link  onClick={() => navigate('/register',{ replace: true })}>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;