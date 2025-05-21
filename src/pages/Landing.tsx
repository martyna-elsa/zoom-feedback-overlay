import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartBar, Download, Home, Star, Users, TrendingUp, Award, Medal, SlidersHorizontal, Settings, Info, Upload, Link as LinkIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for learner skills progress
const skillsData = [{
  month: 'Jan',
  pronunciation: 65,
  grammar: 70,
  confidence: 60,
  comprehension: 72,
  vocabulary: 68,
  intonation: 63,
  fluency: 65,
  negotiation: 70,
  persuasion: 67,
  understanding: 74,
  coherence: 71
}, {
  month: 'Feb',
  pronunciation: 68,
  grammar: 72,
  confidence: 63,
  comprehension: 75,
  vocabulary: 70,
  intonation: 65,
  fluency: 68,
  negotiation: 73,
  persuasion: 70,
  understanding: 77,
  coherence: 73
}, {
  month: 'Mar',
  pronunciation: 72,
  grammar: 73,
  confidence: 68,
  comprehension: 78,
  vocabulary: 74,
  intonation: 68,
  fluency: 71,
  negotiation: 75,
  persuasion: 73,
  understanding: 79,
  coherence: 75
}, {
  month: 'Apr',
  pronunciation: 75,
  grammar: 76,
  confidence: 72,
  comprehension: 80,
  vocabulary: 77,
  intonation: 71,
  fluency: 74,
  negotiation: 78,
  persuasion: 75,
  understanding: 81,
  coherence: 78
}, {
  month: 'May',
  pronunciation: 78,
  grammar: 78,
  confidence: 75,
  comprehension: 82,
  vocabulary: 80,
  intonation: 74,
  fluency: 77,
  negotiation: 81,
  persuasion: 78,
  understanding: 84,
  coherence: 80
}];

// Define skill categories
const CATEGORIES = {
  ENGLISH: "english-proficiency",
  SOFT: "soft-skills",
  COMMUNICATION: "communication-competency"
};

// Define skill categories mapping
const skillCategories = {
  pronunciation: CATEGORIES.ENGLISH,
  grammar: CATEGORIES.ENGLISH,
  vocabulary: CATEGORIES.ENGLISH,
  intonation: CATEGORIES.ENGLISH,
  fluency: CATEGORIES.ENGLISH,
  negotiation: CATEGORIES.SOFT,
  persuasion: CATEGORIES.SOFT,
  understanding: CATEGORIES.COMMUNICATION,
  confidence: CATEGORIES.COMMUNICATION,
  coherence: CATEGORIES.COMMUNICATION,
  comprehension: CATEGORIES.COMMUNICATION
};

// Sample data for radar chart
const radarData = [{
  name: "Pronunciation",
  value: 78,
  category: CATEGORIES.ENGLISH
}, {
  name: "Grammar",
  value: 78,
  category: CATEGORIES.ENGLISH
}, {
  name: "Vocabulary",
  value: 80,
  category: CATEGORIES.ENGLISH
}, {
  name: "Intonation",
  value: 74,
  category: CATEGORIES.ENGLISH
}, {
  name: "Fluency",
  value: 77,
  category: CATEGORIES.ENGLISH
}, {
  name: "Negotiation",
  value: 81,
  category: CATEGORIES.SOFT
}, {
  name: "Persuasion",
  value: 78,
  category: CATEGORIES.SOFT
}, {
  name: "Understanding",
  value: 84,
  category: CATEGORIES.COMMUNICATION
}, {
  name: "Confidence",
  value: 75,
  category: CATEGORIES.COMMUNICATION
}, {
  name: "Coherence",
  value: 80,
  category: CATEGORIES.COMMUNICATION
}];

// Sample data for goals achievement
const goalsData = [{
  name: 'Sarah',
  target: 85,
  achieved: 78
}, {
  name: 'Michael',
  target: 80,
  achieved: 82
}, {
  name: 'Emma',
  target: 75,
  achieved: 80
}, {
  name: 'James',
  target: 90,
  achieved: 85
}, {
  name: 'Olivia',
  target: 85,
  achieved: 88
}];

// Sample data for top performing learners
const topLearners = [{
  id: 1,
  name: 'Emma Davis',
  progress: 94,
  improvement: '+15%',
  calls: 24
}, {
  id: 2,
  name: 'Michael Chen',
  progress: 92,
  improvement: '+12%',
  calls: 18
}, {
  name: 'Sarah Johnson',
  progress: 89,
  improvement: '+10%',
  calls: 22
}, {
  id: 3,
  name: 'James Wilson',
  progress: 87,
  improvement: '+8%',
  calls: 20
}, {
  id: 4,
  name: 'David Thompson',
  progress: 85,
  improvement: '+9%',
  calls: 16
}];
const chartConfig = {
  pronunciation: {
    label: 'Pronunciation',
    color: '#4f46e5'
  },
  grammar: {
    label: 'Grammar',
    color: '#0ea5e9'
  },
  confidence: {
    label: 'Confidence',
    color: '#10b981'
  },
  comprehension: {
    label: 'Comprehension',
    color: '#f59e0b'
  },
  target: {
    label: 'Target',
    color: '#6366f1'
  },
  achieved: {
    label: 'Achieved',
    color: '#10b981'
  }
};
const getCategoryColor = category => {
  switch (category) {
    case CATEGORIES.ENGLISH:
      return "#3b82f6";
    // blue
    case CATEGORIES.SOFT:
      return "#10b981";
    // green
    case CATEGORIES.COMMUNICATION:
      return "#8b5cf6";
    // purple
    default:
      return "#6b7280";
    // gray
  }
};
const categoryLabels = {
  [CATEGORIES.ENGLISH]: "English Proficiency",
  [CATEGORIES.SOFT]: "Soft Skills",
  [CATEGORIES.COMMUNICATION]: "Communication Competency"
};
const Landing: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('3months');
  const [showAdminSection, setShowAdminSection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [webPlatformDialogOpen, setWebPlatformDialogOpen] = useState<boolean>(false);
  const [copilotDialogOpen, setCopilotDialogOpen] = useState<boolean>(false);

  // Filter radar data without categories selection
  const filteredRadarData = radarData;

  // Get all skills without filtering
  const getFilteredSkills = () => {
    return Object.keys(skillCategories);
  };
  const filteredSkills = getFilteredSkills();

  // Calculate total proficiency score
  const totalProficiency = Math.round(radarData.reduce((sum, item) => sum + item.value, 0) / radarData.length);
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
      <div className="bg-white p-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ELSA Platform</h1>
          <div>
            <Button variant={showAdminSection ? "default" : "outline"} className="mr-2" onClick={() => setShowAdminSection(!showAdminSection)}>
              {showAdminSection ? "Hide Admin View" : "Show Admin View"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center pt-2 pb-10">
        <div className="max-w-6xl w-full px-4">
          {!showAdminSection ? <>
              <div className="text-center mb-4">
                <div className="flex justify-center mb-2">
                  <img src="/lovable-uploads/ac25a11a-4252-4d7c-9f4b-5bad76e27357.png" alt="ELSA Logo" className="h-24" />
                </div>
                {/* Tagline removed */}
              </div>
              
              <Tabs defaultValue="general" className="w-full mb-2">
                <TabsList className="mb-4">
                  {/* General tab button removed as requested */}
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* ELSA Web Platform Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow">
                      <div className="bg-blue-800 p-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-semibold text-white mb-2">ELSA Web Platform</h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-blue-700" onClick={() => setWebPlatformDialogOpen(true)}>
                                  <Info className="h-5 w-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>More information</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-blue-100">Track your progress, review past calls, and get ready to shine.</p>
                      </div>
                      <div className="p-6">
                        <ul className="text-gray-600 mb-8 space-y-6">
                          <li>
                            <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                              <h4 className="font-bold text-blue-800 mb-2">Before the meeting:</h4>
                              <div className="pl-2 space-y-1">
                                <div className="flex items-start">
                                  <span className="mr-2">✨</span>
                                  <span>Memory Whisperer</span>
                                </div>
                                <div className="flex items-start">
                                  <span className="mr-2">📍</span>
                                  <span>Meeting Agenda Assistant</span>
                                </div>
                                <div className="flex items-start">
                                  <span className="mr-2">🌀</span>
                                  <span>Practice Calls</span>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="bg-indigo-50 p-3 rounded-md border-l-4 border-indigo-500">
                              <h4 className="font-bold text-indigo-800 mb-2">After the meeting:</h4>
                              <div className="pl-2 space-y-1">
                                <div className="flex items-start">
                                  <span className="mr-2">🗺️</span>
                                  <span>Post-Meeting Influence Map</span>
                                </div>
                                <div className="flex items-start">
                                  <span className="mr-2">✅</span>
                                  <span>Action Summary Generator</span>
                                </div>
                                <div className="flex items-start">
                                  <span className="mr-2">📈</span>
                                  <span>Skills Progress</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <Link to="/web-platform">
                          <Button className="w-full">
                            <span>👉 Enter ELSA Web Platform</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    {/* ELSA Copilot Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow">
                      <div className="bg-indigo-800 p-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-semibold text-white mb-2">ELSA Copilot</h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-indigo-700" onClick={() => setCopilotDialogOpen(true)}>
                                  <Info className="h-5 w-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>More information</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-indigo-100">Get live AI support to boost your video call performance.</p>
                      </div>
                      <div className="p-6">
                        <ul className="text-gray-600 mb-8 space-y-2">
                          <li className="flex items-center gap-2">
                            
                            <span>🧠 Strategic Presence Engine</span>
                          </li>
                          <li className="flex items-center gap-2">
                            
                            <span>🔍 Real-Time Intelligence</span>
                          </li>
                          <li className="flex items-center gap-2">
                            
                            <span>💡 On-Demand Ideation</span>
                          </li>
                          <li className="flex items-center gap-2">
                            
                            <span>📘 English Communication Coach</span>
                          </li>
                        </ul>
                        <Link to="/video-call">
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                            <Download className="mr-2 h-5 w-5" />
                            <span>📥 Download ELSA Copilot</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </> : <div className="max-w-6xl mx-auto">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Learner Performance Overview</h2>
                <div className="flex gap-2">
                  <Button variant={timeRange === '1month' ? "default" : "outline"} size="sm" onClick={() => setTimeRange('1month')}>
                    1 Month
                  </Button>
                  <Button variant={timeRange === '3months' ? "default" : "outline"} size="sm" onClick={() => setTimeRange('3months')}>
                    3 Months
                  </Button>
                  <Button variant={timeRange === '6months' ? "default" : "outline"} size="sm" onClick={() => setTimeRange('6months')}>
                    6 Months
                  </Button>
                  <Button variant={timeRange === '1year' ? "default" : "outline"} size="sm" onClick={() => setTimeRange('1year')}>
                    1 Year
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">+12 from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalProficiency}%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82%</div>
                    <p className="text-xs text-muted-foreground">+3% from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Updated chart section - now full width */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card className="col-span-1">
                  <CardHeader className="flex flex-row justify-between">
                    <div>
                      <CardTitle>Skills Development Over Time</CardTitle>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(categoryLabels).map(([category, label]) => <Badge key={category} variant="outline" className="flex items-center gap-1" style={{
                      backgroundColor: `${getCategoryColor(category)}10`,
                      borderColor: `${getCategoryColor(category)}40`,
                      color: getCategoryColor(category)
                    }}>
                            <span className="w-2 h-2 rounded-full" style={{
                        backgroundColor: getCategoryColor(category)
                      }}></span>
                            {label}
                          </Badge>)}
                      </div>
                    </div>
                    <Card className="p-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                        
                      </div>
                    </Card>
                  </CardHeader>
                  <CardContent className="h-[600px]">
                    <ChartContainer config={chartConfig}>
                      <LineChart data={skillsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[55, 85]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" formatter={value => {
                      // Map skill keys to their full readable names
                      const skillNames = {
                        pronunciation: "Pronunciation",
                        grammar: "Grammar",
                        vocabulary: "Vocabulary",
                        intonation: "Intonation",
                        fluency: "Fluency",
                        negotiation: "Negotiation",
                        persuasion: "Persuasion",
                        understanding: "Understanding",
                        confidence: "Confidence",
                        coherence: "Coherence",
                        comprehension: "Comprehension"
                      };
                      return skillNames[value] || value;
                    }} />
                        
                        {/* Render all lines since we're not filtering anymore */}
                        <Line type="monotone" dataKey="pronunciation" stroke="#3b82f6" strokeWidth={2} dot={{
                      r: 4
                    }} activeDot={{
                      r: 6
                    }} />
                        <Line type="monotone" dataKey="grammar" stroke="#60a5fa" strokeWidth={2} />
                        <Line type="monotone" dataKey="vocabulary" stroke="#93c5fd" strokeWidth={2} />
                        <Line type="monotone" dataKey="intonation" stroke="#bae6fd" strokeWidth={2} />
                        <Line type="monotone" dataKey="fluency" stroke="#dbeafe" strokeWidth={2} />
                        <Line type="monotone" dataKey="negotiation" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="persuasion" stroke="#34d399" strokeWidth={2} />
                        <Line type="monotone" dataKey="understanding" stroke="#8b5cf6" strokeWidth={2} />
                        <Line type="monotone" dataKey="confidence" stroke="#a78bfa" strokeWidth={2} />
                        <Line type="monotone" dataKey="coherence" stroke="#c4b5fd" strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Radar</CardTitle>
                      <div className="text-sm text-muted-foreground">Current skill levels across categories</div>
                    </CardHeader>
                    <CardContent className="h-80">
                      <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={filteredRadarData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="name" tick={{
                          fill: "#6b7280",
                          fontSize: 12
                        }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={{
                          fill: "#6b7280"
                        }} />
                            <RechartsTooltip />
                            <Radar name="Current Level" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Call Objectives Achievement</CardTitle>
                      <div className="text-sm text-muted-foreground">Target vs. achieved progress</div>
                    </CardHeader>
                    <CardContent className="h-80">
                      <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={goalsData} margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="target" name="Target" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="achieved" name="Achieved" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Learners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Rank</th>
                          <th className="text-left p-2 font-medium">Name</th>
                          <th className="text-left p-2 font-medium">Skills Progress</th>
                          <th className="text-left p-2 font-medium">Skills Improvement</th>
                          <th className="text-left p-2 font-medium">Total Calls</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topLearners.map((learner, index) => <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 flex items-center gap-2">
                              {index === 0 ? <Medal className="h-4 w-4 text-yellow-500" /> : index === 1 ? <Medal className="h-4 w-4 text-gray-400" /> : index === 2 ? <Medal className="h-4 w-4 text-amber-700" /> : <span className="text-sm text-gray-500">{index + 1}</span>}
                            </td>
                            <td className="p-2">{learner.name}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{
                              width: `${learner.progress}%`
                            }}></div>
                                </div>
                                <span className="text-sm">{learner.progress}%</span>
                              </div>
                            </td>
                            <td className="p-2 text-green-600">{learner.improvement}</td>
                            <td className="p-2">{learner.calls}</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>}
        </div>
      </div>
      
      {/* Web Platform Info Dialog */}
      <Dialog open={webPlatformDialogOpen} onOpenChange={setWebPlatformDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800">ELSA Web Platform Features</DialogTitle>
            <DialogDescription>
              Enhance your meeting preparation and follow-up with these powerful tools
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Before the meeting section */}
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Before the Meeting</h3>
              <div className="space-y-4">
                {/* Memory Whisperer section */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <span className="text-xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Memory Whisperer</h4>
                      <p className="text-gray-600">Never forget important details from past meetings and conversations.</p>
                      <div className="mt-2 bg-blue-100 p-3 rounded-md">
                        <p className="italic text-blue-800">PM asks, "Didn't we commit to that change last week?"</p>
                        <div className="mt-2">
                          <p className="font-medium text-blue-800">ELSA suggests:</p>
                          <p className="text-blue-800">"Yes — you agreed to update the onboarding flow by this Friday."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Meeting Agenda Assistant section */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Meeting Agenda Assistant (New)</h4>
                      <p className="text-gray-600">Start focused. Arrive prepared.</p>
                      <div className="mt-2 bg-blue-100 p-3 rounded-md">
                        <p className="italic text-blue-800">Calendar invite says: "Weekly Ops Review"</p>
                        <p className="italic text-blue-800">Recent Slack mentions: "Bring up the API delay and vendor issue."</p>
                        <div className="mt-2">
                          <p className="font-medium text-blue-800">ELSA suggests:</p>
                          <p className="text-blue-800">"Suggested agenda:</p>
                          <ul className="list-disc pl-5 mt-2 text-blue-800">
                            <li>Review team KPIs</li>
                            <li>Address vendor delay</li>
                            <li>Update on API progress</li>
                            <li>Hiring status"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Practice Calls section */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <span className="text-xl">🌀</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Practice Calls</h4>
                      <p className="text-gray-600">Rehearse important conversations and get AI feedback on your language skills.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* After the meeting section */}
            <div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">After the Meeting</h3>
              <div className="space-y-4">
                {/* Post-Meeting Influence Map section */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <span className="text-xl">🗺️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900">Post-Meeting Influence Map</h4>
                      <p className="text-gray-600">Get clear action items and insights about stakeholder positions.</p>
                      <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                        <p className="italic text-indigo-800">During discussion: "James pushed back hard on the pricing model."</p>
                        <div className="mt-2">
                          <p className="font-medium text-indigo-800">ELSA suggests:</p>
                          <p className="text-indigo-800">"James is not aligned on the pricing — flag for follow-up.<br />
                          Sandra remained neutral.<br />
                          Ling showed early support."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Summary Generator section */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <span className="text-xl">✅</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900">Action Summary Generator (New)</h4>
                      <p className="text-gray-600">Auto-generate next steps and responsibilities.</p>
                      <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                        <p className="italic text-indigo-800">Meeting ends with several unresolved threads.</p>
                        <div className="mt-2">
                          <p className="font-medium text-indigo-800">ELSA suggests:</p>
                          <p className="text-indigo-800">"Next Steps:</p>
                          <ul className="list-disc pl-5 mt-2 text-indigo-800">
                            <li>Anna to send product brief by Tuesday</li>
                            <li>Raj to confirm ad budget by Thursday</li>
                            <li>Team to reconvene on June 2 at 3 PM"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Skills Progress section - NEW */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <span className="text-xl">📈</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900">Skills Progress</h4>
                      <p className="text-gray-600">Track and visualize your language and communication improvements over time.</p>
                      <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                        <p className="italic text-indigo-800">After several client meetings this month.</p>
                        <div className="mt-2">
                          <p className="font-medium text-indigo-800">ELSA suggests:</p>
                          <p className="text-indigo-800">"Your skills have improved this month:</p>
                          <ul className="list-disc pl-5 mt-2 text-indigo-800">
                            <li>Negotiation skills: +12%</li>
                            <li>Pronunciation clarity: +8%</li>
                            <li>Persuasive techniques: +15%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Copilot Info Dialog */}
      <Dialog open={copilotDialogOpen} onOpenChange={setCopilotDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-800">ELSA Copilot Features</DialogTitle>
            <DialogDescription>
              Get real-time AI support during your video calls
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900">Strategic Presence Engine</h4>
                  <p className="text-gray-600">Read the room and adapt your communication for maximum impact.</p>
                  <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                    <p className="italic text-indigo-800">"Discussion turns contentious over budget allocation."</p>
                    <div className="mt-2">
                      <p className="font-medium text-indigo-800">ELSA suggests:</p>
                      <p className="text-indigo-800">"Pause now — your boss just took a strong stance. Suggest a bridging statement instead of pushing back."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <span className="text-xl">🔍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900">Real-Time Intelligence</h4>
                  <p className="text-gray-600">Get instant answers to tough questions by tapping into your company's knowledge base.</p>
                  <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                    <p className="italic text-indigo-800">"Your boss asks, "What's our churn rate in Vietnam last quarter?""</p>
                    <div className="mt-2">
                      <p className="font-medium text-indigo-800">ELSA suggests:</p>
                      <p className="text-indigo-800">"Churn dropped to 5.3%, mostly due to the March voice feedback launch."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900">On-Demand Ideation</h4>
                  <p className="text-gray-600">Quickly generate creative solutions and ideas during critical discussions.</p>
                  <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                    <p className="italic text-indigo-800">"The CMO says, "Any campaign ideas for India?""</p>
                    <div className="mt-2">
                      <p className="font-medium text-indigo-800">ELSA suggests:</p>
                      <p className="text-indigo-800">"Run a YouTube Shorts pronunciation challenge with regional influencers—mirrors our Vietnam success."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* New English Communication Coach section */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <span className="text-xl">📘</span>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900">English Communication Coach</h4>
                  <p className="text-gray-600">Boost confidence and clarity in real-time.</p>
                  <div className="mt-2 bg-indigo-100 p-3 rounded-md">
                    <p className="italic text-indigo-800">"You say: "We might can do that next week.""</p>
                    <div className="mt-2">
                      <p className="font-medium text-indigo-800">ELSA suggests:</p>
                      <p className="text-indigo-800">"Say 'We might be able to do that next week' — clearer and more professional."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="bg-white py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          &copy; 2025 ELSA Platform. All rights reserved.
        </div>
      </div>
    </div>;
};
export default Landing;
