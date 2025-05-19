
import React from 'react';
import { Monitor, Mic, MicOff, Video, VideoOff, PhoneCall, Share2, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoParticipant from '@/components/VideoParticipant';

const VideoConference: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black">
      {/* Top navigation bar */}
      <div className="bg-zinc-900 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Sales Call</span>
          <span className="bg-green-700 text-green-100 text-xs font-medium px-2 py-0.5 rounded">Recording</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white text-sm flex items-center">
            <Users className="h-4 w-4 mr-1 text-white opacity-70" /> 4 participants
          </span>
          <span className="text-white text-sm">01:23:45</span>
        </div>
      </div>
      
      {/* Main video grid - adjusted grid gap and padding */}
      <div className="flex-grow p-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-zinc-900 overflow-y-auto">
        <VideoParticipant name="You (Host)" isCurrentUser={true} />
        <VideoParticipant name="Sarah Johnson" />
        <VideoParticipant name="Michael Chen" />
        <VideoParticipant name="Alex Rodriguez" />
      </div>
      
      {/* Bottom control bar */}
      <div className="bg-zinc-900 py-3 px-4 flex justify-center items-center">
        <div className="flex items-center gap-4 max-w-3xl w-full justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="destructive" className="px-5 rounded-full bg-red-600 hover:bg-red-700">
              <PhoneCall className="h-5 w-5 mr-1" /> End Call
            </Button>
          </div>
        </div>
      </div>
      
      {/* Security badge */}
      <div className="bg-zinc-900 border-t border-zinc-800 py-1 text-center">
        <span className="text-gray-400 text-xs">End-to-end encrypted | Powered by ELSA</span>
      </div>
    </div>
  );
};

export default VideoConference;
