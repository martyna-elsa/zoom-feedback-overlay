
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
  const [activeTab, setActiveTab] = useState('summary');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState(sampleConversation);
  const [showMisunderstandingAlert, setShowMisunderstandingAlert] = useState(true);

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

  const dismissAlert = () => {
    setShowMisunderstandingAlert(false);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col h-full">
        <div className="p-3 border-b border-gray-200">
          <TabsList className="w-full">
            <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
            <TabsTrigger value="conversation" className="flex-1">Conversation</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="summary" className="flex-grow mt-0 p-4 overflow-auto h-full">
          <div className="space-y-4">
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

            <Card className="p-4">
              <h3 className="font-medium mb-3 text-blue-700">Language Proficiency Assessment</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Pronunciation</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">85%</span>
                </div>
                <p className="text-xs text-gray-600">Clear articulation with minimal accent interference. Properly emphasized key terms like "annual commitments" and "end-to-end encryption".</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Grammar & Vocabulary</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">90%</span>
                </div>
                <p className="text-xs text-gray-600">Strong command of technical vocabulary. Correctly used conditional structures: "That would bring it down to $12/user/month."</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Confidence & Fluency</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">88%</span>
                </div>
                <p className="text-xs text-gray-600">Spoke without hesitation. Maintained conversational flow even when discussing technical features.</p>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-3 text-blue-700">Communication Skills</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Negotiation Skills</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">82%</span>
                </div>
                <p className="text-xs text-gray-600">Effectively presented value proposition. Could improve by proactively addressing potential objections before they arise.</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Persuasion Effectiveness</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">78%</span>
                </div>
                <p className="text-xs text-gray-600">Good use of social proof and value-based selling. Example: "For a team your size, our Business plan would be ideal."</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Customer Understanding</h4>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">95%</span>
                </div>
                <p className="text-xs text-gray-600">Excellent at identifying customer needs and matching solutions. Quickly recognized security as a key priority.</p>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2 text-blue-700">Measurable Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-blue-800 text-xl font-semibold">87%</p>
                  <p className="text-xs text-gray-600">Overall Effectiveness</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-green-800 text-xl font-semibold">+20%</p>
                  <p className="text-xs text-gray-600">Value Added (Annual Discount)</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-purple-800 text-xl font-semibold">3/4</p>
                  <p className="text-xs text-gray-600">Key Points Addressed</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-center">
                  <p className="text-amber-800 text-xl font-semibold">100%</p>
                  <p className="text-xs text-gray-600">Customer Questions Answered</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversation" className="flex-grow flex flex-col mt-0 p-0 h-full overflow-hidden">
          {showMisunderstandingAlert && (
            <Alert variant="destructive" className="mx-1 mt-1 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800">Communication Issue</AlertTitle>
              <AlertDescription className="text-amber-700">
                Sarah did not understand Michael's question. Michael, please formulate it in a clearer way.
              </AlertDescription>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 h-6 w-6 p-0" 
                onClick={dismissAlert}
              >
                ×
              </Button>
            </Alert>
          )}
          <ScrollArea className="flex-grow p-1">
            <div className="space-y-2">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-2 rounded-lg ${
                    msg.sender === 'Sales Rep' || msg.sender === 'You' || msg.sender === 'AI Assistant' 
                      ? 'bg-blue-50 ml-4' 
                      : 'bg-gray-100 mr-4'
                  }`}
                >
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="font-medium">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-1 border-t border-gray-200">
            <div className="flex gap-1">
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
      </Tabs>
    </div>
  );
};

export default ChatPanel;
