
import React from 'react';
import { Monitor, Mic, Video, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoParticipant from '@/components/VideoParticipant';

const VideoConference: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">Meeting: Team Sync</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Live</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">01:23:45</span>
        </div>
      </div>
      
      {/* Main video grid - adjusted grid gap and padding */}
      <div className="flex-grow p-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-100 overflow-y-auto">
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
