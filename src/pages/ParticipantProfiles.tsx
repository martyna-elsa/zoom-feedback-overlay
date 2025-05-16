
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, FileText, Linkedin, BookUser, PhoneCall } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

// Sample participants data
const participants = [
  {
    id: 1,
    name: 'Michael Johnson',
    role: 'CTO',
    company: 'Acme Corporation',
    avatar: '/placeholder.svg',
    linkedin: 'https://linkedin.com/in/michael-johnson',
    bio: 'Technical leader with 15+ years of experience. Looking for scalable solutions to support company growth.',
    recentCalls: [
      { date: '2023-05-10', summary: 'Initial discovery call - showed interest in integration capabilities' },
      { date: '2023-05-15', summary: 'Technical deep dive - concerned about data migration' }
    ],
    notes: 'Technically savvy, prefers direct communication with detailed specifications. Ultimate decision maker for technical aspects.',
    painPoints: ['Current system unable to scale', 'Integration issues with existing stack', 'Security concerns'],
    interests: ['Cloud infrastructure', 'AI/ML capabilities', 'Enterprise security']
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'Acme Corporation',
    avatar: '/placeholder.svg',
    linkedin: 'https://linkedin.com/in/sarah-chen',
    bio: 'Responsible for streamlining business operations and improving efficiency across departments.',
    recentCalls: [
      { date: '2023-05-10', summary: 'Joined the discovery call - focused on ease of use and training requirements' }
    ],
    notes: 'Focuses on ROI and operational efficiency. Concerned about user adoption and training needs.',
    painPoints: ['Manual workflow inefficiencies', 'Reporting limitations', 'User adoption challenges'],
    interests: ['Process automation', 'Analytics dashboards', 'Change management']
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    role: 'Finance Director',
    company: 'Acme Corporation',
    avatar: '/placeholder.svg',
    linkedin: 'https://linkedin.com/in/alex-rodriguez',
    bio: 'Oversees all financial operations and budget planning for the technology department.',
    recentCalls: [],
    notes: 'Not directly involved in previous calls but will be key in final approval. Very budget conscious.',
    painPoints: ['Cost predictability', 'ROI justification', 'Expenditure approval processes'],
    interests: ['Subscription models', 'Total cost of ownership', 'Measurable outcomes']
  }
];

const ParticipantProfiles: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Call
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Participant Profiles</CardTitle>
            <CardDescription>
              Information about the participants in your current and past calls, including their roles, needs, and previous interactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {participants.map((participant) => (
                <Card key={participant.id} className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>{participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{participant.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            {participant.role} at {participant.company}
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="link" className="p-0 h-auto" size="sm">
                                  <Linkedin className="h-3 w-3 text-blue-600 ml-1" />
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={participant.avatar} />
                                    <AvatarFallback>{participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">{participant.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {participant.role} at {participant.company}
                                    </p>
                                    <div className="flex items-center pt-2">
                                      <a
                                        href={participant.linkedin}
                                        className="text-xs text-blue-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        View LinkedIn Profile
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {participant.recentCalls.length > 0 && (
                          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                            Previous Call Participant
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Tabs defaultValue="profile" className="w-full">
                      <TabsList className="mb-2">
                        <TabsTrigger value="profile" className="flex items-center gap-1">
                          <BookUser className="h-4 w-4" />
                          Profile
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Your Notes
                        </TabsTrigger>
                        <TabsTrigger value="calls" className="flex items-center gap-1">
                          <PhoneCall className="h-4 w-4" />
                          Previous Calls
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="profile">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Bio</h4>
                            <p className="text-sm text-gray-600">{participant.bio}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Pain Points</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {participant.painPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Interests</h4>
                            <div className="flex flex-wrap gap-1">
                              {participant.interests.map((interest, i) => (
                                <Badge key={i} variant="secondary">{interest}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notes">
                        <div className="space-y-4">
                          {participant.notes ? (
                            <p className="text-sm text-gray-600">{participant.notes}</p>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No notes have been added yet.</p>
                          )}
                          <Button variant="outline" size="sm">Add Note</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="calls">
                        {participant.recentCalls.length > 0 ? (
                          <div className="space-y-2">
                            {participant.recentCalls.map((call, i) => (
                              <div key={i} className="border-l-2 border-blue-500 pl-3 py-1">
                                <p className="text-xs text-gray-500">{call.date}</p>
                                <p className="text-sm">{call.summary}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No previous call records found.</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantProfiles;
