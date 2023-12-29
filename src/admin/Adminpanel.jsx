
import React from "react";
import Sidenav from "../pages/Sidenav";
import Box from '@mui/material/Box';
import AdminPage from "../pages/AdminPage";
export default function Profile(){
    return (
        <>
        <Box sx={{display:'flex'}}>
           <Sidenav />
        
           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
             <Box sx={{ marginTop: "100px" }}>
               < AdminPage />
            
             </Box>
            </Box>
        </Box>
        
        </>
    );
}

