import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../assests/logo.png";
import styled from '@mui/system/styled';
import {useSession} from "../redux/Reducers/AuthReducer";

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

const Navbar = (props) => {
  const {authActions,session} = useSession();
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
            {/* User button on the right */}
            <div className={"flex flex-row justify-center items-center"} style={{ marginLeft: 'auto' }}>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              {
                authActions.isUserAuthenticated() && (
                    <p>
                        {session.profile?.full_name}

                    </p>
                  )
              }
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

export default Navbar;
