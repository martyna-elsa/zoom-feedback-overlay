
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bot, 
  ChevronLeft, 
  Search, 
  Settings, 
  Sliders, 
  SlidersHorizontal, 
  Users, 
  Award, 
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("insights");
  const [timeRange, setTimeRange] = useState('3months');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">ELSA Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/web-platform">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Platform
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-indigo-800 text-white px-4 py-1.5 text-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-medium">ELSA Admin Dashboard</span>
          <span>Organization Management</span>
        </div>
      </div>
      
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Tabs defaultValue="insights" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="ai-config">AI Assistant Configuration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
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
                  
                  <Card className="shadow-sm">
                    <CardHeader className="flex flex-row justify-between">
                      <div>
                        <CardTitle>Organization Overview</CardTitle>
                        <CardDescription>Performance analytics and learning trends</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <h3 className="font-medium text-blue-800 mb-1">Organization Overview</h3>
                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <div className="text-sm text-gray-500">Total Learners</div>
                              <div className="text-2xl font-bold text-gray-800">128</div>
                              <div className="text-xs text-green-600">↑ 12 this month</div>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <div className="text-sm text-gray-500">Avg. Performance</div>
                              <div className="text-2xl font-bold text-gray-800">78%</div>
                              <div className="text-xs text-green-600">↑ 5% this month</div>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <div className="text-sm text-gray-500">Goals Achieved</div>
                              <div className="text-2xl font-bold text-gray-800">82%</div>
                              <div className="text-xs text-green-600">↑ 3% this month</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                          <h3 className="font-medium text-indigo-800 mb-1">Top Performing Skills</h3>
                          <ul className="mt-2 space-y-2">
                            <li className="flex justify-between items-center">
                              <span className="text-gray-700">Negotiation</span>
                              <span className="text-indigo-700 font-medium">94%</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-gray-700">Persuasion</span>
                              <span className="text-indigo-700 font-medium">91%</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-gray-700">Objection Handling</span>
                              <span className="text-indigo-700 font-medium">88%</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                          <h3 className="font-medium text-emerald-800 mb-1">Areas for Improvement</h3>
                          <ul className="mt-2 space-y-2">
                            <li className="flex justify-between items-center">
                              <span className="text-gray-700">Technical Vocabulary</span>
                              <span className="text-emerald-700 font-medium">72%</span>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-gray-700">Intonation</span>
                              <span className="text-emerald-700 font-medium">76%</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="ai-config">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Bot className="h-5 w-5 text-purple-600" />
                      AI Assistant Configuration
                    </CardTitle>
                    <CardDescription>
                      Customize how ELSA assists your team during calls
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Assistant Behavior</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="intervention-level">Intervention Level</Label>
                            <div className="text-sm text-gray-500">
                              How often the assistant should intervene during calls
                            </div>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-[150px]" id="intervention-level">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-3 pt-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="real-time" className="flex flex-col">
                              <span>Real-time Feedback</span>
                              <span className="font-normal text-sm text-gray-500">
                                Provide feedback during the call
                              </span>
                            </Label>
                            <Switch id="real-time" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="suggestions" className="flex flex-col">
                              <span>Response Suggestions</span>
                              <span className="font-normal text-sm text-gray-500">
                                Offer alternative responses when appropriate
                              </span>
                            </Label>
                            <Switch id="suggestions" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="transcription" className="flex flex-col">
                              <span>Auto-Transcription</span>
                              <span className="font-normal text-sm text-gray-500">
                                Create searchable transcripts of all calls
                              </span>
                            </Label>
                            <Switch id="transcription" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Focus Areas</h3>
                        <div className="grid gap-3 pt-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="pronunciation" className="flex flex-col">
                              <span>Pronunciation & Grammar</span>
                              <span className="font-normal text-sm text-gray-500">
                                Help improve language accuracy
                              </span>
                            </Label>
                            <Switch id="pronunciation" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sales-techniques" className="flex flex-col">
                              <span>Sales Techniques</span>
                              <span className="font-normal text-sm text-gray-500">
                                Guidance on persuasion and objection handling
                              </span>
                            </Label>
                            <Switch id="sales-techniques" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="cultural" className="flex flex-col">
                              <span>Cultural Awareness</span>
                              <span className="font-normal text-sm text-gray-500">
                                Address cultural nuances in communication
                              </span>
                            </Label>
                            <Switch id="cultural" />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full">Save Configuration</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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

export default AdminDashboard;
