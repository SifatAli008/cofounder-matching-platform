<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Edit3, 
  Plus, 
  MapPin, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Calendar,
  Building,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("academics");
  const [userProfile, setUserProfile] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    tagLine: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    profileSummary: ""
  });
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({ title: '', company: '', description: '', startDate: '', endDate: '' });
  const [showExpForm, setShowExpForm] = useState(false);
  const [newAcademic, setNewAcademic] = useState({ institute: '', degree: '', startYear: '', endYear: '' });
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', techUsed: '', link: '', ProjectStatus: '' });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editAcademicId, setEditAcademicId] = useState(null);
  const [editExperienceId, setEditExperienceId] = useState(null);
  const [editProjectId, setEditProjectId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    async function fetchUser() {
      try {
        const res = await apiFetch("http://localhost:3000/collab/v1/auth/me");
        setUserProfile({
          ...res.user,
          fullName: res.user.basicInfo?.fullName || res.user.email,
          tagLine: res.user.bioSummary?.tagline || "Entrepreneur",
          location: res.user.basicInfo?.location || "",
          github: res.user.showcase?.github || "",
          linkedin: res.user.showcase?.linkedin || "",
          portfolio: res.user.showcase?.portfolio || "",
          profileSummary: res.user.bioSummary?.shortBio || "",
          skills: res.user.technicalProfile?.skills || [],
          academics: res.user.academics || [],
          experience: res.user.experience || [],
          projects: res.user.projects || []
        });
        setForm({
          fullName: res.user.basicInfo?.fullName || res.user.email,
          tagLine: res.user.bioSummary?.tagline || "Entrepreneur",
          location: res.user.basicInfo?.location || "",
          github: res.user.showcase?.github || "",
          linkedin: res.user.showcase?.linkedin || "",
          portfolio: res.user.showcase?.portfolio || "",
          profileSummary: res.user.bioSummary?.shortBio || ""
        });
      } catch (e) {
        if (e.message && e.message.toLowerCase().includes("unauthorized")) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setUserProfile(null);
        }
      }
    }
    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      // Example: update user profile endpoint (adjust as needed)
      await apiFetch("http://localhost:3000/collab/v1/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setUserProfile((prev) => ({ ...prev, ...form }));
      setIsEditing(false);
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to update profile." });
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    const updatedSkills = [...(form.skills || []), newSkill.trim()];
    setForm((prev) => ({ ...prev, skills: updatedSkills }));
    setNewSkill("");
    try {
      await apiFetch("http://localhost:3000/collab/v1/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skills: updatedSkills })
      });
      setUserProfile((prev) => ({ ...prev, skills: updatedSkills }));
      toast({ title: "Skill added!", description: "New skill has been added." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to add skill." });
    }
  };

  const handleAddExperience = async () => {
    if (!newExperience.title.trim() || !newExperience.company.trim() || !newExperience.startDate) {
      toast({ variant: 'destructive', title: 'Error', description: 'Title, company, and start date are required.' });
      return;
    }
    let startDate = newExperience.startDate ? new Date(newExperience.startDate) : null;
    let endDate = newExperience.endDate ? new Date(newExperience.endDate) : null;
    if (!startDate || isNaN(startDate.getTime())) {
      toast({ variant: 'destructive', title: 'Error', description: 'Start date must be a valid date.' });
      return;
    }
    if (newExperience.endDate && (!endDate || isNaN(endDate.getTime()))) {
      toast({ variant: 'destructive', title: 'Error', description: 'End date must be a valid date.' });
      return;
    }
    const payload = {
      title: newExperience.title.trim(),
      company: newExperience.company.trim(),
      jobDescription: newExperience.description ? newExperience.description.trim() : '',
      startDate: startDate.toISOString(),
      endDate: newExperience.endDate ? endDate.toISOString() : null
    };
    console.log('Experience payload:', payload);
    try {
      const res = await apiFetch('http://localhost:3000/collab/v1/exp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setUserProfile((prev) => ({ ...prev, experience: [res.data, ...(prev.experience || [])] }));
      setNewExperience({ title: '', company: '', description: '', startDate: '', endDate: '' });
      setShowExpForm(false);
      toast({ title: 'Experience added!', description: 'New experience has been added.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error.message || 'Failed to add experience.') + (error.stack ? '\n' + error.stack : '') });
    }
  };

  const handleAddAcademic = async () => {
    if (!newAcademic.institute.trim() || !newAcademic.degree.trim() || !newAcademic.startYear) {
      toast({ variant: 'destructive', title: 'Error', description: 'Institute, degree, and start year are required.' });
      return;
    }
    const startYear = parseInt(newAcademic.startYear, 10);
    const endYear = newAcademic.endYear ? parseInt(newAcademic.endYear, 10) : null;
    if (isNaN(startYear)) {
      toast({ variant: 'destructive', title: 'Error', description: 'Start year must be a valid number.' });
      return;
    }
    if (newAcademic.endYear && isNaN(endYear)) {
      toast({ variant: 'destructive', title: 'Error', description: 'End year must be a valid number.' });
      return;
    }
    const payload = {
      institute: newAcademic.institute.trim(),
      degree: newAcademic.degree.trim(),
      startYear,
      endYear
    };
    console.log('Academic payload:', payload);
    try {
      const res = await apiFetch('http://localhost:3000/collab/v1/academics/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setUserProfile((prev) => ({ ...prev, academics: [res.data, ...(prev.academics || [])] }));
      setNewAcademic({ institute: '', degree: '', startYear: '', endYear: '' });
      setShowAcademicForm(false);
      toast({ title: 'Academic added!', description: 'New academic record has been added.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error.message || 'Failed to add academic.') + (error.stack ? '\n' + error.stack : '') });
    }
  };

  const handleAddProject = async () => {
    if (!newProject.name.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Project name is required.' });
      return;
    }
    const techUsedArr = newProject.techUsed.split(',').map(t => t.trim()).filter(Boolean);
    if (!Array.isArray(techUsedArr) || techUsedArr.length === 0) {
      toast({ variant: 'destructive', title: 'Error', description: 'At least one technology is required.' });
      return;
    }
    let status = (newProject.ProjectStatus || '').toLowerCase();
    if (status !== 'finished' && status !== 'in progress') status = 'finished';
    const payload = {
      name: newProject.name.trim(),
      description: newProject.description ? newProject.description.trim() : '',
      link: newProject.link ? newProject.link.trim() : '',
      techUsed: techUsedArr,
      status
    };
    console.log('Project payload:', payload);
    try {
      const res = await apiFetch('http://localhost:3000/collab/v1/project/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setUserProfile((prev) => ({ ...prev, projects: [res.project, ...(prev.projects || [])] }));
      setNewProject({ name: '', description: '', techUsed: '', link: '', ProjectStatus: '' });
      setShowProjectForm(false);
      toast({ title: 'Project added!', description: 'New project has been added.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error.message || 'Failed to add project.') + (error.stack ? '\n' + error.stack : '') });
    }
  };

  const handleDeleteAcademic = async (id) => {
    try {
      await apiFetch(`http://localhost:3000/collab/v1/academics/${id}`, { method: 'DELETE' });
      setUserProfile((prev) => ({ ...prev, academics: prev.academics.filter(a => a.id !== id) }));
      toast({ title: 'Academic deleted!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to delete academic.' });
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await apiFetch(`http://localhost:3000/collab/v1/exp/${id}`, { method: 'DELETE' });
      setUserProfile((prev) => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
      toast({ title: 'Experience deleted!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to delete experience.' });
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await apiFetch(`http://localhost:3000/collab/v1/project/${id}`, { method: 'DELETE' });
      setUserProfile((prev) => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
      toast({ title: 'Project deleted!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to delete project.' });
    }
  };

  // fallback mock data if not logged in
  const profile = userProfile || {
    fullName: "John Doe",
    tagLine: "Full-Stack Developer & Entrepreneur",
    profileSummary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivid finibus sit ut mauris bibendum aliqam elementum sit, vel sit lorem, ullamcorper lorem vulputate elit. Sit ut mauris bibendum. Neque bibendum et venenatis mauris, mauris bibendum aliqam elementum sit, vel sit lorem, ullamcorper lorem vulputate elit.",
    location: "San Francisco, CA",
    email: "john@example.com",
    github: "johndoe",
    linkedin: "johndoe",
    portfolio: "https://johndoe.dev",
    skills: [],
    academics: [],
    experience: [],
    projects: []
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-xl font-bold">theColeb</span>
          </div>
          <Button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">
                    {profile.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  {isEditing ? (
                    <Input 
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      className="text-2xl font-bold border-none p-0 h-auto"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                  )}
                </div>
                
                {isEditing ? (
                  <Input 
                    name="tagLine"
                    value={form.tagLine}
                    onChange={handleInputChange}
                    className="text-gray-600 border-none p-0 h-auto mb-4"
                  />
                ) : (
                  <p className="text-gray-600 mb-4">{profile.tagLine}</p>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {isEditing ? (
                      <Input
                        name="location"
                        value={form.location}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto"
                      />
                    ) : (
                      profile.location
                    )}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {profile.email}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input
                        name="github"
                        value={form.github}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto w-24 inline-block"
                      />
                    ) : (
                      "GitHub"
                    )}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto w-24 inline-block"
                      />
                    ) : (
                      "LinkedIn"
                    )}
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input
                        name="portfolio"
                        value={form.portfolio}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto w-24 inline-block"
                      />
                    ) : (
                      "Portfolio"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Skills */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Key Skills</CardTitle>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    className="w-32"
                  />
                  <Button size="sm" variant="outline" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(profile.skills || []).map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                  {isEditing && <span className="ml-2 cursor-pointer">×</span>}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea 
                name="profileSummary"
                className="w-full p-3 border rounded-md resize-none"
                rows={4}
                value={form.profileSummary}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profile.profileSummary}</p>
            )}
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="academics" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Academics</CardTitle>
                  <Button size="sm" onClick={() => setShowAcademicForm(v => !v)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Academic
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.academics.length === 0 && (
                  <div className="text-gray-500 text-center">No academic records yet.</div>
                )}
                {profile.academics.map((academic) => (
                  <div key={academic.id} className="border-l-2 border-primary-200 pl-6 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{academic.institute}</h3>
                        <p className="text-primary-600 font-medium">{academic.degree}</p>
                        <p className="text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {academic.startYear} - {academic.endYear}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditAcademicId(academic.id)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteAcademic(academic.id)}>Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {showAcademicForm && (
                  <div className="mb-4 p-4 border rounded bg-gray-50">
                    <Input placeholder="Institute" value={newAcademic.institute} onChange={e => setNewAcademic({ ...newAcademic, institute: e.target.value })} className="mb-2" />
                    <Input placeholder="Degree" value={newAcademic.degree} onChange={e => setNewAcademic({ ...newAcademic, degree: e.target.value })} className="mb-2" />
                    <Input placeholder="Start Year" value={newAcademic.startYear} onChange={e => setNewAcademic({ ...newAcademic, startYear: e.target.value })} className="mb-2" />
                    <Input placeholder="End Year" value={newAcademic.endYear} onChange={e => setNewAcademic({ ...newAcademic, endYear: e.target.value })} className="mb-2" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => {
                        if (!newAcademic.institute || !newAcademic.degree || !newAcademic.startYear) {
                          toast({ variant: 'destructive', title: 'Error', description: 'All fields except end year are required.' });
                          return;
                        }
                        handleAddAcademic();
                      }}>Add</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowAcademicForm(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Experience</CardTitle>
                  <Button size="sm" onClick={() => setShowExpForm(v => !v)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experience.length === 0 && (
                  <div className="text-gray-500 text-center">No experience records yet.</div>
                )}
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary-200 pl-6 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <Briefcase className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-primary-600 font-medium flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditExperienceId(exp.id)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteExperience(exp.id)}>Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {showExpForm && (
                  <div className="mb-4 p-4 border rounded bg-gray-50">
                    <Input placeholder="Title" value={newExperience.title} onChange={e => setNewExperience({ ...newExperience, title: e.target.value })} className="mb-2" />
                    <Input placeholder="Company" value={newExperience.company} onChange={e => setNewExperience({ ...newExperience, company: e.target.value })} className="mb-2" />
                    <Input placeholder="Description" value={newExperience.description} onChange={e => setNewExperience({ ...newExperience, description: e.target.value })} className="mb-2" />
                    <Input placeholder="Start Date" type="date" value={newExperience.startDate} onChange={e => setNewExperience({ ...newExperience, startDate: e.target.value })} className="mb-2" />
                    <Input placeholder="End Date" type="date" value={newExperience.endDate} onChange={e => setNewExperience({ ...newExperience, endDate: e.target.value })} className="mb-2" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => {
                        if (!newExperience.title || !newExperience.company || !newExperience.startDate) {
                          toast({ variant: 'destructive', title: 'Error', description: 'Title, company, and start date are required.' });
                          return;
                        }
                        handleAddExperience();
                      }}>Add</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowExpForm(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Projects</CardTitle>
                  <Button size="sm" onClick={() => setShowProjectForm(v => !v)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {profile.projects.length === 0 && (
                    <div className="text-gray-500 text-center">No projects yet.</div>
                  )}
                  {profile.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                          <p className="text-gray-700 mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.techUsed.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge 
                              variant={project.status === "Completed" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {project.status === 'finished' ? 'Completed' : project.status || 'In Progress'}
                            </Badge>
                            {project.link ? (
                              <a 
                                href={project.link} 
                                className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View Project
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">No link</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditProjectId(project.id)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {showProjectForm && (
                    <div className="mb-4 p-4 border rounded bg-gray-50">
                      <Input placeholder="Name" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} className="mb-2" />
                      <Input placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="mb-2" />
                      <Input placeholder="Tech Used (comma separated)" value={newProject.techUsed} onChange={e => setNewProject({ ...newProject, techUsed: e.target.value })} className="mb-2" />
                      <Input placeholder="Link" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} className="mb-2" />
                      <Input placeholder="Status (Completed/In Progress)" value={newProject.ProjectStatus} onChange={e => setNewProject({ ...newProject, ProjectStatus: e.target.value })} className="mb-2" />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          if (!newProject.name) {
                            toast({ variant: 'destructive', title: 'Error', description: 'Project name is required.' });
                            return;
                          }
                          handleAddProject();
                        }}>Add</Button>
                        <Button size="sm" variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
=======
import React, { useState, useEffect } from 'react';
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
import profileService from '../services/profileService';

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
    fullName: '',
    tagLine: '',
    location: '',
    email: '',
    phone: '',
    skills: [],
    summary: '',
    experiences: [],
    education: [],
    projects: []
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contactPublic, setContactPublic] = useState(true);
  const [missingTechProfile, setMissingTechProfile] = useState(false);
  const [missingBio, setMissingBio] = useState(false);

  // Fetch profile data on component mount and after saves
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setMissingTechProfile(false);
      setMissingBio(false);
      const [basicInfo, techProfileRes, bioRes] = await Promise.allSettled([
        profileService.getBasicInfo(),
        profileService.getTechProfile(),
        profileService.getBio()
      ]);

      let techProfile = [];
      if (techProfileRes.status === 'fulfilled') {
        techProfile = techProfileRes.value.data.techProfile?.skills || [];
      } else if (techProfileRes.reason?.response?.status === 404) {
        setMissingTechProfile(true);
      }

      let summary = '';
      if (bioRes.status === 'fulfilled') {
        summary = bioRes.value.data.bio?.shortBio || '';
      } else if (bioRes.reason?.response?.status === 404) {
        setMissingBio(true);
      }

      setProfileData(prev => ({
        ...prev,
        fullName: basicInfo.status === 'fulfilled' ? basicInfo.value.data.data.fullName || '' : '',
        tagLine: basicInfo.status === 'fulfilled' ? basicInfo.value.data.data.tagLine || '' : '',
        location: basicInfo.status === 'fulfilled' ? basicInfo.value.data.data.location || '' : '',
        email: basicInfo.status === 'fulfilled' ? basicInfo.value.data.data.email || '' : '',
        phone: basicInfo.status === 'fulfilled' ? basicInfo.value.data.data.phone || '' : '',
        skills: techProfile,
        summary: summary
      }));
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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

  const handleProfileSave = async (formData) => {
    try {
      await profileService.updateBasicInfo(formData);
      await fetchProfileData();
      setOpenEditProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleAcademicSave = async (formData) => {
    try {
      if (editingAcademic !== null) {
        await profileService.updateAcademic(editingAcademic, formData);
      } else {
        await profileService.addAcademic(formData);
      }
      await fetchProfileData();
      setOpenAcademicForm(false);
      toast.success(`Academic record ${editingAcademic !== null ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Error saving academic record:', error);
      toast.error('Failed to save academic record');
    }
  };

  const handleAcademicAdd = () => { setEditingAcademic(null); setOpenAcademicForm(true); };
  const handleAcademicEdit = (idx) => { setEditingAcademic(idx); setOpenAcademicForm(true); };
  const handleAcademicClose = () => setOpenAcademicForm(false);

  const handleExperienceSave = async (formData) => {
    try {
      if (editingExperience !== null) {
        await profileService.updateExperience(editingExperience, formData);
      } else {
        await profileService.addExperience(formData);
      }
      await fetchProfileData();
      setOpenExperienceForm(false);
      toast.success(`Experience ${editingExperience !== null ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    }
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
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (deleteDialog.type === 'education') {
        await profileService.deleteAcademic(deleteDialog.idx);
      } else if (deleteDialog.type === 'experience') {
        await profileService.deleteExperience(deleteDialog.idx);
      }
      
      setProfileData(prev => {
        const updated = { ...prev };
        if (deleteDialog.type === 'education') {
          updated.education = prev.education.filter((_, i) => i !== deleteDialog.idx);
        }
        if (deleteDialog.type === 'experience') {
          updated.experiences = prev.experiences.filter((_, i) => i !== deleteDialog.idx);
        }
        return updated;
      });
      
      setDeleteDialog({ open: false, type: '', idx: null });
      toast.success('Deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={handleExperienceAdd}
                  aria-label="Add experience"
                  sx={{ mb: 2, fontWeight: 600, textTransform: 'none' }}
                >
                  Add Experience
                </Button>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAcademicAdd}
                  aria-label="Add education"
                  sx={{ mb: 2, fontWeight: 600, textTransform: 'none' }}
                >
                  Add Education
                </Button>
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
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={handleProjectAdd}
                  aria-label="Add project"
                  sx={{ mb: 2, fontWeight: 600, textTransform: 'none' }}
                >
                  Add Project
                </Button>
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


>>>>>>> 99d1fff66b3988759386b131aeff98cf5b5ed013
