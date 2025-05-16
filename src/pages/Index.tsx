
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ChartBar, Bell, FileText, Users } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
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
          <h1 className="text-xl font-bold">Sales Call Trainer</h1>
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
          <Link to="/call-information">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Update Call Info
            </Button>
          </Link>
          <Link to="/participant-profiles">
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participant Profiles
            </Button>
          </Link>
          <Link to="/skills-progress">
            <Button variant="outline" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              View Skills Progress
            </Button>
          </Link>
        </div>
      </div>
      
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

export default Index;
