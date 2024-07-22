import React from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', color: 'text.secondary', mt: 8, py: 6 }}>
      <Container maxWidth="false">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
          <Box sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }} className="rajdhani-bold">About Nirikshaka</Typography>
            <Typography variant="body2" sx={{maxWidth:'400px',textAlign:'justify'}} className="rajdhani-medium">
              Nirikshaka, powered by TensorFlow.js and MobileNet, is your go-to tool for object detection using machine learning. Nirikshaka detects objects using machine learning and provides accurate predictions based on the analyzed data.
            </Typography>
          </Box>
          <Box sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }} className="rajdhani-bold">Quick Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button color="inherit" component={Link} to="/" sx={{ justifyContent: 'flex-start', mb: 1 }} className="rajdhani-medium">Home</Button>
              <Button color="inherit" component={Link} to="/about" sx={{ justifyContent: 'flex-start', mb: 1 }} className="rajdhani-medium">About</Button>
              <Button color="inherit" href="https://github.com/SarathA9/Nirikshaka-v2.0" target="_blank" startIcon={<GitHubIcon />} sx={{ justifyContent: 'flex-start' }} className="rajdhani-medium">
                GitHub
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }} className="rajdhani-bold">Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton color="inherit" href="https://www.instagram.com/ft.saratth/" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="https://www.linkedin.com/in/sarath-adukkadukkam" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" href="https://github.com/SarathA9" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton color="inherit" href="https://sarathofficial.vercel.app" target="_blank">
                <LanguageIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 4 }} className="rajdhani-medium">
          © 2024 Nirikshaka | All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;