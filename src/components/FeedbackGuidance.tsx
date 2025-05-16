
import React from 'react';
import { Info } from 'lucide-react';

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
            <Info className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-800">How to provide effective feedback</h3>
            <ul className="mt-2 text-blue-700 space-y-1">
              <li>• Rate the meeting from 1-5 stars (required)</li>
              <li>• Share what worked well in the meeting</li>
              <li>• Suggest any improvements for future meetings</li>
              <li>• Mention any technical issues you experienced</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackGuidance;
