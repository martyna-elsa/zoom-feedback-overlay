
import React from 'react';
import { MicOff, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoParticipantProps {
  name: string;
  isCurrentUser?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isLarge?: boolean;
  isSmall?: boolean;
}

const VideoParticipant: React.FC<VideoParticipantProps> = ({
  name,
  isCurrentUser = false,
  isMuted = false,
  isVideoOff = false,
  isLarge = false,
  isSmall = false
}) => {
  // Generate a random hue for the background
  const hue = React.useMemo(() => Math.floor(Math.random() * 360), []);
  
  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden shadow-md bg-gray-800",
      !isSmall && "aspect-video",
      isCurrentUser && "border-2 border-blue-500",
      isLarge && "col-span-full row-span-full",
      isSmall && "h-28"
    )}>
      {isVideoOff ? (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `hsla(${hue}, 70%, 30%, 1)` }}
        >
          <div className={cn(
            "rounded-full bg-gray-700 flex items-center justify-center",
            isSmall ? "h-12 w-12" : "h-24 w-24"
          )}>
            <span className={cn(
              "font-semibold text-white",
              isSmall ? "text-xl" : "text-3xl"
            )}>
              {name.split(' ').map(part => part[0]).join('')}
            </span>
          </div>
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundColor: `hsla(${hue}, 70%, 30%, 0.3)`,
            backgroundImage: 'url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=512&h=512)'
          }}
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-3 py-1.5 flex justify-between items-center">
        <span className="text-white text-sm font-medium truncate">{name}</span>
        <div className="flex items-center gap-1">
          {isMuted && (
            <div className="rounded-full bg-gray-700 p-1">
              <MicOff className="h-3 w-3 text-white" />
            </div>
          )}
          {isVideoOff && (
            <div className="rounded-full bg-gray-700 p-1">
              <VideoOff className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoParticipant;
