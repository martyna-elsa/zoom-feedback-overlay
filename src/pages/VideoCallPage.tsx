
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { Button } from '@/components/ui/button';
import { Bell, Square, ChevronUp, ChevronDown, MessageSquare, Settings, Eye, EyeOff, Users, Home } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const VideoCallPage: React.FC = () => {
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [chatVisible, setChatVisible] = useState(true);
  const [showFacilitatorHint, setShowFacilitatorHint] = useState(false);
  const [facilitatorVisibleToAll, setFacilitatorVisibleToAll] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const { toast } = useToast();
  
  // Effect to listen to screen sharing state from VideoConference component
  useEffect(() => {
    const handleScreenShareChange = (event: CustomEvent) => {
      setIsScreenSharing(event.detail.isScreenSharing);
      
      // Hide UI elements when screen sharing starts
      if (event.detail.isScreenSharing) {
        setChatVisible(false);
        setHeaderVisible(false);
      }
    };
    
    window.addEventListener('screenShareChange' as any, handleScreenShareChange);
    
    return () => {
      window.removeEventListener('screenShareChange' as any, handleScreenShareChange);
    };
  }, []);
  
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
    const newHeaderState = !headerVisible;
    setHeaderVisible(newHeaderState);
    
    // Also hide chat panel when hiding header
    if (!newHeaderState) {
      setChatVisible(false);
    }
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
  
  const toggleFacilitatorVisibility = (checked: boolean) => {
    setFacilitatorVisibleToAll(checked);
    
    toast({
      title: checked ? "Facilitator Mode Now Visible to Everyone" : "Facilitator Mode Only Visible to You",
      description: checked 
        ? "All participants can now see when you're in facilitator mode and any alerts." 
        : "Facilitator mode is now only visible to you.",
    });
  };

  // Don't render UI elements when screen sharing is active
  if (isScreenSharing) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-grow relative">
          <div className="absolute inset-0">
            <VideoConference />
          </div>
        </div>
      </div>
    );
  }

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
              
              {/* New facilitator visibility option */}
              {facilitatorMode && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Checkbox 
                    id="facilitatorVisibility" 
                    checked={facilitatorVisibleToAll}
                    onCheckedChange={toggleFacilitatorVisibility}
                    className="h-3.5 w-3.5"
                  />
                  <label htmlFor="facilitatorVisibility" className="text-xs cursor-pointer">
                    Visible to all
                  </label>
                </div>
              )}
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
              
              <Link to="/">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-blue-500 text-white hover:bg-blue-600 border-none h-7 text-xs px-3"
                >
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Go to Elsa
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleHeader} 
              className="bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200/30 px-3 py-1.5"
            >
              <Settings className="h-3.5 w-3.5 text-gray-500" />
            </Button>
            
            <Link to="/">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-600 border-none px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md text-xs flex items-center gap-1"
              >
                <Home className="h-3.5 w-3.5" />
                Go to Elsa
              </Button>
            </Link>
          </div>
        )}
        
        {/* Only visible to you indicator */}
        <div className="mt-2 text-center">
          <span className="text-xs text-white/80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md">
            <Users className="h-3 w-3 inline mr-1" /> Only visible to you
          </span>
        </div>
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
          <Alert 
            variant="default" 
            className={`${facilitatorVisibleToAll ? 'bg-blue-500/90 text-white' : 'bg-white/90 text-gray-700'} backdrop-blur-sm border-blue-600/40 shadow-md`}
          >
            <Bell className={`h-4 w-4 ${facilitatorVisibleToAll ? 'text-white' : 'text-blue-500'}`} />
            <AlertTitle>
              Unanswered Question {facilitatorVisibleToAll && <span className="text-xs font-normal ml-2">(Visible to everyone)</span>}
            </AlertTitle>
            <AlertDescription className={facilitatorVisibleToAll ? '' : 'text-gray-600'}>
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
            <div className="bg-black/40 text-white text-xs px-2 py-0.5 rounded-t-lg text-center backdrop-blur-sm">
              <Users className="h-3 w-3 inline mr-1" /> Only visible to you
            </div>
            <ChatPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallPage;
