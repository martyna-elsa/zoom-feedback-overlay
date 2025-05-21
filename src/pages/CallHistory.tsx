import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, History, FileText, Headphones, TrendingUp, X, Users } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

// Sample summary data for each call
const callSummaryData = {
  1: {
    sections: [
      { title: "Team", points: ["Enterprise sales team alignment confirmed", "Technical support involvement established"] },
      { title: "Problem", points: ["Integration timeline concerns", "Current workflow disruption risks"] },
      { title: "Product", points: ["Enterprise plan features overview discussed", "Custom API access requirements identified"] },
      { title: "Go-to-market", points: ["Implementation timeline of 3 months proposed", "Training resources requested"] },
      { title: "Traction", points: ["Current solutions causing 45% productivity loss", "Competitor X offering similar solution"] },
      { title: "Fundraising", points: ["Client budget approved for Q3", "ROI expectations set at 30% minimum"] }
    ],
    influenceMap: [
      { name: "Michael Scott", title: "Decision Maker", stance: "Supportive", concerns: "Timeline and training", influence: "High" },
      { name: "David Wallace", title: "Budget Approver", stance: "Neutral", concerns: "Cost justification", influence: "Critical" },
      { name: "Jim Halpert", title: "End User", stance: "Enthusiastic", concerns: "Ease of use", influence: "Medium" }
    ],
    actionItems: [
      { description: "Send detailed implementation plan", assignee: "Sales Team", dueDate: "2025-05-22" },
      { description: "Schedule technical demo with IT department", assignee: "Product Team", dueDate: "2025-05-25" },
      { description: "Prepare ROI calculation document", assignee: "Sales Team", dueDate: "2025-05-20" }
    ]
  },
  2: {
    sections: [
      { title: "Team", points: ["Mid-market team alignment confirmed", "Decision makers identified"] },
      { title: "Problem", points: ["Budget constraints highlighted", "Current solution limitations discussed"] },
      { title: "Product", points: ["Pricing structure detailed", "Feature comparison with competitors provided"] },
      { title: "Go-to-market", points: ["30-day trial proposed", "Phased implementation suggested"] },
      { title: "Traction", points: ["2 competitors being evaluated", "Decision timeline: end of month"] },
      { title: "Fundraising", points: ["Budget approval process explained", "Payment terms negotiated"] }
    ],
    influenceMap: [
      { name: "Jim Halpert", title: "Sales Rep", stance: "Supportive", concerns: "Meeting sales targets", influence: "Medium" },
      { name: "Karen Filippelli", title: "Decision Maker", stance: "Cautious", concerns: "Budget and implementation", influence: "High" }
    ],
    actionItems: [
      { description: "Follow up with competitive comparison sheet", assignee: "Sales Team", dueDate: "2025-05-16" },
      { description: "Schedule demo with technical team", assignee: "Product Team", dueDate: "2025-05-18" }
    ]
  },
  3: {
    sections: [
      { title: "Team", points: ["Small business focused", "Technical decision makers present"] },
      { title: "Problem", points: ["Scaling issues with current system", "Training requirements for new staff"] },
      { title: "Product", points: ["Core features walkthrough", "Basic vs. Premium plan comparison"] },
      { title: "Go-to-market", points: ["Immediate implementation available", "Online training resources highlighted"] },
      { title: "Traction", points: ["First-time CRM implementation", "Growing team (10 new hires planned)"] },
      { title: "Fundraising", points: ["Monthly subscription model preferred", "6-month commitment discussed"] }
    ],
    influenceMap: [
      { name: "Dwight Schrute", title: "Owner", stance: "Enthusiastic", concerns: "Getting maximum value", influence: "High" },
      { name: "Andy Bernard", title: "Sales Manager", stance: "Skeptical", concerns: "Ease of adoption", influence: "Medium" }
    ],
    actionItems: [
      { description: "Share user testimonials from similar businesses", assignee: "Marketing", dueDate: "2025-05-10" },
      { description: "Prepare simplified onboarding plan", assignee: "Customer Success", dueDate: "2025-05-12" }
    ]
  },
  4: {
    sections: [
      { title: "Team", points: ["Healthcare division stakeholders", "IT and compliance teams present"] },
      { title: "Problem", points: ["HIPAA compliance requirements", "Integration with EHR systems"] },
      { title: "Product", points: ["Security features detailed", "Healthcare-specific workflows demonstrated"] },
      { title: "Go-to-market", points: ["12-month renewal terms", "Service level agreements discussed"] },
      { title: "Traction", points: ["3-year existing customer", "Expanding to 3 new departments"] },
      { title: "Fundraising", points: ["Annual budget already approved", "Looking for multi-year discount"] }
    ],
    influenceMap: [
      { name: "Pam Beesly", title: "Project Manager", stance: "Supportive", concerns: "Minimal disruption", influence: "Medium" },
      { name: "Ryan Howard", title: "IT Director", stance: "Technical focus", concerns: "Security and integration", influence: "High" }
    ],
    actionItems: [
      { description: "Provide updated compliance documentation", assignee: "Legal", dueDate: "2025-05-06" },
      { description: "Schedule integration planning with IT team", assignee: "Engineering", dueDate: "2025-05-08" },
      { description: "Draft multi-year contract proposal", assignee: "Sales", dueDate: "2025-05-07" }
    ]
  },
  5: {
    sections: [
      { title: "Team", points: ["Support and customer success teams", "End-user representatives"] },
      { title: "Problem", points: ["Ongoing technical issues", "Training gaps identified"] },
      { title: "Product", points: ["Troubleshooting specific features", "New feature requests noted"] },
      { title: "Go-to-market", points: ["Support plan renewal options", "Additional services offered"] },
      { title: "Traction", points: ["At risk of churn", "Competitor outreach mentioned"] },
      { title: "Fundraising", points: ["Budget constraints for upgrades", "ROI requirements for additional investment"] }
    ],
    influenceMap: [
      { name: "Kelly Kapoor", title: "End User", stance: "Frustrated", concerns: "Issue resolution speed", influence: "Medium" },
      { name: "Toby Flenderson", title: "Admin", stance: "Neutral", concerns: "Process documentation", influence: "Low" }
    ],
    actionItems: [
      { description: "Create custom troubleshooting guide", assignee: "Support", dueDate: "2025-04-30" },
      { description: "Schedule refresher training session", assignee: "Customer Success", dueDate: "2025-05-02" }
    ]
  }
};

const CallHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState("summary");

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
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Summary
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[800px] max-w-[95vw] p-0" align="center">
                      <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{call.topic}</h3>
                        <PopoverClose className="rounded-full p-1 hover:bg-gray-100">
                          <X className="h-4 w-4" />
                        </PopoverClose>
                      </div>
                      <div className="p-4">
                        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
                          <TabsList className="mb-4">
                            <TabsTrigger value="summary">Call Summary</TabsTrigger>
                            <TabsTrigger value="influence">Influence Map</TabsTrigger>
                            <TabsTrigger value="actions">Action Items</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="summary" className="space-y-4">
                            {callSummaryData[call.id].sections.map((section, index) => (
                              <div key={index} className="mb-4">
                                <h4 className="text-md font-semibold mb-2">{section.title}</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {section.points.map((point, i) => (
                                    <li key={i} className="text-sm">{point}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </TabsContent>
                          
                          <TabsContent value="influence">
                            <div className="mb-2 flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <h4 className="text-md font-semibold">Stakeholder Influence Analysis</h4>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Stakeholder</TableHead>
                                  <TableHead>Role</TableHead>
                                  <TableHead>Stance</TableHead>
                                  <TableHead>Key Concerns</TableHead>
                                  <TableHead>Influence Level</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {callSummaryData[call.id].influenceMap.map((stakeholder, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{stakeholder.name}</TableCell>
                                    <TableCell>{stakeholder.title}</TableCell>
                                    <TableCell>
                                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        stakeholder.stance === 'Supportive' ? 'bg-green-100 text-green-800' :
                                        stakeholder.stance === 'Neutral' ? 'bg-gray-100 text-gray-800' :
                                        stakeholder.stance === 'Enthusiastic' ? 'bg-blue-100 text-blue-800' :
                                        stakeholder.stance === 'Skeptical' ? 'bg-yellow-100 text-yellow-800' :
                                        stakeholder.stance === 'Cautious' ? 'bg-yellow-100 text-yellow-800' :
                                        stakeholder.stance === 'Frustrated' ? 'bg-red-100 text-red-800' :
                                        stakeholder.stance === 'Technical focus' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}>
                                        {stakeholder.stance}
                                      </span>
                                    </TableCell>
                                    <TableCell>{stakeholder.concerns}</TableCell>
                                    <TableCell>
                                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        stakeholder.influence === 'High' || stakeholder.influence === 'Critical' ? 'bg-blue-100 text-blue-800' :
                                        stakeholder.influence === 'Medium' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}>
                                        {stakeholder.influence}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          
                          <TabsContent value="actions">
                            <div className="mb-2">
                              <h4 className="text-md font-semibold">Action Items & Next Steps</h4>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Task</TableHead>
                                  <TableHead>Owner</TableHead>
                                  <TableHead>Due Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {callSummaryData[call.id].actionItems.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{item.description}</TableCell>
                                    <TableCell>{item.assignee}</TableCell>
                                    <TableCell>{item.dueDate}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
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
