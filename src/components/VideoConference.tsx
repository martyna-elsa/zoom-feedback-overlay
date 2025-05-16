
import React from 'react';
import { Monitor, MessageSquare, Mic, MicOff, Video, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoParticipant from '@/components/VideoParticipant';

interface VideoConferenceProps {
  onFeedbackClick: () => void;
}

const VideoConference: React.FC<VideoConferenceProps> = ({ onFeedbackClick }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">Meeting: Team Sync</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Live</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onFeedbackClick} 
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            <MessageSquare className="w-4 h-4 mr-1" /> Feedback
          </Button>
          <span className="text-gray-500 text-sm">01:23:45</span>
        </div>
      </div>
      
      {/* Main video grid */}
      <div className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100">
        <VideoParticipant name="You (Host)" isCurrentUser={true} />
        <VideoParticipant name="Sarah Johnson" />
        <VideoParticipant name="Michael Chen" />
        <VideoParticipant name="Alex Rodriguez" />
      </div>
      
      {/* Bottom control bar */}
      <div className="bg-white border-t border-gray-200 py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Video className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full">
            <Monitor className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="destructive" className="px-5">End Meeting</Button>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
