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
  Chip,
  IconButton,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const PROJECT_STATUSES = ['Ongoing', 'Finished', 'Prototype'];

export default function ProjectForm({ open, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false,
    technologies: [],
    url: '',
    newTechnology: '',
    status: 'Ongoing',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTechnology = () => {
    if (formData.newTechnology.trim() && !formData.technologies.includes(formData.newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTechnology.trim()],
        newTechnology: ''
      }));
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = () => {
    const { newTechnology, ...projectData } = formData;
    onSave(projectData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Project' : 'Add Project'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            placeholder="Describe your project, its purpose, and your role..."
            required
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

          <TextField
            select
            fullWidth
            label="Project Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {PROJECT_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              label="Add Technology"
              name="newTechnology"
              value={formData.newTechnology}
              onChange={handleChange}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
              placeholder="e.g., React, Node.js, Python"
            />
            <IconButton 
              color="primary" 
              onClick={handleAddTechnology}
              disabled={!formData.newTechnology.trim()}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {formData.technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                onDelete={() => handleRemoveTechnology(tech)}
                deleteIcon={<DeleteIcon />}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            label="Project URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? 'Save Changes' : 'Add Project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 