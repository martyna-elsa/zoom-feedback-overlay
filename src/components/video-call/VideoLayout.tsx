
import React from 'react';
import VideoConference from '@/components/VideoConference';
import ChatPanel from '@/components/ChatPanel';
import { Users } from 'lucide-react';

interface VideoLayoutProps {
  isScreenSharing: boolean;
  chatVisible: boolean;
}

const VideoLayout: React.FC<VideoLayoutProps> = ({ isScreenSharing, chatVisible }) => {
  // Don't render UI elements when screen sharing is active
  if (isScreenSharing) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-grow relative">
          <div className="absolute inset-0">
            <VideoConference />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-grow relative">
        {/* Video conference takes the full area */}
        <div className="absolute inset-0">
          <VideoConference />
        </div>
        
        {/* Chat panel overlay - conditionally rendered based on chatVisible state */}
        {chatVisible && (
          <div className="absolute top-4 right-4 bottom-20 w-96 z-10 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-black/40 text-white text-xs px-2 py-0.5 rounded-t-lg text-center backdrop-blur-sm">
              <Users className="h-3 w-3 inline mr-1" /> Only visible to you
            </div>
            <ChatPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLayout;
