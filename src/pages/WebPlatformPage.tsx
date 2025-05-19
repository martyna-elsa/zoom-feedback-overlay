
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChartBar, FileText, History, Home, Video, Users, Plus, Search, Settings, Sliders, Bot, BarChart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WebPlatformPage: React.FC = () => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();
  
  const handleLinkAccount = () => {
    // In a real implementation, this would connect to an API
    toast({
      title: "Account Linked",
      description: "Your video conferencing account has been linked successfully!",
    });
    setShowLinkDialog(false);
  };

  // Sample data for calls - keeping these in case they're needed elsewhere
  const upcomingCalls = [
    { id: "C-5430", name: "Weekly Team Check-in", date: "2025-05-21", time: "10:00 AM", participants: 5, status: "Scheduled" },
    { id: "C-5429", name: "Client Presentation", date: "2025-05-22", time: "2:30 PM", participants: 8, status: "Scheduled" },
    { id: "C-5428", name: "Sales Training", date: "2025-05-23", time: "1:00 PM", participants: 12, status: "Scheduled" }
  ];

  const pastCalls = [
    { id: "C-5427", name: "Project Review", date: "2025-05-19", time: "11:00 AM", participants: 6, status: "Completed" },
    { id: "C-5426", name: "Leadership Meeting", date: "2025-05-18", time: "3:00 PM", participants: 4, status: "Completed" },
    { id: "C-5425", name: "Product Demo", date: "2025-05-17", time: "10:30 AM", participants: 9, status: "Completed" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">ELSA Web Platform</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-blue-800 text-white px-4 py-1.5 text-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-medium">ELSA Web Platform</span>
          <span>Your Personal Dashboard</span>
        </div>
      </div>
      
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="user">User Dashboard</TabsTrigger>
                <TabsTrigger value="admin">Admin Panel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Call History</h3>
                        <History className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Review past calls, analyze feedback, and track improvement over time.
                      </p>
                    </div>
                    <div className="p-4">
                      <Link to="/call-history">
                        <Button variant="outline" className="w-full">View Call History</Button>
                      </Link>
                    </div>
                  </Card>
                  
                  <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Call Preparation</h3>
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Create briefs, set goals, and prepare talking points for upcoming calls.
                      </p>
                    </div>
                    <div className="p-4">
                      <Link to="/call-preparation">
                        <Button variant="outline" className="w-full">Prepare for Call</Button>
                      </Link>
                    </div>
                  </Card>
                  
                  <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Skills Progress</h3>
                        <ChartBar className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Track improvement in pronunciation, grammar, confidence, and more.
                      </p>
                    </div>
                    <div className="p-4">
                      <Link to="/skills-progress">
                        <Button variant="outline" className="w-full">View Skills Progress</Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="admin">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Insights Section */}
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-blue-600" />
                            Insights
                          </CardTitle>
                          <Button variant="outline" size="sm">
                            <Link to="/admin-dashboard">View Full Dashboard</Link>
                          </Button>
                        </div>
                        <CardDescription>
                          Performance analytics and learning trends
                        </CardDescription>
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
                    
                    {/* AI Assistant Configuration */}
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
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Link your video conferencing account</DialogTitle>
            <DialogDescription>
              Connect your preferred video conferencing platform for a seamless experience with ELSA.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-5">
              <Button 
                variant="outline" 
                className="flex items-center justify-start gap-3 h-14"
                onClick={handleLinkAccount}
              >
                <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbeb28e85a635cba7901.png" 
                     className="h-6" 
                     alt="Google Meet" />
                <span>Connect with Google Meet</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-start gap-3 h-14"
                onClick={handleLinkAccount}
              >
                <img src="https://st1.zoom.us/static/6.3.10815/image/new/home/logo.png" 
                     className="h-6" 
                     alt="Zoom" />
                <span>Connect with Zoom</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-start gap-3 h-14"
                onClick={handleLinkAccount}
              >
                <img src="https://static.teams.cdn.office.net/evergreen-assets/icons/teams-logo-filled-16x16-navy.svg" 
                     className="h-6" 
                     alt="Microsoft Teams" />
                <span>Connect with Microsoft Teams</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setShowLinkDialog(false)}>Cancel</Button>
            <div className="text-sm text-gray-500">Your data is secure and private</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="bg-white py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          &copy; 2025 ELSA Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default WebPlatformPage;
