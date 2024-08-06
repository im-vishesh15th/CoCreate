import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../logo.png';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
// Keyframe animation for text typing effect
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

// Keyframe animation for blinking cursor
const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #fff }
`;

// Main container styled-component
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  color: #fff;
`;

// Video background styled-component
const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

// Content wrapper with text and logo
const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Large logo styled-component
const Logo = styled.img`
  width: 250px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 40px;
`;

// Animated welcome text with typing effect
const WelcomeText = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  overflow: hidden; /* Hide overflow for typing effect */
  white-space: nowrap; /* Prevent text wrap */
  animation: ${typing} 4s steps(30, end) 1, ${blinkCaret} 0.75s step-end infinite;
  border-right: 2px solid #fff;
  margin-bottom: 20px;

  @media (max-width: 800px) {
   font-size: 2rem;
    }
`;

// Subtext below the welcome message
const SubText = styled.p`
  font-size: 1.5rem;
  color: #aaa;
  margin-bottom: 60px;
  @media (max-width: 800px) {
   font-size: 1.3rem;
    }
`;

// Button container for Register and Login buttons
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

// Animated button styled-component
const AnimatedButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const WelcomePage = () => {
  const navigate=useNavigate();
  return (
    <>
    <Container>
      <BackgroundVideo autoPlay loop muted>
        <source src="https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Content>
        <Logo src={logo} alt="Logo" />
        <WelcomeText>Welcome to CoCreate</WelcomeText>
        <SubText>Share, Collaborate, Create.</SubText>
        <ButtonContainer>
          <AnimatedButton onClick={()=>navigate('/register')}  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Register
          </AnimatedButton>
          <AnimatedButton onClick={()=>navigate('/login')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Login
          </AnimatedButton>
        </ButtonContainer>
      </Content>
    </Container>
    <Footer/>
    </>
  );
};

export default WelcomePage;
