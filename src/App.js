import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Container, Box, Paper, CircularProgress, Snackbar, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import Logo from './assets/logo.png';
import UploadImage from './assets/upload.png';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
  },
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadStatus, setShowUploadStatus] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      modelRef.current = await mobilenet.load();
    };
    loadModel();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setShowUploadStatus(true);
      setTimeout(() => setShowUploadStatus(false), 2000);
    }
  };

  const loadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const predict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const image = await loadImage(selectedFile);
      const predictions = await modelRef.current.classify(image);
      setPredictions(predictions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = ['Home', 'About', 'Contact'];

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={Logo} alt="Logo" style={{ height: '2rem', marginRight: '1rem' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Nirikshaka
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => (
                <Button key={item} color="inherit" sx={{ ml: 2 }}>
                  {item}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list}
        </Drawer>

        <Snackbar
          open={showUploadStatus}
          autoHideDuration={2000}
          onClose={() => setShowUploadStatus(false)}
          message="Image uploaded successfully!"
          sx={{ '& .MuiSnackbarContent-root': { bgcolor: 'success.main' } }}
        />

        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              fontSize: '4rem',
              lineHeight: 1.2,
            }} 
            className="gradient-text"
          >
            Nirikshaka
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
            An Object Detector Model
          </Typography>

          <Paper 
            elevation={3} 
            className="upload-box"
            sx={{ 
              p: 4, 
              bgcolor: 'background.paper',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 256 }}>
              {selectedFile ? (
                <img 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="Uploaded" 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                />
              ) : (
                <img 
                  src={UploadImage} 
                  alt="Upload" 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                />
              )}
              <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                {selectedFile ? 'Click to change image' : 'Click to upload an image'}
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={predict}
              disabled={isLoading || !selectedFile}
              sx={{ 
                background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                '&:hover': {
                  background: 'linear-gradient(to right, #22c55e, #2563eb)',
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Predict'}
            </Button>
          </Box>

          {predictions.length > 0 && (
            <Paper elevation={3} sx={{ mt: 4, p: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Predictions:</Typography>
              {predictions.map((prediction, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  {`${prediction.className}: ${Math.round(prediction.probability * 100)}%`}
                </Typography>
              ))}
            </Paper>
          )}
        </Container>

        <Box component="footer" sx={{ bgcolor: 'background.paper', color: 'text.secondary', mt: 8, py: 6 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>About Nirikshaka</Typography>
                <Typography variant="body2">
                  Nirikshaka, powered by TensorFlow.js and MobileNet, is your go-to tool for object detection using machine learning. It provides accurate predictions based on analyzed data.
                </Typography>
              </Box>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>Quick Links</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {navItems.map((item) => (
                    <Button key={item} color="inherit" href={`#${item.toLowerCase()}`} sx={{ justifyContent: 'flex-start', mb: 1 }}>
                      {item}
                    </Button>
                  ))}
                  <Button color="inherit" href="https://github.com/SarathA9/NIRIKSHAKA" target="_blank" startIcon={<GitHubIcon />} sx={{ justifyContent: 'flex-start' }}>
                    GitHub
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>Follow Us</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton color="inherit" href="https://www.instagram.com/_sarath01/" target="_blank">
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
            <Typography variant="body2" align="center" sx={{ mt: 4 }}>
              © 2024 Nirikshaka | All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;