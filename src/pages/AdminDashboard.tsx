
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Define skill categories - same as in SkillsProgress
const CATEGORIES = {
  ENGLISH: "english-proficiency",
  SOFT: "soft-skills",
  COMMUNICATION: "communication-competency"
};

// Define view filters
type ViewFilter = "organization" | "team" | "learner";
type TimeFrame = "week" | "month" | "quarter" | "year";

// Sample entities data
const teams = [
  { id: "sales", name: "Sales Team" },
  { id: "marketing", name: "Marketing Team" },
  { id: "customer-support", name: "Customer Support" },
  { id: "engineering", name: "Engineering" },
];

const learners = [
  { id: "1", name: "Emma Davis", team: "sales" },
  { id: "2", name: "Michael Chen", team: "marketing" },
  { id: "3", name: "Sarah Johnson", team: "sales" },
  { id: "4", name: "James Wilson", team: "customer-support" },
  { id: "5", name: "David Thompson", team: "engineering" },
  { id: "6", name: "Lisa Rodriguez", team: "marketing" },
  { id: "7", name: "Robert Kim", team: "engineering" },
  { id: "8", name: "Jennifer Lee", team: "customer-support" },
];

// Expanded learner performance data with more detailed skills
const learnerPerformanceData = [
  { 
    id: "1", 
    name: "Emma Davis", 
    team: "sales", 
    progress: 94, 
    improvement: "+15%", 
    calls: 24, 
    skills: { 
      pronunciation: 92, 
      grammar: 88, 
      vocabulary: 90, 
      intonation: 85, 
      fluency: 87, 
      negotiation: 96, 
      persuasion: 94, 
      understanding: 91, 
      confidence: 96, 
      coherence: 91 
    } 
  },
  { 
    id: "2", 
    name: "Michael Chen", 
    team: "marketing", 
    progress: 92, 
    improvement: "+12%", 
    calls: 18, 
    skills: { 
      pronunciation: 90, 
      grammar: 94, 
      vocabulary: 88, 
      intonation: 86, 
      fluency: 87, 
      negotiation: 89, 
      persuasion: 94, 
      understanding: 88, 
      confidence: 89, 
      coherence: 87 
    } 
  },
  { 
    id: "3", 
    name: "Sarah Johnson", 
    team: "sales", 
    progress: 89, 
    improvement: "+10%", 
    calls: 22, 
    skills: { 
      pronunciation: 86, 
      grammar: 92, 
      vocabulary: 87, 
      intonation: 84, 
      fluency: 85, 
      negotiation: 91, 
      persuasion: 90, 
      understanding: 89, 
      confidence: 91, 
      coherence: 88 
    } 
  },
  { 
    id: "4", 
    name: "James Wilson", 
    team: "customer-support", 
    progress: 87, 
    improvement: "+8%", 
    calls: 20, 
    skills: { 
      pronunciation: 85, 
      grammar: 84, 
      vocabulary: 83, 
      intonation: 80, 
      fluency: 81, 
      negotiation: 89, 
      persuasion: 88, 
      understanding: 89, 
      confidence: 89, 
      coherence: 88 
    } 
  },
  { 
    id: "5", 
    name: "David Thompson", 
    team: "engineering", 
    progress: 85, 
    improvement: "+9%", 
    calls: 16, 
    skills: { 
      pronunciation: 82, 
      grammar: 87, 
      vocabulary: 86, 
      intonation: 83, 
      fluency: 84, 
      negotiation: 86, 
      persuasion: 85, 
      understanding: 84, 
      confidence: 86, 
      coherence: 83 
    } 
  },
  { 
    id: "6", 
    name: "Lisa Rodriguez", 
    team: "marketing", 
    progress: 83, 
    improvement: "+7%", 
    calls: 19, 
    skills: { 
      pronunciation: 80, 
      grammar: 85, 
      vocabulary: 84, 
      intonation: 81, 
      fluency: 82, 
      negotiation: 84, 
      persuasion: 83, 
      understanding: 81, 
      confidence: 84, 
      coherence: 80 
    } 
  },
  { 
    id: "7", 
    name: "Robert Kim", 
    team: "engineering", 
    progress: 81, 
    improvement: "+11%", 
    calls: 15, 
    skills: { 
      pronunciation: 78, 
      grammar: 84, 
      vocabulary: 82, 
      intonation: 79, 
      fluency: 80, 
      negotiation: 82, 
      persuasion: 81, 
      understanding: 80, 
      confidence: 82, 
      coherence: 79 
    } 
  },
  { 
    id: "8", 
    name: "Jennifer Lee", 
    team: "customer-support", 
    progress: 80, 
    improvement: "+6%", 
    calls: 17, 
    skills: { 
      pronunciation: 78, 
      grammar: 79, 
      vocabulary: 78, 
      intonation: 76, 
      fluency: 77, 
      negotiation: 79, 
      persuasion: 78, 
      understanding: 78, 
      confidence: 80, 
      coherence: 77 
    } 
  },
];

// Team performance data - aggregate of individual performances
const teamPerformanceData = teams.map(team => {
  const teamMembers = learnerPerformanceData.filter(learner => learner.team === team.id);
  const avgProgress = Math.round(teamMembers.reduce((sum, member) => sum + member.progress, 0) / teamMembers.length);
  const avgImprovement = `+${Math.round(teamMembers.reduce((sum, member) => sum + parseInt(member.improvement.replace('+', '').replace('%', '')), 0) / teamMembers.length)}%`;
  const totalCalls = teamMembers.reduce((sum, member) => sum + member.calls, 0);
  
  const avgSkills = {
    pronunciation: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.pronunciation, 0) / teamMembers.length),
    grammar: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.grammar, 0) / teamMembers.length),
    vocabulary: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.vocabulary, 0) / teamMembers.length),
    intonation: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.intonation, 0) / teamMembers.length),
    fluency: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.fluency, 0) / teamMembers.length),
    negotiation: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.negotiation, 0) / teamMembers.length),
    persuasion: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.persuasion, 0) / teamMembers.length),
    understanding: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.understanding, 0) / teamMembers.length),
    confidence: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.confidence, 0) / teamMembers.length),
    coherence: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.coherence, 0) / teamMembers.length)
  };
  
  return {
    id: team.id,
    name: team.name,
    progress: avgProgress,
    improvement: avgImprovement,
    calls: totalCalls,
    skills: avgSkills,
    members: teamMembers.length
  };
});

// Calculate organization-wide performance
const orgPerformanceData = {
  progress: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.progress, 0) / learnerPerformanceData.length),
  improvement: `+${Math.round(learnerPerformanceData.reduce((sum, learner) => sum + parseInt(learner.improvement.replace('+', '').replace('%', '')), 0) / learnerPerformanceData.length)}%`,
  calls: learnerPerformanceData.reduce((sum, learner) => sum + learner.calls, 0),
  skills: {
    pronunciation: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.pronunciation, 0) / learnerPerformanceData.length),
    grammar: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.grammar, 0) / learnerPerformanceData.length),
    vocabulary: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.vocabulary, 0) / learnerPerformanceData.length),
    intonation: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.intonation, 0) / learnerPerformanceData.length),
    fluency: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.fluency, 0) / learnerPerformanceData.length),
    negotiation: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.negotiation, 0) / learnerPerformanceData.length),
    persuasion: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.persuasion, 0) / learnerPerformanceData.length),
    understanding: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.understanding, 0) / learnerPerformanceData.length),
    confidence: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.confidence, 0) / learnerPerformanceData.length),
    coherence: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.coherence, 0) / learnerPerformanceData.length)
  }
};

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

const categoryLabels: Record<string, string> = {
  [CATEGORIES.ENGLISH]: "English Proficiency",
  [CATEGORIES.SOFT]: "Soft Skills",
  [CATEGORIES.COMMUNICATION]: "Communication Competency"
};

const skillCategories: Record<string, string> = {
  pronunciation: CATEGORIES.ENGLISH,
  grammar: CATEGORIES.ENGLISH,
  vocabulary: CATEGORIES.ENGLISH,
  intonation: CATEGORIES.ENGLISH,
  fluency: CATEGORIES.ENGLISH,
  negotiation: CATEGORIES.SOFT,
  persuasion: CATEGORIES.SOFT,
  understanding: CATEGORIES.COMMUNICATION,
  confidence: CATEGORIES.COMMUNICATION,
  coherence: CATEGORIES.COMMUNICATION
};

const AdminDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("last-month");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"timeframe" | "call">("timeframe");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("organization");
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>("");

  // Determine which data to show based on filters
  const getCurrentData = () => {
    if (viewFilter === "learner" && selectedLearnerId) {
      return learnerPerformanceData.find(learner => learner.id === selectedLearnerId) || null;
    } else if (viewFilter === "team" && selectedTeamId) {
      return teamPerformanceData.find(team => team.id === selectedTeamId) || null;
    } else {
      return orgPerformanceData;
    }
  };

  const currentData = getCurrentData();
  
  // Transform data for radar chart, filtered by selected categories
  const getRadarChartData = () => {
    if (!currentData) return [];
    
    return Object.entries(currentData.skills).map(([skill, value]) => ({
      name: skill.charAt(0).toUpperCase() + skill.slice(1),
      value: value,
      category: skillCategories[skill] || CATEGORIES.ENGLISH
    })).filter(skill => 
      selectedCategories.length === 0 || 
      selectedCategories.includes(skill.category)
    );
  };

  const radarChartData = getRadarChartData();

  // Get displayed skills based on selected categories
  const getDisplayedSkills = () => {
    if (!currentData) return [];
    
    return Object.entries(currentData.skills)
      .map(([name, value]) => ({
        name,
        value,
        improvement: "+10%", // Sample improvement
        category: skillCategories[name] || CATEGORIES.ENGLISH,
      }))
      .filter(skill => 
        selectedCategories.length === 0 || 
        selectedCategories.includes(skill.category)
      );
  };

  const displayedSkills = getDisplayedSkills();

  // Get relevant performance list based on current view
  const getPerformanceList = () => {
    if (viewFilter === "organization") {
      return teamPerformanceData; // Show teams when viewing organization
    } else if (viewFilter === "team" && selectedTeamId) {
      return learnerPerformanceData.filter(learner => learner.team === selectedTeamId); // Show learners in selected team
    }
    return learnerPerformanceData; // Default to all learners
  };

  const performanceList = getPerformanceList();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organization Performance</h1>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="viewFilter" className="text-sm font-medium">View By:</Label>
              <Select value={viewFilter} onValueChange={(value: ViewFilter) => {
                setViewFilter(value);
                // Reset selections when changing view
                setSelectedTeamId("");
                setSelectedLearnerId("");
              }}>
                <SelectTrigger className="w-[160px]" id="viewFilter">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="learner">Individual Learner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewFilter === "team" && (
              <div className="flex items-center gap-2">
                <Label htmlFor="teamSelect" className="text-sm font-medium">Team:</Label>
                <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                  <SelectTrigger className="w-[180px]" id="teamSelect">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {viewFilter === "learner" && (
              <div className="flex items-center gap-2">
                <Label htmlFor="learnerSelect" className="text-sm font-medium">Learner:</Label>
                <Select value={selectedLearnerId} onValueChange={setSelectedLearnerId}>
                  <SelectTrigger className="w-[200px]" id="learnerSelect">
                    <SelectValue placeholder="Select learner" />
                  </SelectTrigger>
                  <SelectContent>
                    {learners.map(learner => (
                      <SelectItem key={learner.id} value={learner.id}>
                        {learner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
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
          </div>
        </div>

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
            {currentData && (
              <div className="grid gap-6 md:grid-cols-3">
                {/* Summary Cards */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Overall Proficiency</CardTitle>
                    <CardDescription>
                      {viewFilter === "organization" 
                        ? "Organization-wide assessment" 
                        : viewFilter === "team" 
                          ? "Team performance assessment" 
                          : "Individual performance assessment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{currentData.progress}%</div>
                    <Progress value={currentData.progress} className="h-2 mb-2" />
                    <p className="text-sm text-green-600 font-medium">
                      {currentData.improvement} from previous {selectedTimeframe.replace('last-', '')}
                    </p>
                    {viewFilter === "organization" && (
                      <p className="text-xs text-gray-500 mt-2">
                        Based on {learnerPerformanceData.length} learners across {teams.length} teams
                      </p>
                    )}
                    {viewFilter === "team" && selectedTeamId && (
                      <p className="text-xs text-gray-500 mt-2">
                        Based on {learnerPerformanceData.filter(l => l.team === selectedTeamId).length} team members
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Most Improved</CardTitle>
                    <CardDescription>Skill with highest growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      // Sample "most improved" skill - in a real app this would be calculated
                      const mostImprovedSkill = displayedSkills[0];
                      
                      return mostImprovedSkill ? (
                        <>
                          <div className="text-2xl font-bold mb-1 capitalize">{mostImprovedSkill.name}</div>
                          <div className="flex items-center justify-between mb-2">
                            <Progress value={mostImprovedSkill.value} className="h-2 flex-grow mr-2" />
                            <span className="text-green-600 font-medium">{mostImprovedSkill.improvement}</span>
                          </div>
                          <Badge 
                            variant="outline"
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
                          <div className="text-2xl font-bold mb-1 capitalize">{focusAreaSkill.name}</div>
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
            )}
            
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Radar</CardTitle>
                <CardDescription>
                  {viewFilter === "organization" 
                    ? "Organization-wide skills assessment" 
                    : viewFilter === "team" && selectedTeamId
                      ? `${teams.find(t => t.id === selectedTeamId)?.name} skills assessment` 
                      : viewFilter === "learner" && selectedLearnerId
                        ? `${learners.find(l => l.id === selectedLearnerId)?.name}'s skills assessment`
                        : "Skills assessment"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
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
                          <h3 className="font-medium capitalize">{skill.name}</h3>
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

export default AdminDashboard;
