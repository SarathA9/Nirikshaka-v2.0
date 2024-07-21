import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Logo from './assets/logo.png';

const App = () => {
  const [mode, setMode] = useState('dark');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: "'Rajdhani', sans-serif",
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.name} component={Link} to={item.path}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <img src={Logo} alt="Logo" style={{ height: '2rem', marginRight: '1rem' }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="rajdhani-bold">
                Nirikshaka
              </Typography>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Button key={item.name} color="inherit" component={Link} to={item.path} className="rajdhani-medium">
                      {item.name}
                    </Button>
                  ))}
                </>
              )}
              <IconButton 
                sx={{ 
                  ml: 1,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'rotate(360deg)' },
                }} 
                onClick={toggleTheme} 
                color="inherit"
              >
                {theme.palette.mode === 'dark' ? 
                  <WbSunnyRoundedIcon sx={{ color: 'yellow' }} /> : 
                  <NightsStayRoundedIcon sx={{ color: 'blue' }} />
                }
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

          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;