import { useState, useEffect, useRef } from "react";
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
  Briefcase,
  Menu,
  X,
  User,
  LogOut,
  Home,
  Users,
  Search,
  Bell,
  Settings,
  Rocket
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function Header({ currentPage, user, unreadNotifications = 0 }) {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const initials = (user?.fullName || user?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    function handleClick(e) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    if (profileDropdownOpen || notifOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileDropdownOpen, notifOpen, mobileMenuOpen]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchValue("");
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo and Dashboard */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
            <Rocket className="h-7 w-7 sm:h-8 sm:w-8 text-primary-600" />
            <span className="text-lg sm:text-2xl font-bold text-primary-600">theColeb</span>
          </div>
          <Button
            variant="ghost"
            className={`inline-flex font-semibold transition-colors px-3 sm:px-5 py-2 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-primary-700 dark:text-primary-200 hover:bg-primary-50 hover:text-primary-900 hover:scale-105 ${currentPage === 'dashboard' ? 'bg-primary-600 text-white scale-105 shadow-md' : ''}`}
            onClick={() => navigate("/dashboard")}
            aria-label="Dashboard"
            aria-current={currentPage === 'dashboard' ? 'page' : undefined}
            style={{ transition: 'all 0.15s cubic-bezier(.4,0,.2,1)' }}
          >
            <span className="inline">Dashboard</span>
          </Button>
        </div>
        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" className="p-2" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {/* Main header actions (desktop) */}
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          <form className="relative w-32 sm:w-64" onSubmit={handleSearchSubmit} role="search">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search co-founders..."
              className="pl-10 w-full dark:bg-gray-800 dark:text-primary-100 text-sm sm:text-base"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              aria-label="Search co-founders"
            />
            {searchValue && (
              <button
                type="button"
                className="absolute right-10 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-700 focus:outline-none"
                onClick={() => setSearchValue("")}
                aria-label="Clear search"
                tabIndex={0}
              >
                ×
              </button>
            )}
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-200 hover:text-primary-800">
              <Search className="h-5 w-5" />
            </button>
          </form>
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-200 shadow border border-primary-200 dark:border-gray-700 p-2 transition-colors hover:bg-primary-50 hover:text-primary-900 focus:bg-primary-50 focus:text-primary-900 focus:outline-none"
              aria-label="Notifications"
              ref={notifRef}
              onClick={() => setNotifOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={notifOpen}
              tabIndex={0}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </Button>
            {notifOpen && (
              <div className="absolute z-50 mt-2 right-0 min-w-[220px] max-h-60 overflow-y-auto bg-white dark:bg-gray-900 border border-primary-200 dark:border-gray-700 rounded-lg shadow-xl animate-fade-in text-primary-800 dark:text-primary-100" style={{ top: '100%' }}>
                <div className="absolute -top-2 right-4 w-4 h-4 overflow-hidden">
                  <div className="w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-primary-200 dark:border-gray-700 rotate-45 shadow-sm"></div>
                </div>
                <div className="p-4 text-center">
                  <span className="block py-2">No notifications yet.</span>
                </div>
              </div>
            )}
          </div>
          <div ref={profileDropdownRef} className="relative group">
            <button
              className="rounded-full bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-200 shadow border border-primary-200 dark:border-gray-700 p-1 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 ml-1 transition-colors hover:bg-primary-50 hover:text-primary-900 focus:bg-primary-50 focus:text-primary-900 focus:outline-none"
              aria-label="User menu"
              onClick={() => setProfileDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
              tabIndex={0}
            >
              <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-primary-300 dark:border-gray-700 shadow bg-primary-200 dark:bg-gray-700">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-primary-800 dark:text-primary-100 bg-primary-200 dark:bg-gray-700 border border-primary-300 dark:border-gray-700">{initials}</AvatarFallback>
              </Avatar>
            </button>
            {profileDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 sm:w-44 bg-white dark:bg-gray-900 border border-primary-200 dark:border-gray-700 rounded-lg shadow-xl z-50 animate-fade-in md:left-auto md:translate-x-0 md:right-0">
                <button
                  className="w-full flex items-center px-5 py-3 text-primary-800 dark:text-primary-100 hover:bg-primary-50 dark:hover:bg-gray-800 focus:bg-primary-50 dark:focus:bg-gray-800 focus:outline-none transition-colors text-base"
                  onClick={() => { setProfileDropdownOpen(false); navigate("/profile"); }}
                  tabIndex={0}
                  aria-label="Profile"
                >
                  <User className="h-4 w-4 mr-2 text-primary-800 dark:text-primary-100" /> Profile
                </button>
                <button
                  className="w-full flex items-center px-5 py-3 text-primary-800 dark:text-primary-100 hover:bg-primary-50 dark:hover:bg-gray-800 focus:bg-primary-50 dark:focus:bg-gray-800 focus:outline-none transition-colors text-base"
                  onClick={() => { setProfileDropdownOpen(false); localStorage.removeItem("token"); navigate("/login"); }}
                  tabIndex={0}
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4 mr-2 text-primary-800 dark:text-primary-100" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-primary-200 dark:border-gray-700 shadow-lg z-50 flex flex-col items-start p-4 space-y-4 md:hidden animate-fade-in">
              <Button
                variant="ghost"
                className={`w-full text-left font-semibold transition-colors px-5 py-2 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-primary-700 dark:text-primary-200 hover:bg-primary-50 hover:text-primary-900 hover:scale-105 ${currentPage === 'dashboard' ? 'bg-primary-600 text-white scale-105 shadow-md' : ''}`}
                onClick={() => { setMobileMenuOpen(false); navigate("/dashboard"); }}
                aria-label="Dashboard"
                aria-current={currentPage === 'dashboard' ? 'page' : undefined}
              >
                <span className="inline">Dashboard</span>
              </Button>
              <form className="relative w-full" onSubmit={handleSearchSubmit} role="search">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search co-founders..."
                  className="pl-10 w-full dark:bg-gray-800 dark:text-primary-100"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  aria-label="Search co-founders"
                />
                {searchValue && (
                  <button
                    type="button"
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-700 focus:outline-none"
                    onClick={() => setSearchValue("")}
                    aria-label="Clear search"
                    tabIndex={0}
                  >
                    ×
                  </button>
                )}
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-200 hover:text-primary-800">
                  <Search className="h-5 w-5" />
                </button>
              </form>
              <div className="relative w-full flex justify-start">
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-200 shadow border border-primary-200 dark:border-gray-700 p-2 transition-colors hover:bg-primary-50 hover:text-primary-900 focus:bg-primary-50 focus:text-primary-900 focus:outline-none"
                  aria-label="Notifications"
                  ref={notifRef}
                  onClick={() => setNotifOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={notifOpen}
                  tabIndex={0}
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
                {notifOpen && (
                  <div className="absolute z-50 mt-2 left-0 min-w-[220px] max-h-60 overflow-y-auto bg-white dark:bg-gray-900 border border-primary-200 dark:border-gray-700 rounded-lg shadow-xl animate-fade-in text-primary-800 dark:text-primary-100" style={{ top: '100%' }}>
                    <div className="absolute -top-2 left-4 w-4 h-4 overflow-hidden">
                      <div className="w-4 h-4 bg-white dark:bg-gray-900 border-l border-t border-primary-200 dark:border-gray-700 rotate-45 shadow-sm"></div>
                    </div>
                    <div className="p-4 text-center">
                      <span className="block py-2">No notifications yet.</span>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="rounded-full bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-200 shadow border border-primary-200 dark:border-gray-700 p-1 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 ml-1 transition-colors hover:bg-primary-50 hover:text-primary-900 focus:bg-primary-50 focus:text-primary-900 focus:outline-none"
                aria-label="User menu"
                onClick={() => setProfileDropdownOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
                tabIndex={0}
              >
                <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-primary-300 dark:border-gray-700 shadow bg-primary-200 dark:bg-gray-700">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-primary-800 dark:text-primary-100 bg-primary-200 dark:bg-gray-700 border border-primary-300 dark:border-gray-700">{initials}</AvatarFallback>
                </Avatar>
              </button>
              {profileDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 sm:w-44 bg-white dark:bg-gray-900 border border-primary-200 dark:border-gray-700 rounded-lg shadow-xl z-50 animate-fade-in md:left-auto md:translate-x-0 md:right-0">
                  <button
                    className="w-full flex items-center px-5 py-3 text-primary-800 dark:text-primary-100 hover:bg-primary-50 dark:hover:bg-gray-800 focus:bg-primary-50 dark:focus:bg-gray-800 focus:outline-none transition-colors text-base"
                    onClick={() => { setProfileDropdownOpen(false); navigate("/profile"); }}
                    tabIndex={0}
                    aria-label="Profile"
                  >
                    <User className="h-4 w-4 mr-2 text-primary-800 dark:text-primary-100" /> Profile
                  </button>
                  <button
                    className="w-full flex items-center px-5 py-3 text-primary-800 dark:text-primary-100 hover:bg-primary-50 dark:hover:bg-gray-800 focus:bg-primary-50 dark:focus:bg-gray-800 focus:outline-none transition-colors text-base"
                    onClick={() => { setProfileDropdownOpen(false); localStorage.removeItem("token"); navigate("/login"); }}
                    tabIndex={0}
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4 mr-2 text-primary-800 dark:text-primary-100" /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

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
    profileSummary: "",
    skills: []
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
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    async function fetchUser() {
      try {
        const res = await apiFetch("http://localhost:3000/collab/v1/info/profile");
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
          profileSummary: res.user.bioSummary?.shortBio || "",
          skills: res.user.technicalProfile?.skills || []
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

  useEffect(() => {
    function handleClick(e) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    if (profileDropdownOpen || notifOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileDropdownOpen, notifOpen]);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      // Update basic info
      await apiFetch("http://localhost:3000/collab/v1/info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          location: form.location
        })
      });

      // Update bio summary
      await apiFetch("http://localhost:3000/collab/v1/bio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortBio: form.profileSummary,
          tagline: form.tagLine
        })
      });

      // Update skills
      await apiFetch("http://localhost:3000/collab/v1/tech-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: form.skills
        })
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
      await apiFetch("http://localhost:3000/collab/v1/tech-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: updatedSkills })
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
  const profile = {
    ...userProfile,
    academics: (userProfile && Array.isArray(userProfile.academics)) ? userProfile.academics : [],
    experience: (userProfile && Array.isArray(userProfile.experience)) ? userProfile.experience : [],
    projects: (userProfile && Array.isArray(userProfile.projects)) ? userProfile.projects : [],
  } || {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header currentPage="profile" user={userProfile} unreadNotifications={0} />
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8 shadow-lg bg-white/90">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 shadow border-2 border-primary-200">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">
                    {(profile.fullName || '').split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-primary-600 hover:bg-primary-700 text-white shadow-lg border-2 border-white transition" variant="default">
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
                      className="text-2xl font-bold border-none p-0 h-auto bg-transparent focus:ring-0 focus:border-b-2 focus:border-primary-500"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profile.fullName || ''}</h1>
                  )}
                  <Button
                    onClick={() => {
                      if (isEditing) handleSave();
                      else setIsEditing(true);
                    }}
                    className={`ml-4 px-4 py-2 rounded-md font-semibold transition bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:outline-none shadow ${isEditing ? 'ring-2 ring-primary-400' : ''}`}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
                {isEditing ? (
                  <Input 
                    name="tagLine"
                    value={form.tagLine}
                    onChange={handleInputChange}
                    className="text-gray-600 border-none p-0 h-auto mb-4 bg-transparent focus:ring-0 focus:border-b-2 focus:border-primary-500"
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
                        className="border-none p-0 h-auto bg-transparent focus:ring-0 focus:border-b-2 focus:border-primary-500"
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
                  <Button size="sm" variant="outline" className="hover:bg-primary-50 hover:text-primary-700 transition">
                    <Github className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input
                        name="github"
                        value={form.github}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto w-24 inline-block bg-transparent focus:ring-0 focus:border-b-2 focus:border-primary-500"
                      />
                    ) : (
                      "GitHub"
                    )}
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-primary-50 hover:text-primary-700 transition">
                    <Linkedin className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto w-24 inline-block bg-transparent focus:ring-0 focus:border-b-2 focus:border-primary-500"
                      />
                    ) : (
                      "LinkedIn"
                    )}
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-primary-50 hover:text-primary-700 transition">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <Input
                        name="portfolio"
                        value={form.portfolio}
                        onChange={handleInputChange}
                        className="border-none p-0 h-auto w-24 inline-block bg-transparent focus:ring-0 focus:border-b-2 focus:border-primary-500"
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
