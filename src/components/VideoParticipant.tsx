
import React from 'react';
import { MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoParticipantProps {
  name: string;
  isCurrentUser?: boolean;
}

const VideoParticipant: React.FC<VideoParticipantProps> = ({
  name,
  isCurrentUser = false
}) => {
  // Generate a random hue for the background
  const hue = Math.floor(Math.random() * 360);
  
  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden shadow-md bg-gray-800 aspect-video",
      isCurrentUser && "border-2 border-blue-500"
    )}>
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: `hsla(${hue}, 70%, 30%, 1)` }}
      >
        <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-3xl font-semibold text-white">
            {name.split(' ').map(part => part[0]).join('')}
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2 flex justify-between items-center">
        <span className="text-white text-sm font-medium">{name}</span>
        <div className="rounded-full bg-gray-700 p-1">
          <MicOff className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default VideoParticipant;
