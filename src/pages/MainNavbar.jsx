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
  height: '50px',
  marginRight: '10px',
  marginLeft:'60px',
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

const MainNavbar = (props) => {
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
              <span className="font-bold text-lg lg:text-2xl xl:text-3xl">Efficient DigiDocs</span>
            </div>
            {/* User button on the right */}
            <div style={{ marginLeft: 'auto' }}>
              <button onClick={() => handleNavigation("/admin")}>Admin</button>
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

export default MainNavbar;
