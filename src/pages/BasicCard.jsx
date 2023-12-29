import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const fetchApplicationsFromDatabase = async () => {
  // Assume this function fetches applications data from your database
  // Modify this function according to your actual database implementation
  // For example, you might use fetch or axios to make an API call
  const response = await fetch('/api/applications');
  const data = await response.json();
  return data.applications;
};

export default function ApplicationHistory({ marginLeft }) {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const statuses = ['Accepted', 'Pending', 'Rejected'];
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApplicationsFromDatabase();
      setApplications(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredApps = applications.filter(
      (app) => app.status === statuses[filterIndex]
    );
    setFilteredApplications(filteredApps);
  }, [applications, filterIndex]);

  const handleFilterClick = () => {
    setFilterIndex((prevIndex) => (prevIndex + 1) % statuses.length);
  };

  return (
    <Card sx={{ minWidth: 275, marginLeft }}>
      <FilterAltIcon onClick={handleFilterClick} />
      {filteredApplications.map((app) => (
        <CardContent key={app.id}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Application Status: {app.status}
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      ))}
    </Card>
  );
}
