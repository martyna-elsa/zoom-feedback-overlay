
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar, Download, Home, Star, Users, TrendingUp, Award, Medal } from 'lucide-react';
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
  ResponsiveContainer 
} from 'recharts';

// Sample data for learner skills progress
const skillsData = [
  { month: 'Jan', pronunciation: 65, grammar: 70, confidence: 60, comprehension: 72 },
  { month: 'Feb', pronunciation: 68, grammar: 72, confidence: 63, comprehension: 75 },
  { month: 'Mar', pronunciation: 72, grammar: 73, confidence: 68, comprehension: 78 },
  { month: 'Apr', pronunciation: 75, grammar: 76, confidence: 72, comprehension: 80 },
  { month: 'May', pronunciation: 78, grammar: 78, confidence: 75, comprehension: 82 },
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
  { id: 3, name: 'Sarah Johnson', progress: 89, improvement: '+10%', calls: 22 },
  { id: 4, name: 'James Wilson', progress: 87, improvement: '+8%', calls: 20 },
  { id: 5, name: 'David Thompson', progress: 85, improvement: '+9%', calls: 16 },
];

const chartConfig = {
  pronunciation: { label: 'Pronunciation', color: '#4f46e5' },
  grammar: { label: 'Grammar', color: '#0ea5e9' },
  confidence: { label: 'Confidence', color: '#10b981' },
  comprehension: { label: 'Comprehension', color: '#f59e0b' },
  target: { label: 'Target', color: '#6366f1' },
  achieved: { label: 'Achieved', color: '#10b981' },
};

const Landing: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('3months');
  const [showAdminSection, setShowAdminSection] = useState<boolean>(false);
  
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
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome to ELSA</h2>
                <p className="text-lg text-gray-600">English Language Speech Assistant for professional development</p>
              </div>
              
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
                    <div className="text-2xl font-bold">78%</div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Skills Development Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ChartContainer config={chartConfig}>
                      <LineChart data={skillsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[50, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line type="monotone" dataKey="pronunciation" stroke={chartConfig.pronunciation.color} strokeWidth={2} />
                        <Line type="monotone" dataKey="grammar" stroke={chartConfig.grammar.color} strokeWidth={2} />
                        <Line type="monotone" dataKey="confidence" stroke={chartConfig.confidence.color} strokeWidth={2} />
                        <Line type="monotone" dataKey="comprehension" stroke={chartConfig.comprehension.color} strokeWidth={2} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Goals vs. Achievement</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ChartContainer config={chartConfig}>
                      <BarChart data={goalsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="target" fill={chartConfig.target.color} />
                        <Bar dataKey="achieved" fill={chartConfig.achieved.color} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
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
                          <tr key={learner.id} className="border-b hover:bg-gray-50">
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
