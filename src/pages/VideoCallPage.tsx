
import React from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { Button } from '@/components/ui/button';
import { Bell, Home, Square } from 'lucide-react';
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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Floating overlay header - positioned absolute with margins */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-4xl">
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg flex justify-between items-center border border-gray-200/30 relative">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-300/20 shadow-sm">
              <Square className="h-5 w-5 text-blue-500" />
              <h1 className="text-lg font-medium text-gray-700">ELSA Meeting Assistant</h1>
            </div>
            <div className="flex items-center gap-2">
              <Toggle 
                pressed={facilitatorMode} 
                onPressedChange={toggleFacilitatorMode}
                aria-label="Toggle facilitator mode"
                className="data-[state=on]:bg-blue-500 text-gray-700"
              >
                <Bell className="h-4 w-4 mr-1 text-gray-600" />
                <span className="text-gray-700">Facilitator Mode</span>
              </Toggle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2 bg-white/50 border-gray-300/40 text-gray-700 hover:bg-gray-100/60">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {showNotification && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-4xl px-4 py-2">
          <Alert variant="default" className="bg-white/80 backdrop-blur-sm border-blue-200/40 text-gray-700 shadow-sm">
            <Bell className="h-4 w-4 text-blue-500" />
            <AlertTitle>Unanswered Question</AlertTitle>
            <AlertDescription className="text-gray-600">
              There is one question which remained unanswered from Michael: "Who else is involved in the decision-making process?"
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <div className="flex-grow relative">
        {/* Video conference takes the full area */}
        <div className="absolute inset-0">
          <VideoConference />
        </div>
        
        {/* Chat panel overlay */}
        <div className="absolute top-4 right-4 bottom-20 w-96 z-10 rounded-lg overflow-hidden shadow-xl">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
