import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Profile from './pages/Profile';

function Home() {
  return <Typography variant="h4" sx={{ mt: 4 }}>Home Page (Coming Soon)</Typography>;
}
function Network() {
  return <Typography variant="h4" sx={{ mt: 4 }}>Network Page (Coming Soon)</Typography>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
