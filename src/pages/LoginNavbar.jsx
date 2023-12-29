import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import logo from "../assests/logo.png";
import styled from '@mui/system/styled';


const Image = styled('img')({
  width: 'auto',
  height: '40px',
  marginRight: '10px',
  marginLeft:'5px',
});

   
  

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const LoginNavbar = (props) => {
    const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(path);
    };
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={logo} alt="University Logo" />
              <span className="font-light text-lg lg:text-2xl xl:text-1xl">Efficient DigiDocs</span>
            </div>
          
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        {/* Add your content here */}
      </Container>
    </React.Fragment>
  );
}

export default LoginNavbar;
