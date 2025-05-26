import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
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
          <Button color="primary" variant="contained" className="capitalize shadow-none rounded-md px-3">Profile</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 