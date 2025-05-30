import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#232b39', color: 'white', py: 4, mt: 8, textAlign: 'center' }} component="footer">
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Footer
      </Typography>
      <Typography variant="body2" color="inherit">
        © 2024 Rafayet Hossen. All rights reserved.
      </Typography>
    </Box>
  );
} 