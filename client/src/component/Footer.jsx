import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Room,
  } from "@mui/icons-material";
  import XIcon from '@mui/icons-material/X';
  import styled from "styled-components";
 import logo2 from '../logo2.png'
 
  const Container = styled.div`
    display: flex;
    /* flex-direction:column; */
    background-color: #000000;
  
  `;

  const LogoImg = styled.img`
  width: 150px; /* Adjust size as needed */
  
 
`;

  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
    font-size: 15px;
    color: white;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
   
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
    font-size: 20px;
    color:white;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    font-size: 15px;
    color:white;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
   
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: white;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
        <LogoImg src={logo2} alt="Logo" />
          
          <Desc>
          Share, Collaborate, Create
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
           {/* <a href="https://www.instagram.com/im_vishesh_/"> */}
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            {/* </a> */}
            <SocialIcon  color="000000">
              <XIcon/>
            </SocialIcon> 
            
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Login</ListItem>
            <ListItem>AboutUs</ListItem>
            <ListItem>Register</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Dashboard</ListItem>
           
            <ListItem>Terms&Conditions</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> A-54 ,Rajendra Nagar,Bareilly,Uttar Pradesh,243001
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +91 8755093593
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> vishesh15th@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;
  