
import React, { useState } from 'react';
import { Monitor, Mic, MicOff, Video, VideoOff, PhoneCall, Share2, Users, MessageSquare, Shield, MoreHorizontal, Grid, Maximize, Volume, VolumeX, Camera } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-zinc-900">
      {/* Top navigation bar */}
      <div className="bg-zinc-900 py-2 px-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Sales Call</span>
          <span className="bg-green-700 text-green-100 text-xs font-medium px-2 py-0.5 rounded">Recording</span>
          <span className="bg-blue-600/70 text-blue-100 text-xs font-medium px-2 py-0.5 rounded ml-2">End-to-End Encrypted</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white text-sm flex items-center">
            <Users className="h-4 w-4 mr-1 text-white opacity-70" /> 4 participants
          </span>
          <span className="text-white text-sm">01:23:45</span>
        </div>
      </div>
      
      {/* View option toggle */}
      <div className="absolute top-14 right-4 z-10 bg-zinc-800/70 backdrop-blur-sm rounded-md p-1.5 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-1.5 h-auto ${isGalleryView ? 'bg-zinc-700 text-white' : 'text-gray-400'}`}
                onClick={() => setIsGalleryView(true)}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Gallery View</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-1.5 h-auto ${!isGalleryView ? 'bg-zinc-700 text-white' : 'text-gray-400'}`}
                onClick={() => setIsGalleryView(false)}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Speaker View</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Connection quality indicator */}
      <div className="absolute top-14 left-4 z-10 bg-zinc-800/70 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1">
        <div className="flex items-center gap-0.5">
          <div className="h-1.5 w-1 bg-green-500 rounded"></div>
          <div className="h-2 w-1 bg-green-500 rounded"></div>
          <div className="h-2.5 w-1 bg-green-500 rounded"></div>
        </div>
        <span className="text-xs text-white/80">Good</span>
      </div>
      
      {/* Main video grid */}
      <div className={`flex-grow p-3 grid ${isGalleryView ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-2 bg-zinc-900 overflow-y-auto`}>
        {isGalleryView ? (
          <>
            <VideoParticipant name="You (Host)" isCurrentUser={true} isMuted={isMuted} isVideoOff={isVideoOff} />
            <VideoParticipant name="Sarah Johnson" />
            <VideoParticipant name="Michael Chen" />
            <VideoParticipant name="Alex Rodriguez" />
          </>
        ) : (
          <>
            <VideoParticipant name="Sarah Johnson" isLarge={true} />
            <div className="absolute bottom-20 right-4 w-48 z-10">
              <VideoParticipant name="You (Host)" isCurrentUser={true} isMuted={isMuted} isVideoOff={isVideoOff} isSmall={true} />
            </div>
          </>
        )}
        
        {isScreenSharing && (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <div className="h-full w-full bg-white p-4 flex items-center justify-center">
              <span className="text-gray-800">Screen sharing: Presentation.pdf</span>
            </div>
            <div className="absolute bottom-20 right-4 w-48 z-10">
              <VideoParticipant name="You (Host)" isCurrentUser={true} isMuted={isMuted} isVideoOff={isVideoOff} isSmall={true} />
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom control bar */}
      <div className="bg-zinc-900 py-3 px-4 border-t border-zinc-800 flex justify-center items-center">
        <div className="flex items-center gap-2 max-w-3xl w-full justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700 border-none text-white' : 'bg-zinc-800 border-none hover:bg-zinc-700 text-white'}`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? 'Unmute' : 'Mute'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`rounded-full ${isVideoOff ? 'bg-red-600 hover:bg-red-700 border-none text-white' : 'bg-zinc-800 border-none hover:bg-zinc-700 text-white'}`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isVideoOff ? 'Start Video' : 'Stop Video'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`rounded-full ${isScreenSharing ? 'bg-green-600 hover:bg-green-700 border-none text-white' : 'bg-zinc-800 border-none hover:bg-zinc-700 text-white'}`}
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share Screen</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white"
                  >
                    <Users className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Participants</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white"
                      >
                        <Shield className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Security</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent>
                <DropdownMenuItem>Lock Meeting</DropdownMenuItem>
                <DropdownMenuItem>Enable Waiting Room</DropdownMenuItem>
                <DropdownMenuItem>Manage Participants</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full bg-zinc-800 border-none hover:bg-zinc-700 text-white"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>More Options</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent>
                <DropdownMenuItem>Start Recording</DropdownMenuItem>
                <DropdownMenuItem>Livestream</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
