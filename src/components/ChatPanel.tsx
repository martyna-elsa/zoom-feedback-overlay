
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';

// Sample conversation data
const sampleConversation = [
  { id: 1, sender: 'Customer', message: "Hi, I'm interested in your product, but I need to understand your pricing options.", time: '10:02 AM' },
  { id: 2, sender: 'Sales Rep', message: "Hello! Thanks for your interest. Our pricing is designed to scale with your needs. Can I ask about your use case to recommend the best option?", time: '10:03 AM' },
  { id: 3, sender: 'Customer', message: "We're a team of 25 people looking for a video conferencing solution with good security features.", time: '10:05 AM' },
  { id: 4, sender: 'Sales Rep', message: "Perfect! For a team your size, our Business plan at $15/user/month would be ideal. It includes end-to-end encryption, SSO, and 24/7 support.", time: '10:07 AM' },
  { id: 5, sender: 'Customer', message: "That sounds promising. Do you offer any discounts for annual payments?", time: '10:08 AM' },
  { id: 6, sender: 'Sales Rep', message: "Yes, we offer a 20% discount for annual commitments! That would bring it down to $12/user/month.", time: '10:10 AM' },
];

const ChatPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('conversation');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState(sampleConversation);

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add the user question
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: 'You', message: question, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    
    // Simulate an AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          sender: 'AI Assistant', 
          message: "Based on this conversation, I recommend emphasizing the annual discount and security features. This aligns with the customer's priorities.", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }, 1000);
    
    setQuestion('');
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col h-full">
        <div className="p-3 border-b border-gray-200">
          <TabsList className="w-full">
            <TabsTrigger value="conversation" className="flex-1">Conversation</TabsTrigger>
            <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="conversation" className="flex-grow flex flex-col mt-0 p-0 h-full">
          <ScrollArea className="flex-grow p-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-3 p-3 rounded-lg ${
                  msg.sender === 'Sales Rep' || msg.sender === 'You' || msg.sender === 'AI Assistant' 
                    ? 'bg-blue-50 ml-6' 
                    : 'bg-gray-100 mr-6'
                }`}
              >
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span className="font-medium">{msg.sender}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            ))}
          </ScrollArea>
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask about this conversation..." 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
              />
              <Button size="icon" onClick={handleSendQuestion}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="flex-grow mt-0 p-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Conversation Summary
            </h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Customer Need:</strong> Video conferencing for 25-person team with security features</li>
              <li><strong>Solution Offered:</strong> Business plan ($15/user/month)</li>
              <li><strong>Key Features Highlighted:</strong> End-to-end encryption, SSO, 24/7 support</li>
              <li><strong>Special Offer:</strong> 20% discount for annual payment ($12/user/month)</li>
              <li><strong>Next Steps:</strong> Schedule product demo, send formal quote</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatPanel;
