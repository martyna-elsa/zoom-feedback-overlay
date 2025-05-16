
import React, { useState } from 'react';
import VideoConference from '@/components/VideoConference';
import FeedbackWidget from '@/components/FeedbackWidget';

const Index: React.FC = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {showFeedback && <FeedbackWidget onClose={() => setShowFeedback(false)} />}
      <VideoConference onFeedbackClick={toggleFeedback} />
    </div>
  );
};

export default Index;
