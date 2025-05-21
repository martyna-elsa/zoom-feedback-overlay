import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send, AlertTriangle, MessageCircle, Bell, Users, Check, Star, Award, Info } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Sample sales conversation data from the screenshots
const sampleConversation = [
  { 
    id: 1, 
    sender: 'Customer', 
    message: "Hi, I'm interested in your product, but I need to understand your pricing options.", 
    time: '10:02 AM',
    type: 'customer'
  },
  { 
    id: 2, 
    sender: 'Sales Rep', 
    message: "Hello! Thanks for your interest. Our pricing is designed to scale with your needs. Can I ask about your use case to recommend the best option?", 
    time: '10:03 AM',
    type: 'rep'
  },
  { 
    id: 3, 
    sender: 'Customer', 
    message: "We're a team of 25 people looking for a video conferencing solution with good security features.", 
    time: '10:05 AM',
    type: 'customer'
  },
  { 
    id: 4, 
    sender: 'Sales Rep', 
    message: "Perfect! For a team your size, our Business plan at $15/user/month would be ideal. It includes end-to-end encryption, SSO, and 24/7 support.", 
    time: '10:07 AM',
    type: 'rep'
  },
  { 
    id: 5, 
    sender: 'Customer', 
    message: "That sounds promising. Do you offer any discounts for annual payments?", 
    time: '10:08 AM',
    type: 'customer'
  },
  { 
    id: 6, 
    sender: 'Sales Rep', 
    message: "Yes, we offer a 20% discount for annual commitments! That would bring it down to $12/user/month.", 
    time: '10:10 AM',
    type: 'rep'
  }
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
        sender: 'Sales Rep', 
        message: message, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'rep'
      }
    ]);
    
    setMessage('');
  };

  const getMessageStyle = (message) => {
    if (message.type === 'recommendedReply') {
      return 'bg-pink-50 border-l-4 border-pink-400 px-3';
    } else if (message.type === 'issue') {
      return 'bg-amber-50 border-l-4 border-amber-400 px-3';
    } else if (message.type === 'rep') {
      return 'bg-blue-100 rounded-tl-lg rounded-bl-lg rounded-br-lg';
    } else {
      return 'bg-gray-100 rounded-tr-lg rounded-bl-lg rounded-br-lg';
    }
  };

  const getAvatar = (sender) => {
    const colors = {
      'Customer': 'bg-gray-200',
      'Sales Rep': 'bg-blue-200',
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
          <TabsList className="w-full bg-gray-100/80">
            <TabsTrigger value="conversation" className="flex-1 text-gray-700">Conversation</TabsTrigger>
            <TabsTrigger value="summary" className="flex-1 text-gray-700">Summary</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="conversation" className="flex-grow flex flex-col mt-0 p-0 h-full overflow-hidden">
          <ScrollArea className="flex-grow p-2">
            <div className="space-y-2">
              {/* Recommended Reply heading - Changed background to pink */}
              {feedbackAndIssues.some(item => item.type === 'recommendedReply') && (
                <div className="mb-1 mt-1 bg-pink-100 p-1 rounded">
                  <h3 className="text-sm font-medium text-pink-500 flex items-center">
                    <span className="mr-1">🧠</span>
                    Recommended Reply
                  </h3>
                </div>
              )}
              
              {/* Recommended Reply items */}
              {feedbackAndIssues
                .filter(item => item.type === 'recommendedReply')
                .map((item) => (
                  <div key={item.id} className="flex items-start gap-1 mb-2">
                    {getMessageIcon(item)}
                    
                    <div className="flex-grow">
                      <div className={`p-1.5 ${getMessageStyle(item)}`}>
                        <p className="text-sm">{item.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              
              {/* Miscommunication Detected heading */}
              {feedbackAndIssues.some(item => item.type === 'issue') && (
                <div className="mb-1 mt-2">
                  <h3 className="text-sm font-medium text-amber-600 flex items-center">
                    <span className="mr-1">📘</span>
                    Miscommunication Detected
                  </h3>
                </div>
              )}
              
              {/* Communication issues items */}
              {feedbackAndIssues
                .filter(item => item.type === 'issue')
                .map((item) => (
                  <div key={item.id} className="flex items-start gap-1 mb-2">
                    {getMessageIcon(item)}
                    
                    <div className="flex-grow">
                      <div className={`p-1.5 ${getMessageStyle(item)}`}>
                        <p className="text-sm">{item.message}</p>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Regular conversation messages */}
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-1.5 mb-1.5">
                  {msg.type === 'customer' && getAvatar(msg.sender)}
                  
                  <div className="flex-grow">
                    <div className="flex text-xs text-gray-500 mb-0.5">
                      <span className="font-medium">{msg.sender}</span>
                      <span className="ml-auto">{msg.time}</span>
                    </div>
                    
                    <div className={`p-1.5 ${getMessageStyle(msg)}`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                  
                  {msg.type === 'rep' && getAvatar(msg.sender)}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-2 mt-1 border-t border-gray-200/50">
            <div className="relative">
              <Input 
                placeholder="Ask about this conversation..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-gray-100/80 border-gray-200/50 text-gray-700 pr-10 rounded-full"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="absolute right-1 top-1 bottom-1 text-blue-500 hover:text-blue-700 hover:bg-transparent p-1"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="flex-grow mt-0 p-3 overflow-auto h-full">
          <div className="grid gap-4">
            <Card className="p-4 bg-white border-gray-200/50 text-gray-700">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-lg">Conversation Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">Customer Need:</h4>
                  <p className="text-sm">Video conferencing for 25-person team with security features</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Solution Offered:</h4>
                  <p className="text-sm">Business plan ($15/user/month)</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Key Features Highlighted:</h4>
                  <p className="text-sm">End-to-end encryption, SSO, 24/7 support</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Special Offer:</h4>
                  <p className="text-sm">20% discount for annual payment ($12/user/month)</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Next Steps:</h4>
                  <p className="text-sm">Schedule product demo, send formal quote</p>
                </div>
              </div>
            </Card>

            {/* Measurable Results Card */}
            <Card className="p-4 bg-white border-gray-200/50 text-gray-700">
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-lg text-blue-600">Measurable Results</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">87%</div>
                  <div className="text-sm font-medium text-gray-600">Overall Effectiveness</div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">+20%</div>
                  <div className="text-sm font-medium text-gray-600">Value Added (Annual Discount)</div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">3/4</div>
                  <div className="text-sm font-medium text-gray-600">Key Points Addressed</div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-sm font-medium text-gray-600">Customer Questions Answered</div>
                </div>
              </div>
            </Card>

            {/* Communication Skills Card */}
            <Card className="p-4 bg-white border-gray-200/50 text-gray-700">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-lg text-blue-600">Communication Skills</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Negotiation Skills</h4>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2 mb-1" />
                  <p className="text-sm text-gray-600">
                    Effectively presented value proposition. Could improve by proactively addressing potential objections before they arise.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Persuasion Effectiveness</h4>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2 mb-1" />
                  <p className="text-sm text-gray-600">
                    Good use of social proof and value-based selling. Example: "For a team your size, our Business plan would be ideal."
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Customer Understanding</h4>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2 mb-1" />
                  <p className="text-sm text-gray-600">
                    Excellent at identifying customer needs and matching solutions. Quickly recognized security as a key priority.
                  </p>
                </div>
              </div>
            </Card>

            {/* Soft Skills Card */}
            <Card className="p-4 bg-white border-gray-200/50 text-gray-700">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-lg text-blue-600">Soft Skills</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Active Listening</h4>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2 mb-1" />
                  <p className="text-sm text-gray-600">
                    Demonstrated excellent comprehension by addressing the specific team size and security concerns mentioned by the customer.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Empathy</h4>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2 mb-1" />
                  <p className="text-sm text-gray-600">
                    Showed understanding of customer's budget concerns by proactively offering the annual discount option.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Problem Solving</h4>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2 mb-1" />
                  <p className="text-sm text-gray-600">
                    Quickly identified the appropriate plan based on team size and security requirements without unnecessary upselling.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white border-gray-200/50 text-gray-700">
              <h3 className="font-medium mb-2 text-blue-600">Language Proficiency Assessment</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Pronunciation</h4>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "85%"}}></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    Clear articulation with minimal accent interference. Properly emphasized key terms like "annual commitments" and "end-to-end encryption".
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Grammar & Vocabulary</h4>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "90%"}}></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    Strong command of technical vocabulary. Correctly used conditional structures: "That would bring it down to $12/user/month."
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Confidence & Fluency</h4>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "88%"}}></div>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    Spoke without hesitation. Maintained conversational flow even when discussing technical features.
                  </p>
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
