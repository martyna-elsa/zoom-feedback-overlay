
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, EyeOff, Eye, Users, Home, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface VideoHeaderProps {
  headerVisible: boolean;
  chatVisible: boolean;
  facilitatorMode: boolean;
  facilitatorVisibleToAll: boolean;
  toggleHeader: () => void;
  toggleChat: () => void;
  handleFacilitatorHint: () => void;
  toggleFacilitatorVisibility: (checked: boolean) => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({
  headerVisible,
  chatVisible,
  facilitatorMode,
  facilitatorVisibleToAll,
  toggleHeader,
  toggleChat,
  handleFacilitatorHint,
  toggleFacilitatorVisibility
}) => {
  const { toast } = useToast();

  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30 w-auto">
      {headerVisible ? (
        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg flex items-center gap-2 border border-gray-200/30">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700 font-normal text-xs h-7 px-1.5 flex items-center gap-1"
              onClick={handleFacilitatorHint}
            >
              <Bell className="h-3.5 w-3.5" />
              Facilitator
            </Button>
            
            {/* Facilitator visibility option */}
            {facilitatorMode && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Checkbox 
                  id="facilitatorVisibility" 
                  checked={facilitatorVisibleToAll}
                  onCheckedChange={toggleFacilitatorVisibility}
                  className="h-3 w-3"
                />
                <label htmlFor="facilitatorVisibility" className="text-xs cursor-pointer">
                  Visible
                </label>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 font-normal text-xs h-7 px-1.5 flex items-center gap-1"
            >
              {chatVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {chatVisible ? "Hide Chat" : "Show Chat"}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleHeader}
              className="text-gray-500 hover:text-gray-700 h-6 w-6"
            >
              <Settings className="h-3.5 w-3.5" />
            </Button>
            
            <Link to="/web-platform">
              <Button 
                className="bg-blue-500 text-white hover:bg-blue-600 border-none px-2 py-1 rounded-full text-xs h-6"
              >
                <Home className="h-3.5 w-3.5 mr-1" />
                Elsa
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleHeader} 
            className="bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-gray-200/30 px-1 py-0.5 h-5"
          >
            <Settings className="h-3 w-3 text-gray-500" />
          </Button>
          
          <Link to="/web-platform">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-blue-500 text-white hover:bg-blue-600 border-none px-1 py-0.5 h-5 rounded-full shadow-sm backdrop-blur-md text-xs flex items-center gap-1"
            >
              <Home className="h-3 w-3" />
              Elsa
            </Button>
          </Link>
        </div>
      )}
      
      {/* Only visible to you indicator */}
      <div className="mt-0.5 text-center">
        <span className="text-[10px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-md">
          <Users className="h-2.5 w-2.5 inline mr-0.5" /> Only visible to you
        </span>
      </div>
    </div>
  );
};

export default VideoHeader;
