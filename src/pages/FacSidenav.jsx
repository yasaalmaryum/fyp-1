import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChatIcon from '@mui/icons-material/Chat';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav() {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />

    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />

        <List>
        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/")}>

        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AddHomeIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </ListItem>

        {/*<ListItem disablePadding sx={{ display: 'block' }}  onClick={() => navigate("/profile")}>

        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AssignmentIndIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
          </ListItem>*/}
        <ListItem disablePadding sx={{ display: 'block' }}  onClick={() => navigate("/create")}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <EditNoteIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Create"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}  onClick={() => navigate("/generate")}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <ChatIcon  /> 
          </ListItemIcon>
          <ListItemText primary={"Generate"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: 'block' }}  onClick={() => navigate("/history")} >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HistoryIcon /> 
          </ListItemIcon>
          <ListItemText primary={"History"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/analytics")} >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AnalyticsIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Analytics"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </ListItem>
              {/*
        <ListItem disablePadding sx={{ display: 'block' }}  onClick={() => navigate("/settings")}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }} >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
          >
            <SettingsIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Settings"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </ListItem>*/}
        </List>
      </Drawer>

      <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={open ? handleDrawerClose : handleDrawerOpen}
      edge="start"
      sx={{
        marginLeft: 'auto',
        display: { sm: 'none' },
      }}
    >
      {open ? <ChevronLeftIcon /> : <MenuIcon />}
    </IconButton>

 
    </Box>
  );
}
