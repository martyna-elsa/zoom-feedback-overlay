
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoConference from '@/components/VideoConference';
import FeedbackGuidance from '@/components/FeedbackGuidance';
import ChatPanel from '@/components/ChatPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ChartBar } from 'lucide-react';

const Index: React.FC = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-3 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold">Sales Call Trainer</h1>
        <Link to="/skills-progress">
          <Button variant="outline" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            View Skills Progress
          </Button>
        </Link>
      </div>
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
