import React, { useState } from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Chip, 
  Container, 
  Divider, 
  Tab, 
  Tabs, 
  TextField, 
  Typography, 
  Paper, 
  Grid, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Link,
  Stack,
  Tooltip,
  Badge
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import EditProfileDialog from '../components/EditProfileDialog';
import AcademicForm from '../components/AcademicForm';
import ExperienceForm from '../components/ExperienceForm';
import ProjectForm from '../components/ProjectForm';
import Header from '../components/Header';
import ReactIcon from '@mui/icons-material/IntegrationInstructions';
import CodeIcon from '@mui/icons-material/Code';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BadgeOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import TwitterIcon from '@mui/icons-material/Twitter';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Skeleton from '@mui/material/Skeleton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinearProgress from '@mui/material/LinearProgress';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';

const MAX_SUMMARY_LENGTH = 300;
const MAX_SKILLS = 10;

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    description: 'Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. Features include product management, order tracking, and real-time inventory updates.',
    liveDemo: 'https://ecommerce-demo.com',
    sourceCode: 'https://github.com/username/ecommerce-platform',
  },
  {
    title: 'Task Management App',
    tech: ['React', 'Firebase', 'Material-UI'],
    description: 'Collaborative task management application with real-time updates, file sharing, and team collaboration features. Supports drag-and-drop functionality and multiple project views.',
    liveDemo: 'https://taskapp-demo.com',
    sourceCode: 'https://github.com/username/task-management-app',
  },
];

function TabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ p: 2 }}>{children}</Box>
  );
}

// Helper to get icon for a skill
const getSkillIcon = (skill) => {
  switch (skill.toLowerCase()) {
    case 'react':
      return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg" alt="React" className="w-4 h-4 mr-1" />;
    case 'node.js':
    case 'nodejs':
      return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg" alt="Node.js" className="w-4 h-4 mr-1" />;
    case 'ui/ux':
      return <CodeIcon fontSize="small" className="mr-1" />;
    case 'startup':
      return <CodeIcon fontSize="small" className="mr-1" />;
    default:
      // fallback to generic code icon
      return <CodeIcon fontSize="small" className="mr-1" />;
  }
};

// DnD Sortable Skill Chip
function SortableSkillChip({ skill, idx, handleRemoveSkill }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: skill });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition,
        zIndex: isDragging ? 100 : 'auto',
      }}
      {...attributes}
      {...listeners}
      className="inline-block"
    >
      <Tooltip
        title={<span className='text-base font-semibold text-blue-700'>Endorse {skill}</span>}
        arrow
        componentsProps={{ tooltip: { sx: { bgcolor: 'white', color: '#1976d2', boxShadow: 3, fontWeight: 600, fontSize: 16 } } }}
      >
        <Badge
          badgeContent={Math.floor(Math.random()*10+1)}
          color="secondary"
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: 14,
              minWidth: 22,
              height: 22,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a4508b 0%, #5f0a87 100%)',
              color: 'white',
              boxShadow: '0 2px 8px rgba(90,0,120,0.15)',
              border: '2px solid #fff',
            },
          }}
        >
          <Chip
            label={<span className="flex items-center gap-1 text-base font-semibold">{getSkillIcon(skill)}{skill}</span>}
            color="primary"
            onDelete={() => handleRemoveSkill(skill)}
            deleteIcon={<DeleteIcon />}
            className="capitalize chip-hover"
            sx={{
              borderRadius: '999px',
              px: 2.5,
              py: 1.2,
              fontSize: 18,
              minHeight: 44,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              background: 'linear-gradient(90deg, #1976d2 80%, #64b5f6 100%)',
              color: 'white',
              transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2196f3 80%, #90caf9 100%)',
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.18)',
                transform: 'scale(1.08)',
              },
            }}
          />
        </Badge>
      </Tooltip>
    </div>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState(['React', 'Node.js', 'UI/UX', 'Startup']);
  const [summary, setSummary] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skillError, setSkillError] = useState('');
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openAcademicForm, setOpenAcademicForm] = useState(false);
  const [openExperienceForm, setOpenExperienceForm] = useState(false);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [editingAcademic, setEditingAcademic] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [profileData, setProfileData] = useState({
    fullName: 'Rafayet Hossen',
    tagLine: 'Full Stack Developer',
    location: 'New York, NY',
    email: 'rafayet@example.com',
    phone: '+1 (555) 123-4567',
    skills: ['React', 'Node.js', 'JavaScript', 'Python', 'MongoDB'],
    summary:
      'Passionate full-stack developer with 3+ years of experience building scalable web applications. Expertise in modern JavaScript frameworks, cloud technologies, and agile development practices. Strong problem-solving skills and a commitment to writing clean, maintainable code.',
    experiences: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        period: '2020 - Present',
        description: 'Led development of microservices architecture and implemented CI/CD pipelines.'
      },
      {
        title: 'Software Engineer',
        company: 'Startup Inc',
        period: '2018 - 2020',
        description: 'Developed and maintained multiple React applications and REST APIs.'
      }
    ],
    education: [
      {
        degree: 'Master of Computer Science',
        school: 'Stanford University',
        period: '2016 - 2018'
      },
      {
        degree: 'Bachelor of Computer Science',
        school: 'UC Berkeley',
        period: '2012 - 2016'
      }
    ]
  });
  const [summarySaved, setSummarySaved] = useState(false);
  const [showSkillFab, setShowSkillFab] = useState(false);
  const [showEditFab, setShowEditFab] = useState(false);
  const [summaryToast, setSummaryToast] = useState(false);
  const [showMoreAcademics, setShowMoreAcademics] = useState(false);
  const [showMoreExperiences, setShowMoreExperiences] = useState(false);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [viewAs, setViewAs] = useState('Public');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const skillSuggestions = ['React', 'Node.js', 'UI/UX', 'Startup', 'Python', 'Java', 'C++', 'TypeScript', 'Figma', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'GraphQL', 'Redux', 'Sass', 'Tailwind', 'Material UI'];
  const [loadingAcademics, setLoadingAcademics] = useState(false);
  const [loadingExperiences, setLoadingExperiences] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [lookingFor, setLookingFor] = useState('Technical Co-founder');
  const [whyLooking, setWhyLooking] = useState('Looking for a technical co-founder to help build and scale our MVP.');
  const [profileCompleteness, setProfileCompleteness] = useState(75);
  const [isConnected, setIsConnected] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [endorsements, setEndorsements] = useState({ React: 5, 'Node.js': 3, JavaScript: 2, Python: 1, MongoDB: 1 });
  const [projectLikes, setProjectLikes] = useState([2, 1]);
  const [projectComments, setProjectComments] = useState([1, 0]);
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [editExpIdx, setEditExpIdx] = useState(null);
  const [editEduIdx, setEditEduIdx] = useState(null);
  const [editProjIdx, setEditProjIdx] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'https://linkedin.com/in/rafayet',
    github: 'https://github.com/rafayet',
    twitter: 'https://twitter.com/rafayet',
    website: 'https://rafayet.com'
  });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', idx: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactPublic, setContactPublic] = useState(true);

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
    setSkillError('');
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      if (skills.map(s => s.toLowerCase()).includes(skillInput.trim().toLowerCase())) {
        setSkillError('Skill already added');
        return;
      }
      if (skills.length >= MAX_SKILLS) {
        setSkillError(`Maximum ${MAX_SKILLS} skills allowed`);
        return;
      }
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    } else if (e.key === 'Backspace' && !skillInput && skills.length > 0) {
      setSkills(skills.slice(0, -1));
    }
  };

  const handleSkillAddClick = () => {
    if (skillInput.trim()) {
      if (skills.map(s => s.toLowerCase()).includes(skillInput.trim().toLowerCase())) {
        setSkillError('Skill already added');
        return;
      }
      if (skills.length >= MAX_SKILLS) {
        setSkillError(`Maximum ${MAX_SKILLS} skills allowed`);
        return;
      }
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    setSnackbar({
      open: true,
      message: 'Skill removed successfully',
      severity: 'success'
    });
    notify('Skill removed successfully');
  };

  const handleSummaryChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_SUMMARY_LENGTH) {
      setSummary(value);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleProfileSave = (formData) => {
    setProfileData(prev => ({ ...prev, ...formData }));
    setOpenEditProfile(false);
    setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
  };

  const handleAcademicSave = (formData) => {
    setProfileData(prev => {
      const education = [...prev.education];
      if (editingAcademic !== null) education[editingAcademic] = formData;
      else education.push(formData);
      return { ...prev, education };
    });
    setOpenAcademicForm(false);
    setSnackbar({ open: true, message: `Academic record ${editingAcademic !== null ? 'updated' : 'added'} successfully`, severity: 'success' });
  };

  const handleAcademicAdd = () => { setEditingAcademic(null); setOpenAcademicForm(true); };
  const handleAcademicEdit = (idx) => { setEditingAcademic(idx); setOpenAcademicForm(true); };
  const handleAcademicClose = () => setOpenAcademicForm(false);

  const handleExperienceSave = (formData) => {
    setProfileData(prev => {
      const experiences = [...prev.experiences];
      if (editingExperience !== null) experiences[editingExperience] = formData;
      else experiences.push(formData);
      return { ...prev, experiences };
    });
    setOpenExperienceForm(false);
    setSnackbar({ open: true, message: `Experience ${editingExperience !== null ? 'updated' : 'added'} successfully`, severity: 'success' });
  };

  const handleExperienceAdd = () => { setEditingExperience(null); setOpenExperienceForm(true); };
  const handleExperienceEdit = (idx) => { setEditingExperience(idx); setOpenExperienceForm(true); };
  const handleExperienceClose = () => setOpenExperienceForm(false);

  const handleProjectSave = (formData) => {
    setProfileData(prev => {
      const projects = prev.projects ? [...prev.projects] : [];
      if (editingProject !== null) projects[editingProject] = formData;
      else projects.push(formData);
      return { ...prev, projects };
    });
    setOpenProjectForm(false);
    setSnackbar({ open: true, message: `Project ${editingProject !== null ? 'updated' : 'added'} successfully`, severity: 'success' });
  };

  const handleProjectAdd = () => { setEditingProject(null); setOpenProjectForm(true); };
  const handleProjectEdit = (idx) => { setEditingProject(idx); setOpenProjectForm(true); };
  const handleProjectClose = () => setOpenProjectForm(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const handleSummarySave = () => {
    setSummarySaved(true);
    setTimeout(() => setSummarySaved(false), 1500);
    notify('Summary auto-saved!');
  };

  // Toast notifications
  const notify = (msg) => toast.success(msg);

  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    let score = 0;
    const total = 7; // Total number of sections to check

    if (profileData.fullName) score++;
    if (profileData.tagLine) score++;
    if (profileData.summary) score++;
    if (profileData.skills.length > 0) score++;
    if (profileData.experiences.length > 0) score++;
    if (profileData.education.length > 0) score++;
    if (PROJECTS.length > 0) score++;

    setProfileCompleteness(Math.round((score / total) * 100));
  };

  // Delete handlers
  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setProfileData(prev => {
        const updated = { ...prev };
        if (deleteDialog.type === 'education') updated.education = prev.education.filter((_, i) => i !== deleteDialog.idx);
        if (deleteDialog.type === 'experience') updated.experiences = prev.experiences.filter((_, i) => i !== deleteDialog.idx);
        if (deleteDialog.type === 'project') updated.projects = prev.projects.filter((_, i) => i !== deleteDialog.idx);
        return updated;
      });
      setLoading(false);
      setDeleteDialog({ open: false, type: '', idx: null });
      setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' });
      setLastUpdated(new Date());
    }, 800);
  };

  // Profile completeness calculation
  const getCompleteness = () => {
    let score = 0, total = 6;
    if (profileData.fullName) score++;
    if (profileData.tagLine) score++;
    if (profileData.summary) score++;
    if (profileData.skills && profileData.skills.length > 0) score++;
    if (profileData.experiences && profileData.experiences.length > 0) score++;
    if (profileData.education && profileData.education.length > 0) score++;
    return Math.round((score / total) * 100);
  };
  const completeness = getCompleteness();
  const missingTips = [];
  if (!profileData.fullName) missingTips.push('Add your full name');
  if (!profileData.tagLine) missingTips.push('Add a tagline');
  if (!profileData.summary) missingTips.push('Write an about section');
  if (!profileData.skills || profileData.skills.length === 0) missingTips.push('Add some skills');
  if (!profileData.experiences || profileData.experiences.length === 0) missingTips.push('Add work experience');
  if (!profileData.education || profileData.education.length === 0) missingTips.push('Add education');

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', fontFamily: `'Inter', 'Segoe UI', 'Arial', sans-serif` }}>
      <Header />
      <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', px: { xs: 2, sm: 6 }, py: { xs: 3, sm: 6 } }}>
        {/* Profile Completeness */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#888', mb: 1, letterSpacing: 1 }}>PROFILE COMPLETENESS</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress value={completeness} variant="determinate" sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: '#ececec', '& .MuiLinearProgress-bar': { bgcolor: completeness >= 80 ? '#4caf50' : completeness >= 50 ? '#ff9800' : '#f44336' } }} />
            <Typography variant="body2" sx={{ color: '#888' }}>{completeness}%</Typography>
              </Box>
          {completeness < 100 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ color: '#f44336' }}>Tips to complete your profile:</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {missingTips.map(tip => <li key={tip}><Typography variant="body2" sx={{ color: '#888' }}>{tip}</Typography></li>)}
              </ul>
                </Box>
          )}
        </Box>
        {/* Last updated */}
        <Typography variant="caption" sx={{ color: '#bbb', mb: 2, display: 'block' }}>Last updated: {lastUpdated.toLocaleString()}</Typography>
        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 72, height: 72, fontSize: 32, bgcolor: '#f3f3f3', color: '#222', mr: 3, border: '1px solid #ececec' }}>
              {profileData.fullName.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{profileData.fullName}</Typography>
              <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 400, mb: 1 }}>{profileData.tagLine}</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <LocationOnIcon sx={{ color: '#bbb', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#888' }}>{profileData.location}</Typography>
              </Stack>
          </Box>
          </Box>
          {/* LinkedIn-style action buttons */}
          <Stack direction="row" spacing={2} alignItems="center">
            {!isConnected && (
              <Tooltip title="Connect with this user" arrow>
            <Button
              variant="contained"
              color="primary"
                  onClick={() => { setIsConnected(true); setShowSnackbar(true); }}
            sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    minWidth: 120,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                    transition: 'all 0.2s',
                    '&:hover': { boxShadow: '0 4px 16px rgba(25, 118, 210, 0.18)' }
                  }}
                  aria-label="Connect"
                >
                  Connect
                </Button>
              </Tooltip>
            )}
            <Tooltip title="Edit your profile" arrow>
                            <Button 
                variant="outlined"
                color="inherit"
                onClick={() => setOpenEditProfile(true)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  minWidth: 120,
                  borderColor: '#e0e0e0',
                  bgcolor: '#fafbfc',
                  '&:hover': { bgcolor: '#f5f5f5', borderColor: '#bdbdbd' }
                }}
                aria-label="Edit profile"
                              startIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
            </Tooltip>
          </Stack>
                    </Box>

        {/* Looking For Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Looking For</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 1 }}>{lookingFor}</Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>{whyLooking}</Typography>
                    </Box>

        {/* Key Skills Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Key Skills</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {profileData.skills.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#bbb' }}>No skills added yet.</Typography>
            ) : (
              profileData.skills.map((skill, idx) => (
                <Tooltip key={skill} title={`Endorsed by ${Math.floor(Math.random()*10+1)} people`} arrow>
                  <Chip label={skill} sx={{ bgcolor: '#f7f7f8', color: '#222', fontWeight: 500, fontSize: 15, borderRadius: 1, mr: 1, mb: 1 }} />
                </Tooltip>
              ))
            )}
          </Stack>
                    </Box>

        {/* Contact Section with public/private toggle */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>Contact</Typography>
            <Tooltip title={contactPublic ? 'Contact info is public' : 'Contact info is private'} arrow>
              <Switch checked={contactPublic} onChange={() => setContactPublic(v => !v)} color="primary" inputProps={{ 'aria-label': 'Toggle contact public/private' }} />
            </Tooltip>
                    </Box>
          {contactPublic && isConnected && (
            <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#bbb', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#888' }}>{profileData.email}</Typography>
                </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#bbb', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#888' }}>{profileData.phone}</Typography>
              </Box>
            </Stack>
          )}
          {!contactPublic && <Typography variant="body2" sx={{ color: '#bbb' }}>Contact info is private</Typography>}
        </Box>

        {/* About Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>About</Typography>
          <Typography variant="body1" sx={{ color: '#444' }}>{profileData.summary}</Typography>
        </Box>

        {/* Tabs Section: Experience, Education, Projects */}
        <Box sx={{ mt: 4 }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: '1px solid #ececec', minHeight: 40 }}>
            <Tab label="Experience" sx={{ fontWeight: 600, fontSize: 16, textTransform: 'none', minWidth: 120 }} />
            <Tab label="Education" sx={{ fontWeight: 600, fontSize: 16, textTransform: 'none', minWidth: 120 }} />
            <Tab label="Projects" sx={{ fontWeight: 600, fontSize: 16, textTransform: 'none', minWidth: 120 }} />
          </Tabs>
          <Divider sx={{ mb: 3, mt: 0 }} />
          {activeTab === 0 && (
            <Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ color: '#ffd54f', fontSize: 28, mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, flex: 1 }}>Experience</Typography>
                  <Button 
                    variant="text"
                    color="primary"
                    startIcon={<WorkIcon sx={{ color: '#ffd54f' }} />}
                    onClick={handleExperienceAdd}
                    aria-label="Add experience"
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      ml: 2,
                      '&:hover': { bgcolor: 'rgba(255, 213, 79, 0.08)' },
                      fontSize: 15
                    }}
                  >
                    Add
                  </Button>
                </Box>
                {(profileData.experiences && profileData.experiences.length > 0) ? (
                  <Box>
                    {profileData.experiences.map((exp, idx) => (
                      <Box key={idx} sx={{ display: 'flex', mb: 3 }}>
                        <WorkIcon sx={{ color: '#bdbdbd', fontSize: 32, mr: 2, mt: 0.5 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0 }}>{exp.title}</Typography>
                          <Typography variant="body2" sx={{ color: '#444', fontWeight: 500 }}>{exp.company}</Typography>
                          <Typography variant="body2" sx={{ color: '#888', mb: 0.5 }}>{exp.period}</Typography>
                          <Typography variant="body2" sx={{ color: '#444', mb: 1 }}>{exp.description}</Typography>
                          <Button size="small" variant="text" color="primary" onClick={() => handleExperienceEdit(idx)} aria-label="Edit experience" sx={{ pl: 0, minWidth: 0 }}>Edit</Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ color: '#aaa', textAlign: 'center', mt: 4 }}>No experience added yet. Click <b>Add</b> to showcase your work!</Typography>
                )}
              </Box>
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ color: '#90caf9', fontSize: 28, mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, flex: 1 }}>Education</Typography>
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<SchoolIcon sx={{ color: '#90caf9' }} />}
                    onClick={handleAcademicAdd}
                    aria-label="Add education"
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      ml: 2,
                      '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.08)' },
                      fontSize: 15
                    }}
                  >
                    Add
                  </Button>
                </Box>
                {(profileData.education && profileData.education.length > 0) ? (
                  <Box>
                    {profileData.education.map((edu, idx) => (
                      <Box key={idx} sx={{ display: 'flex', mb: 3 }}>
                        <SchoolIcon sx={{ color: '#bdbdbd', fontSize: 32, mr: 2, mt: 0.5 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0 }}>{edu.degree}</Typography>
                          <Typography variant="body2" sx={{ color: '#444', fontWeight: 500 }}>{edu.school}</Typography>
                          <Typography variant="body2" sx={{ color: '#888', mb: 0.5 }}>{edu.period}</Typography>
                          {edu.description && <Typography variant="body2" sx={{ color: '#444', mb: 1 }}>{edu.description}</Typography>}
                          <Button size="small" variant="text" color="primary" onClick={() => handleAcademicEdit(idx)} aria-label="Edit education" sx={{ pl: 0, minWidth: 0 }}>Edit</Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ color: '#aaa', textAlign: 'center', mt: 4 }}>No education added yet. Click <b>Add</b> to showcase your background!</Typography>
                )}
              </Box>
            </Box>
          )}
          {activeTab === 2 && (
            <Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FolderIcon sx={{ color: '#b39ddb', fontSize: 28, mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, flex: 1 }}>Projects</Typography>
                  <Button 
                    variant="text"
                    color="primary"
                    startIcon={<FolderIcon sx={{ color: '#b39ddb' }} />}
                    onClick={handleProjectAdd}
                    aria-label="Add project"
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      ml: 2,
                      '&:hover': { bgcolor: 'rgba(76, 110, 245, 0.08)' },
                      fontSize: 15
                    }}
                  >
                    Add
                  </Button>
                </Box>
                {(profileData.projects && profileData.projects.length > 0) ? (
                  <Box>
                    {profileData.projects.map((project, idx) => (
                      <Box key={idx} sx={{ display: 'flex', mb: 3 }}>
                        <FolderIcon sx={{ color: '#bdbdbd', fontSize: 32, mr: 2, mt: 0.5 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0 }}>{project.title}</Typography>
                          {project.tech && project.tech.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                              {project.tech.map((tech) => (
                                <Chip key={tech} label={tech} size="small" sx={{ bgcolor: '#ede7f6', color: '#5e35b1', fontWeight: 500, borderRadius: 1 }} />
                              ))}
                            </Box>
                          )}
                          <Typography variant="body2" sx={{ color: '#444', mb: 0.5 }}>{project.description}</Typography>
                          <Box sx={{ display: 'flex', gap: 2, mb: 0.5 }}>
                            {project.liveDemo && (
                              <Link href={project.liveDemo} target="_blank" sx={{ color: '#1976d2', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LaunchIcon fontSize="small" /> Live Demo
                              </Link>
                            )}
                            {project.sourceCode && (
                              <Link href={project.sourceCode} target="_blank" sx={{ color: '#1976d2', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CodeIcon fontSize="small" /> Source Code
                              </Link>
                            )}
                          </Box>
                          <Button size="small" variant="text" color="primary" onClick={() => handleProjectEdit(idx)} aria-label="Edit project" sx={{ pl: 0, minWidth: 0 }}>Edit</Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ color: '#aaa', textAlign: 'center', mt: 4 }}>No projects added yet. Click <b>Add</b> to showcase your work!</Typography>
                )}
              </Box>
            </Box>
          )}
                </Box>
                </Box>
      <Footer />
        <Snackbar 
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Contact info unlocked!"
      />
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      {/* Dialogs for editing */}
      <EditProfileDialog open={openEditProfile} onClose={() => setEditMode(false)} profileData={profileData} onSave={handleProfileSave} />
      <AcademicForm open={openAcademicForm} onClose={handleAcademicClose} onSave={handleAcademicSave} initialData={editingAcademic !== null ? profileData.education[editingAcademic] : null} />
      <ExperienceForm open={openExperienceForm} onClose={handleExperienceClose} onSave={handleExperienceSave} initialData={editingExperience !== null ? profileData.experiences[editingExperience] : null} />
      <ProjectForm open={openProjectForm} onClose={handleProjectClose} onSave={handleProjectSave} initialData={editingProject !== null && profileData.projects ? profileData.projects[editingProject] : null} />
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, type: '', idx: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this {deleteDialog.type} entry?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, type: '', idx: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={loading} startIcon={loading && <CircularProgress size={18} />}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 


