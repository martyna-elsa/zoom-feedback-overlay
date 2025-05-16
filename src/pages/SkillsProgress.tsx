import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Filter, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Define skill categories
const CATEGORIES = {
  ENGLISH: "english-proficiency",
  SOFT: "soft-skills",
  COMMUNICATION: "communication-competency"
};

// Define data structure
type Skill = {
  name: string;
  value: number;
  improvement: string;
  category: string;
};

// Call data structure for the call selector
type CallData = {
  id: number;
  date: string;
  title: string;
  participants: string[];
  skills?: Skill[];
};

// Sample call data
const callsData: CallData[] = [
  {
    id: 1,
    date: "2025-05-15",
    title: "Product Demo - Enterprise Plan",
    participants: ['Michael Scott', 'David Wallace'],
    skills: [
      { name: "Pronunciation", value: 70, improvement: "+5%", category: CATEGORIES.ENGLISH },
      { name: "Vocabulary", value: 75, improvement: "+3%", category: CATEGORIES.ENGLISH },
      { name: "Grammar", value: 72, improvement: "+4%", category: CATEGORIES.ENGLISH },
      { name: "Intonation", value: 60, improvement: "+5%", category: CATEGORIES.ENGLISH },
      { name: "Fluency", value: 65, improvement: "+5%", category: CATEGORIES.ENGLISH },
      { name: "Negotiation", value: 80, improvement: "+5%", category: CATEGORIES.SOFT },
      { name: "Persuasion", value: 75, improvement: "+5%", category: CATEGORIES.SOFT },
      { name: "Understanding", value: 85, improvement: "+5%", category: CATEGORIES.COMMUNICATION },
      { name: "Confidence", value: 90, improvement: "+5%", category: CATEGORIES.COMMUNICATION },
      { name: "Coherence", value: 80, improvement: "+2%", category: CATEGORIES.COMMUNICATION }
    ]
  },
  {
    id: 2,
    date: "2025-05-12",
    title: "Pricing Negotiation - Mid-Market Segment",
    participants: ['Jim Halpert', 'Karen Filippelli'],
    skills: [
      { name: "Pronunciation", value: 65, improvement: "+0%", category: CATEGORIES.ENGLISH },
      { name: "Vocabulary", value: 72, improvement: "+2%", category: CATEGORIES.ENGLISH },
      { name: "Grammar", value: 68, improvement: "+3%", category: CATEGORIES.ENGLISH },
      { name: "Intonation", value: 52, improvement: "+2%", category: CATEGORIES.ENGLISH },
      { name: "Fluency", value: 58, improvement: "+3%", category: CATEGORIES.ENGLISH },
      { name: "Negotiation", value: 78, improvement: "+8%", category: CATEGORIES.SOFT },
      { name: "Persuasion", value: 68, improvement: "+3%", category: CATEGORIES.SOFT },
      { name: "Understanding", value: 78, improvement: "+3%", category: CATEGORIES.COMMUNICATION },
      { name: "Confidence", value: 83, improvement: "+3%", category: CATEGORIES.COMMUNICATION },
      { name: "Coherence", value: 75, improvement: "+3%", category: CATEGORIES.COMMUNICATION }
    ]
  },
  {
    id: 3,
    date: "2025-05-08",
    title: "Feature Walkthrough - Small Business",
    participants: ['Dwight Schrute', 'Andy Bernard'],
    skills: [
      { name: "Pronunciation", value: 62, improvement: "+2%", category: CATEGORIES.ENGLISH },
      { name: "Vocabulary", value: 70, improvement: "+4%", category: CATEGORIES.ENGLISH },
      { name: "Grammar", value: 65, improvement: "+2%", category: CATEGORIES.ENGLISH },
      { name: "Intonation", value: 50, improvement: "+5%", category: CATEGORIES.ENGLISH },
      { name: "Fluency", value: 55, improvement: "+2%", category: CATEGORIES.ENGLISH },
      { name: "Negotiation", value: 72, improvement: "+2%", category: CATEGORIES.SOFT },
      { name: "Persuasion", value: 65, improvement: "+5%", category: CATEGORIES.SOFT },
      { name: "Understanding", value: 75, improvement: "+2%", category: CATEGORIES.COMMUNICATION },
      { name: "Confidence", value: 80, improvement: "+5%", category: CATEGORIES.COMMUNICATION },
      { name: "Coherence", value: 72, improvement: "+4%", category: CATEGORIES.COMMUNICATION }
    ]
  }
];

const getCategoryColor = (category: string): string => {
  switch (category) {
    case CATEGORIES.ENGLISH:
      return "#3b82f6"; // blue
    case CATEGORIES.SOFT:
      return "#10b981"; // green
    case CATEGORIES.COMMUNICATION:
      return "#8b5cf6"; // purple
    default:
      return "#6b7280"; // gray
  }
};

const skills: Skill[] = [
  { name: "Pronunciation", value: 65, improvement: "+15%", category: CATEGORIES.ENGLISH },
  { name: "Vocabulary", value: 72, improvement: "+8%", category: CATEGORIES.ENGLISH },
  { name: "Grammar", value: 68, improvement: "+12%", category: CATEGORIES.ENGLISH },
  { name: "Intonation", value: 55, improvement: "+20%", category: CATEGORIES.ENGLISH },
  { name: "Fluency", value: 60, improvement: "+10%", category: CATEGORIES.ENGLISH },
  { name: "Negotiation", value: 75, improvement: "+5%", category: CATEGORIES.SOFT },
  { name: "Persuasion", value: 70, improvement: "+15%", category: CATEGORIES.SOFT },
  { name: "Understanding", value: 80, improvement: "+7%", category: CATEGORIES.COMMUNICATION },
  { name: "Confidence", value: 85, improvement: "+25%", category: CATEGORIES.COMMUNICATION },
  { name: "Coherence", value: 78, improvement: "+18%", category: CATEGORIES.COMMUNICATION }
];

const getDisplayedSkills = (skills: Skill[], selectedCategories: string[]) => {
  if (selectedCategories.length === 0) return skills;
  return skills.filter(skill => selectedCategories.includes(skill.category));
};

const transformDataForChart = (skills: Skill[]) => {
  // Create a data array for the radar chart
  return skills.map(skill => ({
    name: skill.name,
    value: skill.value,
    // Add a fill color based on category
    fill: getCategoryColor(skill.category)
  }));
};

const categoryLabels: Record<string, string> = {
  [CATEGORIES.ENGLISH]: "English Proficiency",
  [CATEGORIES.SOFT]: "Soft Skills",
  [CATEGORIES.COMMUNICATION]: "Communication Competency"
};

const SkillsProgress: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("last-month");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"timeframe" | "call">("timeframe");
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);

  // Get the appropriate skills data based on view mode
  const getActiveSkills = () => {
    if (viewMode === "call" && selectedCallId) {
      const callId = parseInt(selectedCallId);
      const selectedCall = callsData.find(call => call.id === callId);
      return selectedCall?.skills || skills;
    }
    return skills;
  };

  const displayedSkills = getDisplayedSkills(getActiveSkills(), selectedCategories);
  const chartData = transformDataForChart(displayedSkills);

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

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Skills Progress</h1>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="viewMode" className="text-sm font-medium">View:</Label>
              <Select value={viewMode} onValueChange={(value: "timeframe" | "call") => {
                setViewMode(value);
                setSelectedCallId(value === "call" ? callsData[0]?.id.toString() : null);
              }}>
                <SelectTrigger className="w-[140px]" id="viewMode">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="timeframe">Timeframe</SelectItem>
                  <SelectItem value="call">Specific Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {viewMode === "timeframe" ? (
              <div className="flex items-center gap-2">
                <Label htmlFor="timeframe" className="text-sm font-medium">Timeframe:</Label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-[140px]" id="timeframe">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Label htmlFor="call" className="text-sm font-medium">Call:</Label>
                <Select 
                  value={selectedCallId || ""} 
                  onValueChange={setSelectedCallId}
                >
                  <SelectTrigger className="w-[240px]" id="call">
                    <SelectValue placeholder="Select call" />
                  </SelectTrigger>
                  <SelectContent>
                    {callsData.map(call => (
                      <SelectItem key={call.id} value={call.id.toString()}>
                        {call.date} - {call.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {selectedCallId && viewMode === "call" && (
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Call Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const callId = parseInt(selectedCallId);
                  const selectedCall = callsData.find(call => call.id === callId);
                  return selectedCall ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{selectedCall.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Title</p>
                          <p className="font-medium">{selectedCall.title}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Participants</p>
                        <p className="font-medium">{selectedCall.participants.join(", ")}</p>
                      </div>
                    </div>
                  ) : (
                    <p>No call details available.</p>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <ToggleGroup 
              type="multiple" 
              value={selectedCategories}
              onValueChange={setSelectedCategories}
              className="flex flex-wrap gap-2"
            >
              {Object.entries(categoryLabels).map(([category, label]) => (
                <ToggleGroupItem 
                  key={category} 
                  value={category}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Summary Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Proficiency</CardTitle>
                  <CardDescription>
                    {viewMode === "timeframe" ? "Combined skills assessment" : "Call skills assessment"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    // Calculate average skill value
                    const avgValue = Math.round(displayedSkills.reduce((sum, skill) => sum + skill.value, 0) / (displayedSkills.length || 1));
                    // Calculate average improvement
                    const avgImprovement = `+${Math.round(displayedSkills.reduce((sum, skill) => sum + parseInt(skill.improvement.replace('+', '').replace('%', '')), 0) / (displayedSkills.length || 1))}%`;
                    
                    return (
                      <>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{avgValue}%</div>
                        <Progress value={avgValue} className="h-2 mb-2" />
                        <p className="text-sm text-green-600 font-medium">{avgImprovement} from previous {viewMode === "timeframe" ? "period" : "call"}</p>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Most Improved</CardTitle>
                  <CardDescription>Skill with highest growth</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    // Find skill with highest improvement
                    const mostImprovedSkill = [...displayedSkills].sort((a, b) => {
                      return parseInt(b.improvement.replace('+', '').replace('%', '')) - 
                             parseInt(a.improvement.replace('+', '').replace('%', ''));
                    })[0] || displayedSkills[0];
                    
                    return mostImprovedSkill ? (
                      <>
                        <div className="text-2xl font-bold mb-1">{mostImprovedSkill.name}</div>
                        <div className="flex items-center justify-between mb-2">
                          <Progress value={mostImprovedSkill.value} className="h-2 flex-grow mr-2" />
                          <span className="text-green-600 font-medium">{mostImprovedSkill.improvement}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`bg-${getCategoryColor(mostImprovedSkill.category).replace('#', '')}/10 border-${getCategoryColor(mostImprovedSkill.category).replace('#', '')}/20`}
                          style={{
                            backgroundColor: `${getCategoryColor(mostImprovedSkill.category)}10`,
                            borderColor: `${getCategoryColor(mostImprovedSkill.category)}40`,
                            color: getCategoryColor(mostImprovedSkill.category)
                          }}
                        >
                          {categoryLabels[mostImprovedSkill.category]}
                        </Badge>
                      </>
                    ) : <p>No data available</p>;
                  })()}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Focus Area</CardTitle>
                  <CardDescription>Suggested skill to improve</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    // Find skill with lowest value
                    const focusAreaSkill = [...displayedSkills].sort((a, b) => a.value - b.value)[0] || displayedSkills[0];
                    
                    return focusAreaSkill ? (
                      <>
                        <div className="text-2xl font-bold mb-1">{focusAreaSkill.name}</div>
                        <div className="flex items-center justify-between mb-2">
                          <Progress value={focusAreaSkill.value} className="h-2 flex-grow mr-2" />
                          <span className="text-green-600 font-medium">{focusAreaSkill.improvement}</span>
                        </div>
                        <Badge 
                          variant="outline"
                          style={{
                            backgroundColor: `${getCategoryColor(focusAreaSkill.category)}10`,
                            borderColor: `${getCategoryColor(focusAreaSkill.category)}40`,
                            color: getCategoryColor(focusAreaSkill.category)
                          }}
                        >
                          {categoryLabels[focusAreaSkill.category]}
                        </Badge>
                      </>
                    ) : <p>No data available</p>;
                  })()}
                </CardContent>
              </Card>
            </div>
            
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Radar</CardTitle>
                <CardDescription>
                  {viewMode === "timeframe" 
                    ? "Visualize your skills progression across different areas" 
                    : "Skills assessment for this specific call"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Tooltip />
                      <Radar
                        name="Current Level"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(categoryLabels).map(([category, label]) => (
                    <Badge 
                      key={category}
                      variant="outline" 
                      className="flex items-center gap-1"
                      style={{
                        backgroundColor: `${getCategoryColor(category)}10`,
                        borderColor: `${getCategoryColor(category)}40`,
                        color: getCategoryColor(category)
                      }}
                    >
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getCategoryColor(category) }}
                      ></span>
                      {label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Individual Skills Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of each skill with improvement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {displayedSkills.map((skill) => (
                    <Card key={skill.name} className="overflow-hidden">
                      <div className="h-2" style={{ backgroundColor: getCategoryColor(skill.category) }}></div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{skill.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {skill.improvement}
                          </Badge>
                        </div>
                        <Progress value={skill.value} className="h-2 mb-2" />
                        <div className="flex justify-between items-center text-sm">
                          <span>{skill.value}%</span>
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{
                              backgroundColor: `${getCategoryColor(skill.category)}10`,
                              borderColor: `${getCategoryColor(skill.category)}40`,
                              color: getCategoryColor(skill.category)
                            }}
                          >
                            {categoryLabels[skill.category]}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsProgress;
