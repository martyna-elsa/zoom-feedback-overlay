
import React from 'react';
import { MicOff, VideoOff, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
  
  // Generate a pastel color palette for avatar backgrounds
  const backgroundColor = `hsla(${hue}, 70%, ${isVideoOff ? '30%' : '85%'}, 1)`;
  const textColor = isVideoOff ? 'white' : 'hsla(${hue}, 70%, 20%, 1)';
  
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
          style={{ backgroundColor }}
        >
          <div className={cn(
            "flex items-center justify-center",
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
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor }}
        >
          <Avatar className={isSmall ? "h-16 w-16" : "h-32 w-32"}>
            <AvatarFallback style={{ backgroundColor: `hsla(${hue}, 70%, 65%, 1)` }}>
              <span className={cn(
                "font-semibold",
                isSmall ? "text-xl" : "text-4xl"
              )}>
                {name.split(' ').map(part => part[0]).join('')}
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
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
