import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartBar, Download, Home, Star, Users, TrendingUp, Award, Medal, SlidersHorizontal, Settings, Info, Upload, Link as LinkIcon } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for learner skills progress
const skillsData = [
  { month: 'Jan', pronunciation: 65, grammar: 70, confidence: 60, comprehension: 72, vocabulary: 68, intonation: 63, fluency: 65, negotiation: 70, persuasion: 67, understanding: 74, coherence: 71 },
  { month: 'Feb', pronunciation: 68, grammar: 72, confidence: 63, comprehension: 75, vocabulary: 70, intonation: 65, fluency: 68, negotiation: 73, persuasion: 70, understanding: 77, coherence: 73 },
  { month: 'Mar', pronunciation: 72, grammar: 73, confidence: 68, comprehension: 78, vocabulary: 74, intonation: 68, fluency: 71, negotiation: 75, persuasion: 73, understanding: 79, coherence: 75 },
  { month: 'Apr', pronunciation: 75, grammar: 76, confidence: 72, comprehension: 80, vocabulary: 77, intonation: 71, fluency: 74, negotiation: 78, persuasion: 75, understanding: 81, coherence: 78 },
  { month: 'May', pronunciation: 78, grammar: 78, confidence: 75, comprehension: 82, vocabulary: 80, intonation: 74, fluency: 77, negotiation: 81, persuasion: 78, understanding: 84, coherence: 80 },
];

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
const radarData = [
  { name: "Pronunciation", value: 78, category: CATEGORIES.ENGLISH },
  { name: "Grammar", value: 78, category: CATEGORIES.ENGLISH },
  { name: "Vocabulary", value: 80, category: CATEGORIES.ENGLISH },
  { name: "Intonation", value: 74, category: CATEGORIES.ENGLISH },
  { name: "Fluency", value: 77, category: CATEGORIES.ENGLISH },
  { name: "Negotiation", value: 81, category: CATEGORIES.SOFT },
  { name: "Persuasion", value: 78, category: CATEGORIES.SOFT },
  { name: "Understanding", value: 84, category: CATEGORIES.COMMUNICATION },
  { name: "Confidence", value: 75, category: CATEGORIES.COMMUNICATION },
  { name: "Coherence", value: 80, category: CATEGORIES.COMMUNICATION }
];

// Sample data for goals achievement
const goalsData = [
  { name: 'Sarah', target: 85, achieved: 78 },
  { name: 'Michael', target: 80, achieved: 82 },
  { name: 'Emma', target: 75, achieved: 80 },
  { name: 'James', target: 90, achieved: 85 },
  { name: 'Olivia', target: 85, achieved: 88 },
];

// Sample data for top performing learners
const topLearners = [
  { id: 1, name: 'Emma Davis', progress: 94, improvement: '+15%', calls: 24 },
  { id: 2, name: 'Michael Chen', progress: 92, improvement: '+12%', calls: 18 },
  { name: 'Sarah Johnson', progress: 89, improvement: '+10%', calls: 22 },
  { name: 'James Wilson', progress: 87, improvement: '+8%', calls: 20 },
  { name: 'David Thompson', progress: 85, improvement: '+9%', calls: 16 },
];

const chartConfig = {
  pronunciation: { label: 'Pronunciation', color: '#4f46e5' },
  grammar: { label: 'Grammar', color: '#0ea5e9' },
  confidence: { label: 'Confidence', color: '#10b981' },
  comprehension: { label: 'Comprehension', color: '#f59e0b' },
  target: { label: 'Target', color: '#6366f1' },
  achieved: { label: 'Achieved', color: '#10b981' },
};

const getCategoryColor = (category) => {
  switch (category) {
    case CATEGORIES.ENGLISH:
      return "#3b82f6"; // blue
    case CATEGORIES.SOFT:
      return "#10b981"; // green
    case CATEGORIES.COMMUNICATION:
      return "#8b5cf6"; // purple
    default:
      return "#6b7280"; // gray
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
  
  // Filter radar data without categories selection
  const filteredRadarData = radarData;
  
  // Get all skills without filtering
  const getFilteredSkills = () => {
    return Object.keys(skillCategories);
  };
  
  const filteredSkills = getFilteredSkills();
  
  // Calculate total proficiency score
  const totalProficiency = Math.round(
    radarData.reduce((sum, item) => sum + item.value, 0) / radarData.length
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
      <div className="bg-white p-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ELSA Platform</h1>
          <div>
            <Button 
              variant={showAdminSection ? "default" : "outline"}
              className="mr-2"
              onClick={() => setShowAdminSection(!showAdminSection)}
            >
              {showAdminSection ? "Hide Admin View" : "Show Admin View"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center pt-8 pb-16">
        <div className="max-w-6xl w-full px-4">
          {!showAdminSection ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome to ELSA</h2>
                <p className="text-lg text-gray-600">English Language Speech Assistant for professional development</p>
              </div>
              
              <Tabs defaultValue="ai-setup" className="w-full mb-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="ai-setup">AI Assistant Setup</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* ELSA Web Platform Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow">
                      <div className="bg-blue-800 p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">ELSA Web Platform</h3>
                        <p className="text-blue-100">Access your personal dashboard, view progress, and prepare for calls</p>
                      </div>
                      <div className="p-6">
                        <ul className="text-gray-600 mb-8 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>View Skills Progress</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>Call History</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>Call Preparation</span>
                          </li>
                        </ul>
                        <Link to="/web-platform">
                          <Button className="w-full">Enter ELSA Web Platform</Button>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Zoom Call Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow">
                      <div className="bg-indigo-800 p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">Enhance Video Call</h3>
                        <p className="text-indigo-100">Enable video calls with AI-powered assistance</p>
                      </div>
                      <div className="p-6">
                        <ul className="text-gray-600 mb-8 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <span>Real-time Conversation Analysis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <span>Facilitator Mode</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <span>Call Summary</span>
                          </li>
                        </ul>
                        <Link to="/video-call">
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                            <Download className="mr-2 h-5 w-5" />
                            Download Elsa AI Assistant
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai-setup" className="space-y-4 mt-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-2xl">Update Your Company Information</CardTitle>
                          <CardDescription className="text-lg">
                            Add details about your company to improve contextual feedback
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-1.5">
                          <div className="flex items-center gap-1">
                            <span className="rounded-full bg-green-500 w-2 h-2"></span>
                            Provided by Admin
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Alert className="bg-blue-50 text-blue-800 border-blue-200 mb-6">
                        <Info className="h-5 w-5" />
                        <AlertDescription>
                          Information already provided by Admin (Sarah Chen) on 2023-10-15. You can update if needed.
                        </AlertDescription>
                      </Alert>

                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Upload Document Card */}
                        <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer bg-white">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                              <Upload className="h-7 w-7 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg mb-1">Upload Document</h3>
                              <p className="text-gray-600">Upload company brochures, presentations or other documents</p>
                            </div>
                          </div>
                        </div>

                        {/* Company URL Card */}
                        <div className="border rounded-lg p-6 bg-white">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                              <LinkIcon className="h-7 w-7 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg mb-1">Paste Company URL</h3>
                              <p className="text-gray-600">Add your company website or LinkedIn page</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Input placeholder="https://yourcompany.com" type="url" className="flex-1" />
                            <Button>Analyze</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-2xl">Participant's Company Information</CardTitle>
                      <CardDescription className="text-lg">
                        Add details about the participant's company to receive more relevant insights
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Upload Document Card */}
                        <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer bg-white">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                              <Upload className="h-7 w-7 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg mb-1">Upload Document</h3>
                              <p className="text-gray-600">Upload materials about the participant's company</p>
                            </div>
                          </div>
                        </div>

                        {/* Company URL Card */}
                        <div className="border rounded-lg p-6 bg-white">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                              <LinkIcon className="h-7 w-7 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg mb-1">Paste Company URL</h3>
                              <p className="text-gray-600">Add their company website or LinkedIn page</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Input placeholder="https://theircompany.com" type="url" className="flex-1" />
                            <Button>Analyze</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            // Admin Dashboard Content
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Learner Performance Overview</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={timeRange === '1month' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange('1month')}
                  >
                    1 Month
                  </Button>
                  <Button 
                    variant={timeRange === '3months' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange('3months')}
                  >
                    3 Months
                  </Button>
                  <Button 
                    variant={timeRange === '6months' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange('6months')}
                  >
                    6 Months
                  </Button>
                  <Button 
                    variant={timeRange === '1year' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange('1year')}
                  >
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
                        {Object.entries(categoryLabels).map(([category, label]) => (
                          <Badge 
                            key={category}
                            variant="outline" 
                            className="flex items-center gap-1"
                            style={{
                              backgroundColor: `${getCategoryColor(category)}10`,
                              borderColor: `${getCategoryColor(category)}40`,
                              color: getCategoryColor(category)
                            }}
                          >
                            <span 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getCategoryColor(category) }}
                            ></span>
                            {label}
                          </Badge>
                        ))}
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
                        <Legend 
                          layout="vertical" 
                          verticalAlign="middle" 
                          align="right"
                          formatter={(value) => {
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
                          }}
                        />
                        
                        {/* Render all lines since we're not filtering anymore */}
                        <Line 
                          type="monotone" 
                          dataKey="pronunciation" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }}
                        />
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
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#6b7280" }} />
                            <Tooltip />
                            <Radar
                              name="Current Level"
                              dataKey="value"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.6}
                            />
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
                          <BarChart
                            data={goalsData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
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
                          <th className="text-left p-2 font-medium">Progress</th>
                          <th className="text-left p-2 font-medium">Improvement</th>
                          <th className="text-left p-2 font-medium">Total Calls</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topLearners.map((learner, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 flex items-center gap-2">
                              {index === 0 ? (
                                <Medal className="h-4 w-4 text-yellow-500" />
                              ) : index === 1 ? (
                                <Medal className="h-4 w-4 text-gray-400" />
                              ) : index === 2 ? (
                                <Medal className="h-4 w-4 text-amber-700" />
                              ) : (
                                <span className="text-sm text-gray-500">{index + 1}</span>
                              )}
                            </td>
                            <td className="p-2">{learner.name}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${learner.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{learner.progress}%</span>
                              </div>
                            </td>
                            <td className="p-2 text-green-600">{learner.improvement}</td>
                            <td className="p-2">{learner.calls}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          &copy; 2025 ELSA Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Landing;
