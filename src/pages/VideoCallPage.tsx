
import React from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Bell, Home } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';

const VideoCallPage: React.FC = () => {
  const [facilitatorMode, setFacilitatorMode] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const { toast } = useToast();
  
  const toggleFacilitatorMode = () => {
    const newMode = !facilitatorMode;
    setFacilitatorMode(newMode);
    
    if (newMode) {
      toast({
        title: "Meeting Facilitator Mode Enabled",
        description: "You will now receive notifications about unanswered questions.",
      });
      
      // Simulate an unanswered question notification after a short delay
      setTimeout(() => {
        setShowNotification(true);
      }, 3000);
    } else {
      setShowNotification(false);
      toast({
        title: "Meeting Facilitator Mode Disabled",
        description: "You will no longer receive notifications about unanswered questions.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">ELSA Video Call</h1>
          <div className="flex items-center gap-2">
            <Toggle 
              pressed={facilitatorMode} 
              onPressedChange={toggleFacilitatorMode}
              aria-label="Toggle facilitator mode"
              className="data-[state=on]:bg-blue-500"
            >
              <Bell className="h-4 w-4 mr-1" />
              Facilitator Mode
            </Toggle>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1 rounded text-sm text-blue-800 mr-2">
            Active Video Call: Sales Call Trainer
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Removed the blue banner that was here */}
      
      {showNotification && (
        <div className="px-4 py-2">
          <Alert variant="default" className="bg-blue-50 border-blue-200">
            <Bell className="h-4 w-4 text-blue-500" />
            <AlertTitle>Unanswered Question</AlertTitle>
            <AlertDescription className="text-blue-700">
              There is one question which remained unanswered from Michael: "Who else is involved in the decision-making process?"
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Video conference area with real-time widgets */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 border-b border-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-blue-800 mb-1 flex items-center justify-between">
            <div>
              <span className="font-medium">Active Video Call Tools:</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${facilitatorMode ? 'bg-green-500' : 'bg-gray-300'} mr-1`}></div>
                <span>Facilitator Mode: {facilitatorMode ? 'Active' : 'Inactive'}</span>
              </div>
              <div>Real-time Conversation Analysis</div>
              <div>Call Summary</div>
            </div>
          </div>
        </div>
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={70} minSize={40}>
          <VideoConference />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <ChatPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default VideoCallPage;
