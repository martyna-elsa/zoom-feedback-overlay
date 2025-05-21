
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, FileText, Linkedin, BookUser, Upload, Link as LinkIcon, TargetIcon, Calendar, MessageSquareText, ListTodo, Flag, Check, Info, PhoneCall } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

// Sample call objective templates
const callObjectiveTemplates = [
  {
    id: "discovery",
    name: "Discovery Call",
    description: "First call to understand prospect's needs",
    agendaItems: [
      "Introduction and rapport building (5 min)",
      "Overview of their business challenges (10 min)",
      "Discussion of pain points and needs (15 min)",
      "Brief introduction to your solution (10 min)",
      "Next steps and scheduling follow-up (5 min)"
    ],
    keyPhrases: [
      {
        category: "Opening",
        phrases: [
          "I appreciate you taking the time to meet with us today.",
          "I'm looking forward to learning more about your business needs.",
          "Before we dive in, could you share a bit about your role at [Company]?"
        ]
      },
      {
        category: "Probing Questions",
        phrases: [
          "Could you walk me through your current process?",
          "What challenges are you facing with your existing solution?",
          "How is this issue impacting your team's productivity?"
        ]
      },
      {
        category: "Active Listening",
        phrases: [
          "If I understand correctly, your main concern is...",
          "Let me make sure I've got this right...",
          "That's interesting, could you elaborate on that point?"
        ]
      },
      {
        category: "Closing",
        phrases: [
          "Based on what we've discussed, I think we should schedule a follow-up to...",
          "Would it make sense to arrange a technical demonstration next week?",
          "What would be the next logical step from your perspective?"
        ]
      }
    ]
  },
  {
    id: "demo",
    name: "Product Demonstration",
    description: "Showcase solution features and benefits",
    agendaItems: [
      "Brief recap of previous conversations (5 min)",
      "Confirmation of key requirements (5 min)",
      "Product demonstration focused on their needs (30 min)",
      "Q&A session (10 min)",
      "Discussion of implementation steps (10 min)"
    ],
    keyPhrases: [
      {
        category: "Setting Context",
        phrases: [
          "Based on our previous conversation, I've prepared a demonstration focusing on [specific needs].",
          "Today I'd like to show you how our solution addresses the challenges we discussed.",
          "I'll tailor this demonstration to the priorities you mentioned: [list priorities]."
        ]
      },
      {
        category: "Feature Presentation",
        phrases: [
          "This feature specifically addresses your need for...",
          "As you can see, this would streamline your process of...",
          "Unlike your current solution, our platform enables you to..."
        ]
      },
      {
        category: "Handling Objections",
        phrases: [
          "That's a great question. Let me address that by showing you...",
          "I understand your concern about [objection]. Here's how we typically address that...",
          "Other clients had similar concerns before implementing, and they found that..."
        ]
      },
      {
        category: "Next Steps",
        phrases: [
          "Based on what you've seen today, what aspects would you like to explore further?",
          "Would it be helpful to involve your [IT/finance/operations] team in our next discussion?",
          "What timeline are you considering for implementation if you decide to move forward?"
        ]
      }
    ]
  },
  {
    id: "negotiation",
    name: "Negotiation/Closing",
    description: "Discuss terms and close the deal",
    agendaItems: [
      "Recap of solution value and fit (10 min)",
      "Review of proposal and pricing structure (15 min)",
      "Discussion of implementation timeline (10 min)",
      "Addressing final questions and concerns (15 min)",
      "Agreement on next steps toward contract (10 min)"
    ],
    keyPhrases: [
      {
        category: "Value Reinforcement",
        phrases: [
          "As we've discussed, the key benefits for your team would be [benefits].",
          "Based on the figures we reviewed, you could expect an ROI of approximately [X]% within [timeframe].",
          "Other clients in your industry have seen [specific results] after implementation."
        ]
      },
      {
        category: "Negotiation",
        phrases: [
          "We have some flexibility on [terms/timeline/features], but [other aspect] is a fixed requirement.",
          "If we can agree on a [longer contract/larger volume], we could adjust the [pricing/terms] to...",
          "What aspects of the proposal are most important to you? Maybe we can find a middle ground."
        ]
      },
      {
        category: "Overcoming Hesitation",
        phrases: [
          "I understand your concern about [objection]. Let me address that specifically...",
          "Many clients initially worry about [concern], but in practice they find that...",
          "Would it help if we [proposed solution to objection]?"
        ]
      },
      {
        category: "Closing",
        phrases: [
          "Given what we've discussed today, what do you see as the next steps?",
          "If we can address [remaining concern], are you ready to move forward with the agreement?",
          "Would you like me to draft a revised proposal that incorporates the changes we discussed today?"
        ]
      }
    ]
  }
];

// Sample practice call scenarios
const practiceCallScenarios = [
  {
    id: "new-client",
    title: "First Meeting with a Prospective Client",
    goal: "Establish rapport and gather information about the client's needs",
    description: "You're meeting a potential client for the first time. They've shown interest in your product but have limited knowledge of its features and benefits.",
    difficulty: "beginner",
    tasks: [
      { id: "intro", label: "Introduce yourself and your company effectively", completed: false },
      { id: "rapport", label: "Build rapport by finding common ground", completed: false },
      { id: "needs", label: "Identify key pain points and needs", completed: false },
      { id: "questions", label: "Ask open-ended discovery questions", completed: false },
      { id: "listen", label: "Practice active listening techniques", completed: false },
      { id: "solution", label: "Briefly explain how your solution could help", completed: false },
      { id: "next", label: "Set clear next steps", completed: false }
    ]
  },
  {
    id: "objection",
    title: "Handling Pricing Objections",
    goal: "Address pricing concerns while maintaining the value proposition",
    description: "The client is interested in your solution but has expressed concerns about the cost compared to competitors.",
    difficulty: "intermediate",
    tasks: [
      { id: "acknowledge", label: "Acknowledge the concern without being defensive", completed: false },
      { id: "value", label: "Reframe the discussion around value, not just cost", completed: false },
      { id: "roi", label: "Demonstrate ROI with specific examples", completed: false },
      { id: "compare", label: "Differentiating from competitors without criticizing them", completed: false },
      { id: "options", label: "Present flexible pricing options if available", completed: false },
      { id: "testimonial", label: "Share relevant success stories or testimonials", completed: false },
      { id: "agreement", label: "Work toward agreement on value before finalizing price", completed: false }
    ]
  },
  {
    id: "technical",
    title: "Technical Demonstration to IT Team",
    goal: "Effectively communicate technical details while addressing security concerns",
    description: "You're presenting to a company's IT department who will evaluate the technical aspects and security of your solution.",
    difficulty: "advanced",
    tasks: [
      { id: "tech-assess", label: "Assess technical knowledge of the audience", completed: false },
      { id: "adapt", label: "Adapt explanation based on their expertise level", completed: false },
      { id: "features", label: "Demonstrate key technical features clearly", completed: false },
      { id: "security", label: "Address security and compliance questions confidently", completed: false },
      { id: "integration", label: "Explain integration capabilities with existing systems", completed: false },
      { id: "tech-objection", label: "Handle technical objections with evidence", completed: false },
      { id: "tech-support", label: "Clarify technical support and implementation process", completed: false }
    ]
  },
  {
    id: "multi-stakeholder",
    title: "Multi-Stakeholder Negotiation",
    goal: "Navigate competing interests while moving toward agreement",
    description: "You're in a meeting with multiple decision-makers from different departments, each with their own priorities and concerns.",
    difficulty: "expert",
    tasks: [
      { id: "identify", label: "Identify each stakeholder's role and priorities", completed: false },
      { id: "balance", label: "Balance attention across all participants", completed: false },
      { id: "align", label: "Find alignment between departmental interests", completed: false },
      { id: "address", label: "Address conflicting requirements diplomatically", completed: false },
      { id: "consensus", label: "Build consensus around core benefits", completed: false },
      { id: "champion", label: "Identify and develop internal champions", completed: false },
      { id: "roadmap", label: "Create a roadmap that addresses various concerns", completed: false }
    ]
  }
];

type FormValues = {
  objective: string;
  customObjective?: string;
  audienceLevel?: string;
};

const CallPreparation: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("company-info");
  const [selectedObjective, setSelectedObjective] = useState(callObjectiveTemplates[0]);
  const [selectedScenario, setSelectedScenario] = useState(practiceCallScenarios[0]);
  
  const form = useForm<FormValues>({
    defaultValues: {
      objective: "discovery",
      audienceLevel: "intermediate"
    }
  });

  const handleUpload = (type: string) => {
    toast({
      title: "Upload initiated",
      description: `You'll soon be able to upload documents for ${type}.`
    });
  };

  const handleUrlSubmit = (type: string, event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const url = new FormData(form).get('url') as string;
    
    if (url) {
      toast({
        title: "URL received",
        description: `We'll analyze this URL for ${type}.`
      });
      form.reset();
    }
  };
  
  const handleObjectiveChange = (value: string) => {
    const objective = callObjectiveTemplates.find(o => o.id === value);
    if (objective) {
      setSelectedObjective(objective);
    }
    form.setValue("objective", value);
  };

  const handleScenarioChange = (value: string) => {
    const scenario = practiceCallScenarios.find(s => s.id === value);
    if (scenario) {
      setSelectedScenario(scenario);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setSelectedScenario(prevScenario => {
      const updatedTasks = prevScenario.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prevScenario, tasks: updatedTasks };
    });

    toast({
      title: "Task status updated",
      description: "Your progress has been saved."
    });
  };

  const startPracticeCall = () => {
    toast({
      title: "Practice call initiated",
      description: "Setting up your practice environment..."
    });
  };

  // Simulate organization data status - in a real app, this would come from an API
  const [orgDataStatus] = useState({
    yourCompany: {
      provided: true,
      lastUpdated: "2023-10-15",
      updatedBy: "Admin (Sarah Chen)"
    },
    participantCompany: {
      provided: false
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <Link to="/web-platform">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Call Preparation</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="company-info" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Company Information
            </TabsTrigger>
            <TabsTrigger value="participant-profiles" className="flex items-center gap-1">
              <BookUser className="h-4 w-4" />
              Participant Profiles
            </TabsTrigger>
            <TabsTrigger value="call-objective" className="flex items-center gap-1">
              <TargetIcon className="h-4 w-4" />
              Meeting Agenda
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="company-info" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Company Information Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Update Your Company Information</CardTitle>
                      <CardDescription>
                        Add details about your company to improve contextual feedback
                      </CardDescription>
                    </div>
                    {orgDataStatus.yourCompany.provided && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3" />
                        Provided by Admin
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {orgDataStatus.yourCompany.provided && (
                    <Alert className="bg-blue-50 text-blue-800 border-blue-200 mb-4">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Information already provided by {orgDataStatus.yourCompany.updatedBy} on {orgDataStatus.yourCompany.lastUpdated}. You can update if needed.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer" 
                       onClick={() => handleUpload('your company')}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Upload Document</h3>
                        <p className="text-sm text-gray-500">Upload company brochures, presentations or other documents</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={(e) => handleUrlSubmit('your company', e)}>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <LinkIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Paste Company URL</h3>
                          <p className="text-sm text-gray-500">Add your company website or LinkedIn page</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          name="url"
                          placeholder="https://yourcompany.com" 
                          type="url" 
                          className="flex-1"
                          required
                        />
                        <Button type="submit">Analyze</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              {/* Participant's Company Information */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Participant's Company Information</CardTitle>
                      <CardDescription>
                        Add details about the participant's company to receive more relevant insights
                      </CardDescription>
                    </div>
                    {orgDataStatus.participantCompany.provided && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3" />
                        Provided by Admin
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {orgDataStatus.participantCompany.provided && (
                    <Alert className="bg-blue-50 text-blue-800 border-blue-200 mb-4">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Information already provided by organization admin. You can update if needed.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                       onClick={() => handleUpload('participant company')}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Upload Document</h3>
                        <p className="text-sm text-gray-500">Upload materials about the participant's company</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={(e) => handleUrlSubmit('participant company', e)}>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <LinkIcon className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Paste Company URL</h3>
                          <p className="text-sm text-gray-500">Add their company website or LinkedIn page</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          name="url"
                          placeholder="https://theircompany.com" 
                          type="url" 
                          className="flex-1"
                          required
                        />
                        <Button type="submit">Analyze</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="participant-profiles" className="space-y-6">
            <Card>
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
                              Calls
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
          </TabsContent>
          
          <TabsContent value="call-objective" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Agenda</CardTitle>
                <CardDescription>
                  Define your call objective and get a suggested agenda and key phrases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="objective"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Call Objective</FormLabel>
                          <Select 
                            onValueChange={value => handleObjectiveChange(value)} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a call objective" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {callObjectiveTemplates.map((objective) => (
                                <SelectItem key={objective.id} value={objective.id}>
                                  {objective.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="custom">Custom Objective</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="audienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>English Proficiency Level</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select audience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="fluent">Fluent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("objective") === "custom" && (
                      <div className="sm:col-span-2">
                        <FormField
                          control={form.control}
                          name="customObjective"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Custom Objective Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your call objective..."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </Form>
                
                <div className="border-t pt-6 mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        Suggested Agenda
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 pl-1 text-sm">
                        {selectedObjective.agendaItems.map((item, idx) => (
                          <li key={idx} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-3">
                        <MessageSquareText className="h-4 w-4 text-green-600" />
                        Key English Phrases
                      </h3>
                      <div className="space-y-4">
                        {selectedObjective.keyPhrases.map((section, idx) => (
                          <div key={idx} className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-900">{section.category}</h4>
                            <ul className="list-disc list-inside space-y-1 pl-1 text-sm">
                              {section.phrases.map((phrase, i) => (
                                <li key={i} className="text-gray-700">
                                  {phrase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Call Objective</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CallPreparation;
