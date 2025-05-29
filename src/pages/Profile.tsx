
import { useState } from "react";
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("academics");

  // Mock user data
  const userProfile = {
    fullName: "John Doe",
    tagLine: "Full-Stack Developer & Entrepreneur",
    profileSummary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivid finibus sit ut mauris bibendum aliqam elementum sit, vel sit lorem, ullamcorper lorem vulputate elit. Sit ut mauris bibendum. Neque bibendum et venenatis mauris, mauris bibendum aliqam elementum sit, vel sit lorem, ullamcorper lorem vulputate elit.",
    location: "San Francisco, CA",
    email: "john@example.com",
    github: "johndoe",
    linkedin: "johndoe",
    portfolio: "https://johndoe.dev",
    skills: ["React", "Node.js", "Python", "TypeScript", "PostgreSQL"],
    academics: [
      {
        id: 1,
        institute: "Stanford University",
        degree: "Computer Science",
        startYear: "2018",
        endYear: "2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivid finibus sit ut mauris bibendum aliqam elementum sit, vel sit lorem, ullamcorper lorem vulputate elit. Sit ut mauris bibendum."
      },
      {
        id: 2,
        institute: "Harvard University",
        degree: "Business Administration",
        startYear: "2016",
        endYear: "2018",
        description: "Comprehensive understanding of business practices, strategy, finance. Various business certificate projects have facilitated understanding of business fundamentals. Third world business certificates leverage the business fundamentals properly."
      }
    ],
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Corp",
        startDate: "2022",
        endDate: "Present",
        description: "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and architecting system solutions."
      },
      {
        id: 2,
        title: "Software Developer",
        company: "StartupXYZ",
        startDate: "2020",
        endDate: "2022",
        description: "Built full-stack applications from scratch. Collaborated with product team to define requirements and deliver user-centric solutions."
      }
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "A modern e-commerce solution built with React, Node.js, and PostgreSQL",
        techUsed: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "https://github.com/johndoe/ecommerce",
        status: "Completed"
      },
      {
        id: 2,
        name: "Task Management App",
        description: "Real-time collaborative task management application",
        techUsed: ["React", "Socket.io", "MongoDB"],
        link: "https://github.com/johndoe/taskapp",
        status: "In Progress"
      }
    ]
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
          <Button onClick={() => setIsEditing(!isEditing)}>
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
                    {userProfile.fullName.split(' ').map(n => n[0]).join('')}
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
                      defaultValue={userProfile.fullName}
                      className="text-2xl font-bold border-none p-0 h-auto"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{userProfile.fullName}</h1>
                  )}
                </div>
                
                {isEditing ? (
                  <Input 
                    defaultValue={userProfile.tagLine}
                    className="text-gray-600 border-none p-0 h-auto mb-4"
                  />
                ) : (
                  <p className="text-gray-600 mb-4">{userProfile.tagLine}</p>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userProfile.location}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {userProfile.email}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Portfolio
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
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                  {isEditing && <span className="ml-2 cursor-pointer">×</span>}
                </Badge>
              ))}
              {isEditing && (
                <Badge variant="outline" className="px-3 py-1 cursor-pointer border-dashed">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Badge>
              )}
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
                className="w-full p-3 border rounded-md resize-none"
                rows={4}
                defaultValue={userProfile.profileSummary}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{userProfile.profileSummary}</p>
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
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Academic
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {userProfile.academics.map((academic) => (
                  <div key={academic.id} className="border-l-2 border-primary-200 pl-6 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary-500 rounded-full"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{academic.institute}</h3>
                        <p className="text-primary-600 font-medium">{academic.degree}</p>
                        <p className="text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {academic.startYear} - {academic.endYear}
                        </p>
                        <p className="text-gray-700">{academic.description}</p>
                      </div>
                      {isEditing && (
                        <Button size="sm" variant="ghost">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Experience</CardTitle>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {userProfile.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary-200 pl-6 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary-500 rounded-full"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-primary-600 font-medium flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                      {isEditing && (
                        <Button size="sm" variant="ghost">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Projects</CardTitle>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {userProfile.projects.map((project) => (
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
                              {project.status}
                            </Badge>
                            <a 
                              href={project.link} 
                              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View Project
                            </a>
                          </div>
                        </div>
                        {isEditing && (
                          <Button size="sm" variant="ghost">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
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
