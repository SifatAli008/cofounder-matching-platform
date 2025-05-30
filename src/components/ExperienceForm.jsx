import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material';

export default function ExperienceForm({ open, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Work Experience' : 'Add Work Experience'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="month"
                value={formData.startDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="month"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.current}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.current}
                onChange={handleChange}
                name="current"
              />
            }
            label="I currently work here"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            placeholder="Describe your responsibilities, achievements, and key contributions..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? 'Save Changes' : 'Add Experience'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 