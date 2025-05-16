
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface FeedbackWidgetProps {
  onClose: () => void;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    onClose();
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-b-lg animate-slide-down">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Meeting Feedback</h2>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">How would you rate this meeting?</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  rating === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-600 mb-2">
            Additional comments (optional)
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Share your thoughts about this meeting..."
          ></textarea>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit"
            disabled={!rating}
          >
            Submit Feedback
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackWidget;
