import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send, AlertTriangle, Bell, Users, Check, Star, Award, Info } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const initialMessages = [
  { id: 1, sender: 'Michael Chen', content: "Hey Sarah, great progress on the sales deck! Just a heads up, the client asked about our long-term support—can we add a slide?", time: '10:30 AM' },
  { id: 2, sender: 'Sarah Johnson', content: "Good catch, Michael! I'll add the support details. Also, I think we should highlight the ROI more—what do you think?", time: '10:35 AM' },
  { id: 3, sender: 'Alex Rodriguez', content: "Agreed on the ROI, Sarah. I have some data points from our last campaign that could help. I'll send them over.", time: '10:40 AM' },
  { id: 4, sender: 'You', content: "Thanks Alex, that would be great! I'm also wondering if we should bring up the new partnership program?", time: '10:45 AM' },
  { id: 5, sender: 'Recommended Reply', content: "Great idea!", type: 'recommendedReply' },
  { id: 6, sender: 'Recommended Reply', content: "I'm not sure that's relevant.", type: 'recommendedReply' },
  { id: 7, sender: 'Recommended Reply', content: "Let's hold off on that.", type: 'recommendedReply' },
  { id: 8, sender: 'System Alert', content: "Potential issue: Competitor X is offering a similar service at a lower price.", type: 'issue' },
];

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const youMessage = { id: newId, sender: 'You', content: newMessage, time: currentTime };
      setMessages([...messages, youMessage]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const getMessageIcon = (message) => {
    if (message.type === 'recommendedReply') {
      return null; // Removed the MessageCircle icon
    } else if (message.type === 'issue') {
      return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    }
    return <MessageSquare className="h-4 w-4 text-gray-500" />;
  };

  const renderMessageContent = (message) => {
    if (message.type === 'recommendedReply') {
      return (
        <Button variant="secondary" size="sm" className="w-full justify-start rounded-md hover:bg-secondary/80">
          {message.content}
        </Button>
      );
    } else {
      return message.content;
    }
  };

  return (
    <Tabs defaultValue="chat" className="w-full h-full flex flex-col">
      <TabsList className="bg-secondary text-secondary-foreground rounded-t-lg">
        <TabsTrigger value="chat" className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary rounded-none flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> Chat</TabsTrigger>
        <TabsTrigger value="alerts" className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary rounded-none flex items-center gap-1"><Bell className="h-3.5 w-3.5" /> Alerts</TabsTrigger>
        <TabsTrigger value="insights" className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary rounded-none flex items-center gap-1"><Info className="h-3.5 w-3.5" /> Insights</TabsTrigger>
      </TabsList>

      <div className="flex-grow flex flex-col">
        <TabsContent value="chat" className="h-full p-2 flex flex-col">
          <ScrollArea className="flex-grow">
            <div className="flex flex-col space-y-2">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-2">
                  {getMessageIcon(message)}
                  <div>
                    <div className="text-xs font-bold">{message.sender} <span className="font-normal text-gray-500">- {message.time}</span></div>
                    <div className="text-sm">{renderMessageContent(message)}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow rounded-md"
              />
              <Button onClick={sendMessage}><Send className="h-4 w-4 mr-1.5" /> Send</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="h-full p-4 flex flex-col">
          <ScrollArea className="rounded-md border flex-grow">
            <div className="p-3">
              <div className="text-sm font-medium leading-none">Team Progress</div>
              <p className="text-sm text-muted-foreground">
                Track overall team performance and identify areas for improvement.
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Card className="bg-white shadow-sm border">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Sarah Johnson</div>
                          <div className="text-xs text-muted-foreground">sarah.johnson@example.com</div>
                        </div>
                      </div>
                      <Badge variant="outline">Admin</Badge>
                    </div>
                  </Card>
                </li>
                <li>
                  <Card className="bg-white shadow-sm border">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/sadmann7.png" />
                          <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Irshad Nazeer</div>
                          <div className="text-xs text-muted-foreground">irshad.nazeer@example.com</div>
                        </div>
                      </div>
                      <Badge variant="outline">Editor</Badge>
                    </div>
                  </Card>
                </li>
                <li>
                  <Card className="bg-white shadow-sm border">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/peduarte.png" />
                          <AvatarFallback>PD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Pedro Duarte</div>
                          <div className="text-xs text-muted-foreground">pedro.duarte@example.com</div>
                        </div>
                      </div>
                      <Badge variant="outline">Editor</Badge>
                    </div>
                  </Card>
                </li>
              </ul>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="insights" className="h-full p-4 flex flex-col">
          <ScrollArea className="rounded-md border flex-grow">
            <div className="p-3">
              <div className="text-sm font-medium leading-none">Sales Performance</div>
              <p className="text-sm text-muted-foreground">
                Track individual sales and identify top performers.
              </p>
              <ul className="mt-4 space-y-4">
                <li className="border rounded-md p-4 bg-white shadow-sm">
                  <div className="font-bold text-lg flex items-center gap-1"><Users className="h-4 w-4 text-gray-500" /> Team Engagement <Star className="h-4 w-4 text-yellow-500" /></div>
                  <p className="text-sm text-gray-500">Overall team participation in meetings and training sessions.</p>
                  <div className="mt-2">
                    <Progress value={85} />
                    <div className="text-xs text-gray-500 mt-1">85% Completion</div>
                  </div>
                </li>
                <li className="border rounded-md p-4 bg-white shadow-sm">
                  <div className="font-bold text-lg flex items-center gap-1"><Award className="h-4 w-4 text-gray-500" /> Individual Achievements <Check className="h-4 w-4 text-green-500" /></div>
                  <p className="text-sm text-gray-500">Recognition of milestones and successful deals closed by team members.</p>
                  <div className="mt-2">
                    <Progress value={60} />
                    <div className="text-xs text-gray-500 mt-1">60% Target Achieved</div>
                  </div>
                </li>
              </ul>
            </div>
          </ScrollArea>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ChatPanel;
