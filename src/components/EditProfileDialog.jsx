import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export default function EditProfileDialog({ open, onClose, profileData, onSave }) {
  const [formData, setFormData] = useState({
    fullName: profileData.fullName || '',
    tagLine: profileData.tagLine || '',
    avatar: null,
    location: profileData.location || '',
    email: profileData.email || '',
    phone: profileData.phone || '',
    summary: profileData.summary || '',
    linkedin: profileData.linkedin || '',
    github: profileData.github || '',
    twitter: profileData.twitter || '',
    website: profileData.website || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        avatar: e.target.files[0]
      }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={formData.avatar ? URL.createObjectURL(formData.avatar) : null}
              sx={{ width: 80, height: 80 }}
            >
              {formData.fullName.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Tooltip title="Change profile photo" arrow>
              <label htmlFor="avatar-upload">
                <Input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                  aria-label="Upload avatar"
                />
                <Button variant="outlined" component="span" aria-label="Change Photo">
                  Change Photo
                </Button>
              </label>
            </Tooltip>
          </Box>
          
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            aria-label="Full Name"
          />
          
          <TextField
            fullWidth
            label="Tag Line"
            name="tagLine"
            value={formData.tagLine}
            onChange={handleChange}
            required
            aria-label="Tag Line"
          />
          
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            aria-label="Location"
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-label="Email"
          />
          
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-label="Phone"
          />
          
          <TextField
            fullWidth
            label="Summary/About"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            multiline
            minRows={3}
            aria-label="Summary/About"
          />
          
          <TextField
            fullWidth
            label="LinkedIn"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            aria-label="LinkedIn"
          />
          
          <TextField
            fullWidth
            label="GitHub"
            name="github"
            value={formData.github}
            onChange={handleChange}
            aria-label="GitHub"
          />
          
          <TextField
            fullWidth
            label="Twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            aria-label="Twitter"
          />
          
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            aria-label="Website"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
} 