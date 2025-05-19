
import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Share2, Users, MessageSquare, Shield, MoreHorizontal, Grid, Maximize, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import VideoParticipant from '@/components/VideoParticipant';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const VideoConference: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isGalleryView, setIsGalleryView] = useState(true);

  return (
    <div className="flex flex-col h-full bg-black relative">
      {/* Top bar - similar to Zoom */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white/70">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-xs">Recording</span>
          </div>
        </div>
        <div className="text-center text-white/70">
          <span className="text-sm font-medium">ELSA Sales Call Training</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white/70 hover:bg-white/10 h-6 px-2">
            <Grid className="h-4 w-4 mr-1" />
            <span className="text-xs">View</span>
          </Button>
        </div>
      </div>
      
      {/* Video grid - similar to Zoom layout */}
      <div className={`flex-grow p-4 ${isGalleryView ? 'grid grid-cols-2 md:grid-cols-4 gap-2' : 'flex justify-center items-center'}`}>
        {isGalleryView ? (
          <>
            <VideoParticipant name="You (Host)" isCurrentUser={true} isMuted={isMuted} isVideoOff={isVideoOff} />
            <VideoParticipant name="Sarah Johnson" />
            <VideoParticipant name="Michael Chen" />
            <VideoParticipant name="Alex Rodriguez" />
            <VideoParticipant name="James Wilson" />
            <VideoParticipant name="Emma Davis" />
            <VideoParticipant name="David Thompson" />
            <VideoParticipant name="Sophia Wang" />
            <VideoParticipant name="Robert Taylor" />
            <VideoParticipant name="Linda Martinez" />
            <VideoParticipant name="Daniel Brown" />
            <VideoParticipant name="Olivia Garcia" />
          </>
        ) : (
          <>
            <div className="relative w-full max-w-4xl h-full">
              <VideoParticipant name="Sarah Johnson" isLarge={true} />
              <div className="absolute top-4 right-4 w-48">
                <VideoParticipant name="You (Host)" isCurrentUser={true} isMuted={isMuted} isVideoOff={isVideoOff} isSmall={true} />
              </div>
            </div>
          </>
        )}
        
        {isScreenSharing && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="h-full w-full max-w-6xl mx-auto bg-white p-4 flex items-center justify-center">
              <span className="text-gray-800 text-xl">Screen Sharing: Presentation.pdf</span>
            </div>
            <div className="absolute bottom-20 right-4 w-48 z-20">
              <VideoParticipant name="You (Host)" isCurrentUser={true} isMuted={isMuted} isVideoOff={isVideoOff} isSmall={true} />
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom control bar - styled more like Zoom */}
      <div className="bg-black py-3 px-4 border-t border-zinc-800 flex justify-center items-center">
        <div className="flex items-center justify-between w-full max-w-3xl">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-md ${isMuted ? 'bg-red-600/20 hover:bg-red-600/30 text-white' : 'bg-zinc-800/50 hover:bg-zinc-700/50 text-white'}`}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <span className="text-white text-xs mt-1">{isMuted ? 'Unmute' : 'Mute'}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? 'Unmute' : 'Mute'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-md ${isVideoOff ? 'bg-red-600/20 hover:bg-red-600/30 text-white' : 'bg-zinc-800/50 hover:bg-zinc-700/50 text-white'}`}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                    </Button>
                    <span className="text-white text-xs mt-1">Video</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{isVideoOff ? 'Start Video' : 'Stop Video'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-md ${isScreenSharing ? 'bg-green-600/40 hover:bg-green-600/50 text-white' : 'bg-zinc-800/50 hover:bg-zinc-700/50 text-white'}`}
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <span className="text-white text-xs mt-1">Share</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Share Screen</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 text-white"
                    >
                      <Users className="h-5 w-5" />
                    </Button>
                    <span className="text-white text-xs mt-1">Participants</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Participants (12)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 text-white"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                    <span className="text-white text-xs mt-1">Chat</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Open Chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div>
            <Button variant="destructive" className="rounded-md bg-red-600 hover:bg-red-700 transition-colors">
              Leave
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
