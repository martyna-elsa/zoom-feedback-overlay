
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, History, FileText, Headphones, TrendingUp } from 'lucide-react';

// Sample call history data
const callHistoryData = [
  {
    id: 1,
    date: '2025-05-15',
    time: '14:30',
    duration: '45 min',
    topic: 'Product Demo - Enterprise Plan',
    participants: ['Michael Scott', 'David Wallace'],
    hasTranscript: true,
    hasRecording: true,
  },
  {
    id: 2,
    date: '2025-05-12',
    time: '10:15',
    duration: '32 min',
    topic: 'Pricing Negotiation - Mid-Market Segment',
    participants: ['Jim Halpert', 'Karen Filippelli'],
    hasTranscript: true,
    hasRecording: true,
  },
  {
    id: 3,
    date: '2025-05-08',
    time: '11:45',
    duration: '28 min',
    topic: 'Feature Walkthrough - Small Business',
    participants: ['Dwight Schrute', 'Andy Bernard'],
    hasTranscript: true,
    hasRecording: false,
  },
  {
    id: 4,
    date: '2025-05-03',
    time: '09:00',
    duration: '53 min',
    topic: 'Annual Contract Renewal - Healthcare Sector',
    participants: ['Pam Beesly', 'Ryan Howard'],
    hasTranscript: true,
    hasRecording: true,
  },
  {
    id: 5,
    date: '2025-04-28',
    time: '16:00',
    duration: '37 min',
    topic: 'Technical Support Follow-up',
    participants: ['Kelly Kapoor', 'Toby Flenderson'],
    hasTranscript: false,
    hasRecording: true,
  }
];

const CallHistory: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <History className="mr-2 h-6 w-6 text-blue-600" />
            Call History
          </h1>
          <div className="flex gap-2">
            <Link to="/skills-progress">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                View Skills Progress
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Call
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid gap-4">
          {callHistoryData.map((call) => (
            <Card key={call.id} className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{call.topic}</CardTitle>
                  <div className="text-sm text-gray-500">
                    {call.date} at {call.time} ({call.duration})
                  </div>
                </div>
                <CardDescription>
                  Participants: {call.participants.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={call.hasTranscript ? "outline" : "ghost"} 
                    className="flex items-center gap-2"
                    disabled={!call.hasTranscript}
                  >
                    <FileText className="h-4 w-4" />
                    View Transcript
                  </Button>
                  <Button 
                    variant={call.hasRecording ? "outline" : "ghost"} 
                    className="flex items-center gap-2"
                    disabled={!call.hasRecording}
                  >
                    <Headphones className="h-4 w-4" />
                    Listen to Recording
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Summary
                  </Button>
                  <Link to="/skills-progress" className="ml-auto">
                    <Button variant="default" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Skill Assessment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallHistory;
