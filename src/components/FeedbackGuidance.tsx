
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FeedbackGuidanceProps {
  isVisible: boolean;
}

const FeedbackGuidance: React.FC<FeedbackGuidanceProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="w-full bg-blue-50 shadow-md rounded-b-lg animate-slide-down border-t-4 border-blue-500">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <MessageSquare className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-800">Your Reply:</h3>
            <p className="mt-2 text-blue-700">Our pricing is designed to scale with your needs—can I ask a few questions to recommend the best option for you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackGuidance;
