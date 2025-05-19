
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChartBar, Download, TrendingUp, SlidersHorizontal, FileText } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend 
} from 'recharts';

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

// Sample data for call objectives achievement
const callObjectivesData = [
  { name: 'Sarah', target: 85, achieved: 78 },
  { name: 'Michael', target: 80, achieved: 82 },
  { name: 'Emma', target: 75, achieved: 80 },
  { name: 'James', target: 90, achieved: 85 },
  { name: 'Olivia', target: 85, achieved: 88 },
];

// Chart configuration
const chartConfig = {
  pronunciation: { label: 'Pronunciation', color: '#4f46e5' },
  grammar: { label: 'Grammar', color: '#0ea5e9' },
  confidence: { label: 'Confidence', color: '#10b981' },
  comprehension: { label: 'Comprehension', color: '#f59e0b' },
  target: { label: 'Target', color: '#6366f1' },
  achieved: { label: 'Achieved', color: '#10b981' },
};

// Helper function to get color based on category
const getCategoryColor = (category: string) => {
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

// Category labels mapping
const categoryLabels = {
  [CATEGORIES.ENGLISH]: "English Proficiency",
  [CATEGORIES.SOFT]: "Soft Skills",
  [CATEGORIES.COMMUNICATION]: "Communication Competency"
};

// User progress data for different metrics
const userProgress = {
  overall: 78,
  englishProficiency: 75,
  softSkills: 82,
  communicationCompetency: 79,
  improvement: "+8%",
  calls: 18,
  lastCall: "May 15, 2025"
};

// User assessment history
const assessmentHistory = [
  { date: "May 15, 2025", score: 78, improvement: "+3" },
  { date: "Apr 28, 2025", score: 75, improvement: "+2" },
  { date: "Apr 10, 2025", score: 73, improvement: "+4" },
  { date: "Mar 22, 2025", score: 69, improvement: "+1" },
  { date: "Mar 05, 2025", score: 68, improvement: "+3" },
];

const SkillsProgress: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('3months');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ELSA Platform</h1>
          <div className="flex gap-2">
            <Link to="/call-history">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Call History
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Skills Progress
              </h1>
              <p className="text-gray-500">Track your language and professional skills development over time</p>
            </div>
            
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="english">English Proficiency</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
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
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={timeRange === '1month' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setTimeRange('1month')}
                      >
                        1M
                      </Button>
                      <Button 
                        variant={timeRange === '3months' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setTimeRange('3months')}
                      >
                        3M
                      </Button>
                      <Button 
                        variant={timeRange === '6months' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setTimeRange('6months')}
                      >
                        6M
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[400px]">
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
                            return skillNames[value as keyof typeof skillNames] || value;
                          }}
                        />
                        
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
              </TabsContent>

              <TabsContent value="english">
                <Card>
                  <CardHeader>
                    <CardTitle>English Proficiency Skills</CardTitle>
                    <div className="text-sm text-muted-foreground">Focus on language mechanics and fluency</div>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ChartContainer config={chartConfig}>
                      <LineChart data={skillsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[55, 85]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <Line type="monotone" dataKey="pronunciation" name="Pronunciation" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="grammar" name="Grammar" stroke="#60a5fa" strokeWidth={2} />
                        <Line type="monotone" dataKey="vocabulary" name="Vocabulary" stroke="#93c5fd" strokeWidth={2} />
                        <Line type="monotone" dataKey="intonation" name="Intonation" stroke="#bae6fd" strokeWidth={2} />
                        <Line type="monotone" dataKey="fluency" name="Fluency" stroke="#dbeafe" strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="soft">
                <Card>
                  <CardHeader>
                    <CardTitle>Soft Skills Development</CardTitle>
                    <div className="text-sm text-muted-foreground">Professional communication abilities</div>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ChartContainer config={chartConfig}>
                      <LineChart data={skillsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[55, 85]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <Line type="monotone" dataKey="negotiation" name="Negotiation" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="persuasion" name="Persuasion" stroke="#34d399" strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communication">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Competency</CardTitle>
                    <div className="text-sm text-muted-foreground">Effectiveness in conveying ideas</div>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ChartContainer config={chartConfig}>
                      <LineChart data={skillsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[55, 85]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <Line type="monotone" dataKey="understanding" name="Understanding" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="confidence" name="Confidence" stroke="#a78bfa" strokeWidth={2} />
                        <Line type="monotone" dataKey="coherence" name="Coherence" stroke="#c4b5fd" strokeWidth={2} />
                        <Line type="monotone" dataKey="comprehension" name="Comprehension" stroke="#ddd6fe" strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Radar</CardTitle>
                  <div className="text-sm text-muted-foreground">Current skill levels across categories</div>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
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
                        data={callObjectivesData}
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
          
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Overall Progress</span>
                      <span className="font-medium">{userProgress.overall}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${userProgress.overall}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">English Proficiency</span>
                      <span className="font-medium">{userProgress.englishProficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${userProgress.englishProficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Soft Skills</span>
                      <span className="font-medium">{userProgress.softSkills}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${userProgress.softSkills}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Communication Competency</span>
                      <span className="font-medium">{userProgress.communicationCompetency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${userProgress.communicationCompetency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{userProgress.improvement}</div>
                      <div className="text-sm text-gray-500">Overall Improvement</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{userProgress.calls}</div>
                      <div className="text-sm text-gray-500">Total Calls</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">
                    Last assessment: {userProgress.lastCall}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Assessment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {assessmentHistory.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                      <div className="text-sm">{assessment.date}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{assessment.score}%</span>
                        <span className="text-xs text-green-600">{assessment.improvement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Link to="/call-preparation">
                <Button className="w-full">Prepare for Next Call</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
