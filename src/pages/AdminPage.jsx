import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CardsForm() {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <Grid container spacing={2}>
        
        <Grid item xs={4}onClick={() => navigate("/studentrecord")}>
          <Item>
            <img
              src="./images/image20.png"  
              alt="Image1"
              style={{ width: '100%', height: '50%', objectFit: 'cover' }}
            />
            <Typography sx={{ marginTop: '-6px' }}> 
             
                <b>Student</b>
              
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={4} onClick={() => navigate("/facultyrecord")}>
          <Item>
            <img
              src="./images/image19.png"  
              alt="Image 3"
              style={{ width: '100%', height: '50%', objectFit: 'cover' }}
            />
            <Typography sx={{ marginTop: '-6px' }}> 
              
               <b>Faculty</b> 
              
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={4} onClick={() => navigate("/hrrecord")}sx={{ color: 'blue' }}>
          <Item>
            <img
              src="./images/image21.png"  
              alt="Image 4"
              style={{ width: '100%', height: '50%', objectFit: 'cover' }}
            />
            <Typography sx={{ marginTop: '-6px' }}> 
              
                <b>HR</b>
             
            </Typography>
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}
