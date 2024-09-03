import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import Footer  from '../component/Footer'
import logo from '../logo.png';
import {useNavigate} from 'react-router-dom'
// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Playfair Display', serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #333;
    font-size: 18px;
  }
`;

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styled components
const Header = styled.header`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: #000;
  margin: 0;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  color: #000;
  min-height: 100vh;
  justify-content: center;
`;

const HeroTitle = styled.h2`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 1s ease-out;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1s ease-out 0.5s both;
  max-width: 800px;
`;

const FeatureSection = styled(Section)`
  background-color: #fff;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background-color: #f9f9f9;
  padding: 3rem;
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  color: #000;
  margin-bottom: 1.5rem;
`;

const HowItWorksSection = styled(Section)`
  background-color: #f5f5f5;
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div`
  background-color: #000;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TestimonialSection = styled(Section)`
  background-color: #fff;
`;

const TestimonialCard = styled.div`
  background-color: #f9f9f9;
  padding: 3rem;
  border-radius: 20px;
  margin-top: 3rem;
  max-width: 800px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const CTASection = styled(Section)`
  background: linear-gradient(135deg, #e0e0e0, #f5f5f5);
  color: #000;
`;

const Foot = styled.footer`
  background-color: #000;
  color: white;
  padding: 3rem;
  text-align: center;
  font-size: 1.2rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: #000;
`;

const SectionSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  max-width: 800px;
  color: #333;
`;
const LogoImage = styled.img`
  width: 250px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 40px;
`;

export default function Component() {
  const [scrollY, setScrollY] = useState(0);
  const navigate=useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header style={{ backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent' }}>
      
        <Logo>CoCreate</Logo>
        {/* <Nav>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <Button style={{marginRight:"100px"}}>Get Started</Button>
        </Nav> */}
      </Header>

      <HeroSection >
      <LogoImage src={logo} alt="Logo"/>
        <HeroTitle>Elevate Your Collaboration with CoCreate</HeroTitle>
        <HeroSubtitle>Experience seamless real-time document editing and teamwork like never before</HeroSubtitle>
        <Button style={{marginBottom:"15px" ,borderRadius:"25px"}}   onClick={()=>navigate('/register')}>Start Your Journey</Button>
        <Button style={{borderRadius:"25px"}}  onClick={()=>navigate('/login')}>Already a User ?</Button>
      </HeroSection>

      <FeatureSection id="features">
        <SectionTitle>Unparalleled Features</SectionTitle>
        <SectionSubtitle>Discover the tools that will transform your workflow</SectionSubtitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>✍️</FeatureIcon>
            <h3>Real-Time Synergy</h3>
            <p>Collaborate with your team in real-time, witnessing changes as they unfold before your eyes.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <h3>Integrated Discourse</h3>
            <p>Engage in meaningful discussions directly within your documents with our built-in chat feature.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔐</FeatureIcon>
            <h3>Granular Access Control</h3>
            <p>Maintain precise control over document permissions with our advanced settings.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🕰️</FeatureIcon>
            <h3>Comprehensive Version History</h3>
            <p>Track changes and revert to previous versions with unparalleled ease and clarity.</p>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>

      <HowItWorksSection id="how-it-works">
        <SectionTitle>The CoCreate Experience</SectionTitle>
        <SectionSubtitle>Embark on a journey of effortless collaboration</SectionSubtitle>
        <StepGrid>
          <Step>
            <StepNumber>1</StepNumber>
            <h3>Join the Community</h3>
            <p>Create your account and step into a world of possibilities.</p>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <h3>Craft or Import</h3>
            <p>Begin with a blank canvas or seamlessly import your existing work.</p>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <h3>Invite Your Team</h3>
            <p>Share your masterpiece and initiate real-time collaboration.</p>
          </Step>
          <Step>
            <StepNumber>4</StepNumber>
            <h3>Create and Converse</h3>
            <p>Edit, comment, and chat - all within your living document.</p>
          </Step>
        </StepGrid>
      </HowItWorksSection>

      <TestimonialSection>
        <SectionTitle>Voices of Success</SectionTitle>
        <TestimonialCard>
          <p>"CoCreate has fundamentally transformed our collaborative process. Its intuitive interface, coupled with powerful features, has elevated our team's productivity to unprecedented heights."</p>
          <p><strong>- Emily Chen, Chief Innovation Officer</strong></p>
        </TestimonialCard>
      </TestimonialSection>

      <CTASection>
        <SectionTitle>Embrace the Future of Collaboration</SectionTitle>
        <SectionSubtitle>Join the ranks of visionary teams already thriving with CoCreate</SectionSubtitle>
        <Button onClick={()=>navigate('/register')}>Begin Your CoCreate Journey</Button>
      </CTASection>

      <Foot>
        <p>&copy; 2023 CoCreate. Crafting the future of collaboration.</p>
      </Foot>
      <Footer/>
    </>
  );
}
