
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { Button } from '@/components/ui/button';
import { Bell, Home, Square, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';

const VideoCallPage: React.FC = () => {
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [chatVisible, setChatVisible] = useState(true);
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

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Floating overlay header - positioned absolute with margins */}
      <div className="absolute top-4 left-8 transform z-30 w-[75%] max-w-2xl">
        {headerVisible ? (
          <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl shadow-lg flex justify-between items-center border border-gray-200/30 relative">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-300/20 shadow-sm">
                <Square className="h-4 w-4 text-blue-500" />
                <h1 className="text-base font-normal text-gray-700">ELSA Meeting Assistant</h1>
              </div>
              <div className="flex items-center gap-2">
                <Toggle 
                  pressed={facilitatorMode} 
                  onPressedChange={toggleFacilitatorMode}
                  aria-label="Toggle facilitator mode"
                  className="data-[state=on]:bg-blue-500 text-gray-700 h-8"
                >
                  <Bell className="h-3.5 w-3.5 mr-1 text-gray-600" />
                  <span className="text-sm text-gray-700">Facilitator Mode</span>
                </Toggle>
                
                <Toggle
                  pressed={chatVisible}
                  onPressedChange={toggleChat}
                  aria-label="Toggle chat panel"
                  className="data-[state=on]:bg-blue-500 text-gray-700 h-8"
                >
                  <MessageSquare className="h-3.5 w-3.5 mr-1 text-gray-600" />
                  <span className="text-sm text-gray-700">Chat Panel</span>
                </Toggle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5 bg-white/50 border-gray-300/40 text-gray-700 hover:bg-gray-100/60 text-sm">
                  <Home className="h-3.5 w-3.5" />
                  Go to Elsa Web
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleHeader} 
                className="h-7 w-7 rounded-full bg-gray-100/70 hover:bg-gray-200/70"
              >
                <ChevronUp className="h-3.5 w-3.5 text-gray-600" />
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleHeader} 
            className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-md shadow-sm border border-gray-200/30 px-3 py-1.5"
          >
            <ChevronDown className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-sm text-gray-700">Show controls</span>
          </Button>
        )}
      </div>
      
      {showNotification && headerVisible && (
        <div className="absolute top-16 left-8 z-30 w-[75%] max-w-2xl px-4 py-2">
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
