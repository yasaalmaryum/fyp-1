import React from "react";
import FacSidenav from "../pages/FacSidenav";
import Navbar from "../pages/Navbar";
import Box from '@mui/material/Box';
import FacCards from '../pages/FacCards';

export default function FacHome(){
    return (
        <>
         <FacSidenav/>
         <Navbar />
        <Box sx={{display:'flex'}}>
          
        
           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
           <div style={{ marginLeft: '50px' }}>
             <FacCards />
             </div>

            </Box>
        </Box>
        
        </>
    );
}
