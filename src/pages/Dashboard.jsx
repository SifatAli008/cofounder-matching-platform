import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  PlusCircle, 
  Settings, 
  Bell,
  Search,
  Filter,
  Heart,
  Send,
  Home
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const user = {
  fullName: "John Doe",
  email: "john@example.com"
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const navigate = useNavigate();

  // Mock data
  const potentialMatches = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Full-Stack Developer",
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "Python"],
      bio: "Passionate about building scalable web applications. Looking for a business-minded co-founder to build the next big SaaS.",
      match: 92,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Product Manager",
      location: "Austin, TX",
      skills: ["Product Strategy", "UX/UI", "Analytics"],
      bio: "10+ years in product management. Seeking technical co-founder for fintech startup idea.",
      match: 87,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Emily Watson",
      title: "AI/ML Engineer",
      location: "Boston, MA",
      skills: ["Python", "TensorFlow", "Computer Vision"],
      bio: "PhD in Computer Science. Building AI solutions for healthcare. Looking for business development partner.",
      match: 84,
      avatar: "/placeholder.svg"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      author: "Alex Kim",
      time: "2 hours ago",
      content: "Just launched my MVP for a productivity app! Looking for feedback and potential co-founders who are passionate about productivity tools.",
      likes: 12,
      comments: 5
    },
    {
      id: 2,
      author: "Jessica Park",
      time: "4 hours ago",
      content: "Seeking a technical co-founder for an ed-tech startup. Have 5 years of experience in education and a solid business plan. DM me!",
      likes: 8,
      comments: 3
    }
  ];

  return (
    <>
      <Header active="dashboard" user={user} />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex items-center justify-between">
                  <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="discover">Discover</TabsTrigger>
                    <TabsTrigger value="feed">Feed</TabsTrigger>
                    <TabsTrigger value="connections">Connections</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                </div>

                <TabsContent value="discover" className="space-y-6">
                  <div className="grid gap-6">
                    {potentialMatches.map((match) => (
                      <Card key={match.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={match.avatar} />
                                <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-lg font-semibold">{match.name}</h3>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    {match.match}% match
                                  </Badge>
                                </div>
                                <p className="text-gray-600 font-medium">{match.title}</p>
                                <p className="text-sm text-gray-500 mb-3">{match.location}</p>
                                <p className="text-gray-700 mb-3">{match.bio}</p>
                                <div className="flex flex-wrap gap-2">
                                  {match.skills.map((skill) => (
                                    <Badge key={skill} variant="outline">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                                <Send className="h-4 w-4 mr-2" />
                                Connect
                              </Button>
                              <Button size="sm" variant="outline">
                                <Heart className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="feed" className="space-y-6">
                  <div className="grid gap-6">
                    {recentPosts.map((post) => (
                      <Card key={post.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold">{post.author}</h4>
                                <span className="text-sm text-gray-500">{post.time}</span>
                              </div>
                              <p className="text-gray-700 mb-4">{post.content}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center space-x-1 hover:text-primary-600">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-primary-600">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="connections" className="space-y-6">
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No connections yet</h3>
                    <p className="text-gray-500 mb-4">Start connecting with potential co-founders to see them here.</p>
                    <Button>
                      <Users className="h-4 w-4 mr-2" />
                      Discover Co-founders
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to get better matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Basic Info</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Technical Skills</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Project Portfolio</span>
                      <span className="text-yellow-600">Pending</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Bio & Goals</span>
                      <span className="text-yellow-600">Pending</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile Views</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Connection Requests</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Matches This Week</span>
                    <span className="font-semibold">12</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Python", "AI/ML", "Blockchain", "Mobile Dev", "Product Management"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
