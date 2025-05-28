import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Profile from './pages/Profile';
import Login from './pages/Login';
import authService from './services/authService';

function Home() {
  return <Typography variant="h4" sx={{ mt: 4 }}>Home Page (Coming Soon)</Typography>;
}

function Network() {
  return <Typography variant="h4" sx={{ mt: 4 }}>Network Page (Coming Soon)</Typography>;
}

// Protected Route component
function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
