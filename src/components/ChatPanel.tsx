
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send, AlertTriangle, MessageCircle, Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Sample conversation data
const sampleConversation = [
  { id: 1, sender: 'John', message: "Can you send a link to the file?", time: '9:41 AM', direct: true },
  { id: 2, sender: 'You', message: "Just sent it", time: '9:42 AM', direct: false, audience: 'everyone' },
  { id: 3, sender: 'Raul', message: "How do you think it is going? I don't think I am going to share the entire portion of my slides. I still have some work to do on it. Either way, this gives us a chance to do a dry run.", time: '9:45 AM', direct: true },
  { id: 4, sender: 'Sandra', message: "Thanks for staying everyone. The feedback is helpful to all of us.", time: '9:48 AM', audience: 'Everyone' },
];

// Feedback and communication issues
const feedbackAndIssues = [
  { 
    id: 1, 
    type: 'recommendedReply', 
    message: "Our pricing is designed to scale with your needs—can I ask a few questions to recommend the best option for you?",
  },
  {
    id: 2,
    type: 'issue',
    message: "Sarah did not understand your question. Rephrase it as: What goals are you trying to achieve this quarter?",
  }
];

const ChatPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('conversation');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(sampleConversation);
  const [recipient, setRecipient] = useState('everyone');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add the user message
    setMessages([
      ...messages,
      { 
        id: messages.length + 1, 
        sender: 'You', 
        message: message, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audience: recipient
      }
    ]);
    
    setMessage('');
  };

  const getMessageStyle = (message) => {
    if (message.type === 'recommendedReply') {
      return 'bg-purple-50 border-l-4 border-purple-400 px-3';
    } else if (message.type === 'issue') {
      return 'bg-amber-50 border-l-4 border-amber-400 px-3';
    } else if (message.sender === 'You') {
      return 'bg-blue-100 ml-12 rounded-tl-lg rounded-bl-lg rounded-br-lg';
    } else {
      return 'bg-gray-100 mr-12 rounded-tr-lg rounded-bl-lg rounded-br-lg';
    }
  };

  const getAvatar = (sender) => {
    const colors = {
      'John': 'bg-green-200',
      'You': 'bg-blue-200',
      'Raul': 'bg-purple-200',
      'Sandra': 'bg-amber-200'
    };
    
    return (
      <Avatar className={`h-8 w-8 ${colors[sender] || 'bg-gray-200'}`}>
        <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
      </Avatar>
    );
  };

  const getMessageIcon = (message) => {
    if (message.type === 'recommendedReply') {
      return <MessageCircle className="h-4 w-4 text-purple-600" />;
    } else if (message.type === 'issue') {
      return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-md rounded-lg border border-gray-200/50 shadow-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col h-full">
        <div className="p-2 border-b border-gray-200/50 flex justify-between items-center">
          <TabsList className="w-3/5 bg-gray-100/80">
            <TabsTrigger value="conversation" className="flex-1 text-gray-700">Chat</TabsTrigger>
            <TabsTrigger value="summary" className="flex-1 text-gray-700">Participants</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100/80">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-2 text-center text-gray-500 text-xs border-b border-gray-200/50">
          9:41 AM
        </div>

        <TabsContent value="conversation" className="flex-grow flex flex-col mt-0 p-0 h-full overflow-hidden">
          <ScrollArea className="flex-grow p-3">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                  {msg.sender !== 'You' && getAvatar(msg.sender)}
                  
                  <div className="flex-grow">
                    <div className="flex text-xs text-gray-500 mb-1 items-center">
                      {msg.sender !== 'You' && (
                        <span className="font-medium flex items-center gap-1">
                          {msg.sender} {msg.direct && 
                            <span className="text-red-400 text-xs font-normal">Direct Message</span>
                          }
                          {msg.audience && !msg.direct && 
                            <span className="text-gray-500 text-xs font-normal">to {msg.audience}</span>
                          }
                        </span>
                      )}
                      
                      {msg.sender === 'You' && (
                        <span className="ml-auto font-medium flex items-center gap-1">
                          <span className="text-gray-500 text-xs font-normal">Me to {msg.audience}</span>
                        </span>
                      )}
                    </div>
                    
                    <div className={`p-2 ${getMessageStyle(msg)}`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                  
                  {msg.sender === 'You' && getAvatar(msg.sender)}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-2 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-700 text-xs flex items-center gap-1 bg-gray-100/80 hover:bg-gray-200/80 rounded-full h-7 px-3"
              >
                Send to everyone
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Button>
            </div>
            
            <div className="relative">
              <Input 
                placeholder="What happens when..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-gray-100/80 border-gray-200/50 text-gray-700 pl-9 pr-9 rounded-full"
              />
              <Button 
                size="icon" 
                variant="ghost"
                className="absolute left-1 top-1 bottom-1 text-gray-500 hover:text-gray-700 hover:bg-transparent p-1"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </Button>
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="absolute right-1 top-1 bottom-1 text-gray-500 hover:text-gray-700 hover:bg-transparent p-1"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8l4 4-4 4"></path>
                </svg>
              </Button>
            </div>
            
            <div className="flex justify-center mt-3">
              <Button variant="ghost" size="sm" className="text-gray-500 text-xs flex items-center gap-1 hover:bg-gray-100/80">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Who can see your messages?
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="flex-grow mt-0 p-4 overflow-auto h-full">
          <div className="grid gap-4">
            <Card className="p-4 bg-white border-gray-200/50 text-gray-700">
              <h3 className="font-medium mb-2">Participants (4)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getAvatar('You')}
                  <div className="flex-grow ml-2">
                    <p className="text-sm font-medium">You (Host)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {getAvatar('John')}
                  <div className="flex-grow ml-2">
                    <p className="text-sm font-medium">John</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {getAvatar('Raul')}
                  <div className="flex-grow ml-2">
                    <p className="text-sm font-medium">Raul</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {getAvatar('Sandra')}
                  <div className="flex-grow ml-2">
                    <p className="text-sm font-medium">Sandra</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatPanel;
