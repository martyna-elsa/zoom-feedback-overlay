
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChartBar, FileText, History, Home, Settings, Upload, Link as LinkIcon, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const WebPlatformPage: React.FC = () => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("insights");
  const { toast } = useToast();
  
  const handleLinkAccount = () => {
    // In a real implementation, this would connect to an API
    toast({
      title: "Account Linked",
      description: "Your video conferencing account has been linked successfully!",
    });
    setShowLinkDialog(false);
  };
  
  const handleUpload = (type: string) => {
    toast({
      title: "Upload initiated",
      description: `You'll soon be able to upload documents for ${type}.`
    });
  };

  const handleUrlSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const url = new FormData(form).get('url') as string;
    
    if (url) {
      toast({
        title: "URL received",
        description: "We'll analyze this company URL.",
      });
      form.reset();
    }
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

  // Simulate organization data status - in a real app, this would come from an API
  const orgDataStatus = {
    yourCompany: {
      provided: true,
      lastUpdated: "2023-10-15",
      updatedBy: "Admin (Sarah Chen)"
    }
  };

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
          <div>
            <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
            
            <Tabs 
              defaultValue="insights" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="ai-config">AI Assistant Configuration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
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
              
              <TabsContent value="ai-config">
                <Card className="shadow-sm border-gray-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold">Update Your Company Information</CardTitle>
                        <CardDescription className="text-base mt-1">
                          Add details about your company to improve contextual feedback
                        </CardDescription>
                      </div>
                      {orgDataStatus.yourCompany.provided && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 py-1 px-3">
                          <svg className="w-4 h-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                          Provided by Admin
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {orgDataStatus.yourCompany.provided && (
                      <Alert className="bg-blue-50 text-blue-800 border-blue-200 mb-4">
                        <Info className="h-4 w-4 mr-2" />
                        <AlertDescription>
                          Information already provided by Admin (Sarah Chen) on 2023-10-15. You can update if needed.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer" 
                        onClick={() => handleUpload('your company')}>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Upload Document</h3>
                          <p className="text-gray-500 mt-1">Upload company brochures, presentations or other documents</p>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handleUrlSubmit}>
                      <div className="border rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <LinkIcon className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">Paste Company URL</h3>
                            <p className="text-gray-500 mt-1">Add your company website or LinkedIn page</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Input 
                            name="url"
                            placeholder="https://yourcompany.com" 
                            type="url" 
                            className="flex-1"
                            required
                          />
                          <Button type="submit" className="bg-gray-900 hover:bg-black">Analyze</Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
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
