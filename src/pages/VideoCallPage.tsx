
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import VideoHeader from '@/components/video-call/VideoHeader';
import NotificationContainer from '@/components/video-call/NotificationContainer';
import VideoLayout from '@/components/video-call/VideoLayout';

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

  return (
    <>
      <VideoHeader 
        headerVisible={headerVisible}
        chatVisible={chatVisible}
        facilitatorMode={facilitatorMode}
        facilitatorVisibleToAll={facilitatorVisibleToAll}
        toggleHeader={toggleHeader}
        toggleChat={toggleChat}
        handleFacilitatorHint={handleFacilitatorHint}
        toggleFacilitatorVisibility={toggleFacilitatorVisibility}
      />
      
      <NotificationContainer 
        headerVisible={headerVisible}
        showNotification={showNotification}
        showFacilitatorHint={showFacilitatorHint}
        facilitatorVisibleToAll={facilitatorVisibleToAll}
      />
      
      <VideoLayout 
        isScreenSharing={isScreenSharing}
        chatVisible={chatVisible}
      />
    </>
  );
};

export default VideoCallPage;
