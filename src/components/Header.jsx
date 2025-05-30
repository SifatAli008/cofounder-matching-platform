import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Box, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import authService from '../services/authService';
import { toast } from 'react-toastify';

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser();
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleClose();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: 1201 }}>
      <Toolbar className="flex justify-between px-4 md:px-12">
        {/* Logo */}
        <Box className="flex items-center gap-2">
          <Avatar variant="square" sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontWeight: 'bold' }}>L</Avatar>
          <Typography variant="h6" fontWeight="bold" className="tracking-tight hidden md:block">LOGO</Typography>
        </Box>
        {/* Search Bar */}
        <Box className="flex items-center bg-gray-100 rounded-full px-3 py-1 mx-4 w-56 md:w-96 shadow-sm">
          <SearchIcon color="action" />
          <InputBase
            placeholder="Search"
            className="ml-2 flex-1"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        {/* Navigation */}
        <Box className="flex gap-1 md:gap-2">
          <Button color="inherit" className="capitalize hover:bg-gray-100 rounded-md px-3">Home</Button>
          <Button color="inherit" className="capitalize hover:bg-gray-100 rounded-md px-3">Network</Button>
          
          {!loading && (
            user ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.email[0].toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                color="primary" 
                variant="contained" 
                className="capitalize shadow-none rounded-md px-3"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 