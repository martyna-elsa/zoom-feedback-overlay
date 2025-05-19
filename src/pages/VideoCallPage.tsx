
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { Button } from '@/components/ui/button';
import { Bell, Square, ChevronUp, ChevronDown, MessageSquare, Settings, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';

const VideoCallPage: React.FC = () => {
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [chatVisible, setChatVisible] = useState(true);
  const [showFacilitatorHint, setShowFacilitatorHint] = useState(false);
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

  const toggleHeader = () => {
    setHeaderVisible(!headerVisible);
  };
  
  const toggleChat = () => {
    setChatVisible(!chatVisible);
    toast({
      title: chatVisible ? "Chat Panel Hidden" : "Chat Panel Visible",
      description: chatVisible ? "The chat panel has been hidden." : "The chat panel is now visible.",
    });
  };
  
  const handleFacilitatorHint = () => {
    setShowFacilitatorHint(!showFacilitatorHint);
    if (!showFacilitatorHint) {
      toast({
        title: "Facilitator Hint Shown",
        description: "All participants can now see the facilitator hint.",
      });
    } else {
      toast({
        title: "Facilitator Hint Hidden",
        description: "The facilitator hint is now hidden.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Floating overlay header - positioned absolute with margins */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-auto max-w-lg">
        {headerVisible ? (
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-6 border border-gray-200/30">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-gray-700 font-light text-sm px-3 flex items-center gap-1.5"
                onClick={handleFacilitatorHint}
              >
                <Bell className="h-3.5 w-3.5 mr-1" />
                Facilitator Mode
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 font-light text-sm px-3 flex items-center gap-1.5"
              >
                {chatVisible ? "Hide Conversation" : "Show Conversation"}
                {chatVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleHeader}
                className="text-gray-500 hover:text-gray-700 h-7 w-7"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleHeader} 
            className="bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200/30 px-3 py-1.5"
          >
            <Settings className="h-3.5 w-3.5 text-gray-500" />
          </Button>
        )}
      </div>
      
      {showNotification && headerVisible && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 w-auto max-w-lg px-4 py-2">
          <Alert variant="default" className="bg-white/90 backdrop-blur-sm border-blue-200/40 text-gray-700 shadow-sm">
            <Bell className="h-4 w-4 text-blue-500" />
            <AlertTitle>Unanswered Question</AlertTitle>
            <AlertDescription className="text-gray-600">
              There is one question which remained unanswered from Michael: "Who else is involved in the decision-making process?"
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {showFacilitatorHint && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 w-auto max-w-lg px-4 py-2">
          <Alert variant="default" className="bg-blue-500/90 backdrop-blur-sm border-blue-600/40 text-white shadow-md">
            <Bell className="h-4 w-4 text-white" />
            <AlertTitle>Unanswered Question</AlertTitle>
            <AlertDescription>
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
        
        {/* Chat panel overlay - conditionally rendered based on chatVisible state */}
        {chatVisible && (
          <div className="absolute top-4 right-4 bottom-20 w-96 z-10 rounded-lg overflow-hidden shadow-xl">
            <ChatPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallPage;
