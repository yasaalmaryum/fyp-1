import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Track from "../student/Track";

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Set the height to 100%
}));

const Image = styled('img')({
  width: '70%',
  objectFit: 'cover',
  marginBottom: '7px', 
});


export default function FacCards() {
  const navigate = useNavigate();

  
  const [isTrackVisible, setTrackVisible] = React.useState(false);

  const toggleTrack = () => {
    setTrackVisible(!isTrackVisible);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>

        <Grid item xs={4} onClick={() => navigate("/facform")}>
          <Item>
           
            <Image
              src="./images/image12.png"
              alt="Image1"
            />
            <Typography >
              
               <b>Select Form</b> 
          
            </Typography>
            
          </Item>
        </Grid>

        <Grid item xs={4} onClick={() => navigate("/faccreate")}>
          <Item>
            <Image
              src="./images/image8.png"
              alt="Image 3"
            />
            <Typography >
              
                <b>Create Form</b> 
             
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={4} onClick={() => navigate("/facgenerate")}>
          <Item>
            <Image
              src="./images/image10.png"
              alt="Image 4"
            />
            <Typography >
              
                <b>Generate Form</b>
            
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={4} onClick={toggleTrack}>
          <Item>
            <Image
              src="./images/image7.png"
              alt="Image 4"
            />
             <Track /> 
          </Item>
        </Grid>
        <Grid item xs={4}onClick={() => navigate("/facanalytics")}>
          <Item>
            <Image
              src="./images/image17.png"
              alt="Image 4"
            />
            <Typography >
             
               <b>Aanalytics</b> 
             
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={4} onClick={() => navigate("/facrecieve")}>
          <Item>
            <Image
              src="./images/image9.png"
              alt="Image 4"
            />
            <Typography >
             
                <b>Student Applictions</b>
             
            </Typography>
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}
