
import React, { useState } from 'react';
import VideoConference from '@/components/VideoConference';
import FeedbackGuidance from '@/components/FeedbackGuidance';
import ChatPanel from '@/components/ChatPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index: React.FC = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <FeedbackGuidance isVisible={showFeedback} />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={70} minSize={40}>
          <VideoConference onFeedbackClick={toggleFeedback} />
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
