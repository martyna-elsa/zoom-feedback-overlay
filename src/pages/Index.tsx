
import React, { useState } from 'react';
import VideoConference from '@/components/VideoConference';
import FeedbackGuidance from '@/components/FeedbackGuidance';

const Index: React.FC = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <FeedbackGuidance isVisible={showFeedback} />
      <VideoConference onFeedbackClick={toggleFeedback} />
    </div>
  );
};

export default Index;
