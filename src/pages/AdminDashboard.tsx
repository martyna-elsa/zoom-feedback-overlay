
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip, 
  Legend 
} from 'recharts';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Filter, Calendar, Users } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';

// Define skill categories
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

// Sample skills data
const skillsData = [
  { month: 'Jan', pronunciation: 65, grammar: 70, confidence: 60, comprehension: 72 },
  { month: 'Feb', pronunciation: 68, grammar: 72, confidence: 63, comprehension: 75 },
  { month: 'Mar', pronunciation: 72, grammar: 73, confidence: 68, comprehension: 78 },
  { month: 'Apr', pronunciation: 75, grammar: 76, confidence: 72, comprehension: 80 },
  { month: 'May', pronunciation: 78, grammar: 78, confidence: 75, comprehension: 82 },
];

// Sample learner performance data
const learnerPerformanceData = [
  { id: "1", name: "Emma Davis", team: "sales", progress: 94, improvement: "+15%", calls: 24, skills: { pronunciation: 92, grammar: 88, confidence: 96, comprehension: 91 } },
  { id: "2", name: "Michael Chen", team: "marketing", progress: 92, improvement: "+12%", calls: 18, skills: { pronunciation: 90, grammar: 94, confidence: 89, comprehension: 88 } },
  { id: "3", name: "Sarah Johnson", team: "sales", progress: 89, improvement: "+10%", calls: 22, skills: { pronunciation: 86, grammar: 92, confidence: 91, comprehension: 87 } },
  { id: "4", name: "James Wilson", team: "customer-support", progress: 87, improvement: "+8%", calls: 20, skills: { pronunciation: 85, grammar: 84, confidence: 90, comprehension: 89 } },
  { id: "5", name: "David Thompson", team: "engineering", progress: 85, improvement: "+9%", calls: 16, skills: { pronunciation: 82, grammar: 87, confidence: 86, comprehension: 84 } },
  { id: "6", name: "Lisa Rodriguez", team: "marketing", progress: 83, improvement: "+7%", calls: 19, skills: { pronunciation: 80, grammar: 85, confidence: 84, comprehension: 81 } },
  { id: "7", name: "Robert Kim", team: "engineering", progress: 81, improvement: "+11%", calls: 15, skills: { pronunciation: 78, grammar: 84, confidence: 82, comprehension: 80 } },
  { id: "8", name: "Jennifer Lee", team: "customer-support", progress: 80, improvement: "+6%", calls: 17, skills: { pronunciation: 78, grammar: 79, confidence: 82, comprehension: 80 } },
];

// Sample team performance data - aggregate of individual performances
const teamPerformanceData = teams.map(team => {
  const teamMembers = learnerPerformanceData.filter(learner => learner.team === team.id);
  const avgProgress = Math.round(teamMembers.reduce((sum, member) => sum + member.progress, 0) / teamMembers.length);
  const avgImprovement = `+${Math.round(teamMembers.reduce((sum, member) => sum + parseInt(member.improvement.replace('+', '').replace('%', '')), 0) / teamMembers.length)}%`;
  const totalCalls = teamMembers.reduce((sum, member) => sum + member.calls, 0);
  
  const avgSkills = {
    pronunciation: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.pronunciation, 0) / teamMembers.length),
    grammar: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.grammar, 0) / teamMembers.length),
    confidence: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.confidence, 0) / teamMembers.length),
    comprehension: Math.round(teamMembers.reduce((sum, member) => sum + member.skills.comprehension, 0) / teamMembers.length)
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
    confidence: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.confidence, 0) / learnerPerformanceData.length),
    comprehension: Math.round(learnerPerformanceData.reduce((sum, learner) => sum + learner.skills.comprehension, 0) / learnerPerformanceData.length)
  }
};

const chartConfig = {
  pronunciation: { label: 'Pronunciation', color: '#4f46e5' },
  grammar: { label: 'Grammar', color: '#0ea5e9' },
  confidence: { label: 'Confidence', color: '#10b981' },
  comprehension: { label: 'Comprehension', color: '#f59e0b' },
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

const AdminDashboard: React.FC = () => {
  const [viewFilter, setViewFilter] = useState<ViewFilter>("organization");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");
  const [selectedTeamId, setSelectedTeamId] = useState<string>(""); 
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("overview");
  
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

  // Transform data for radar chart
  const getRadarChartData = () => {
    if (!currentData) return [];
    return [
      { name: 'Pronunciation', value: currentData.skills.pronunciation, category: CATEGORIES.ENGLISH },
      { name: 'Grammar', value: currentData.skills.grammar, category: CATEGORIES.ENGLISH },
      { name: 'Confidence', value: currentData.skills.confidence, category: CATEGORIES.COMMUNICATION },
      { name: 'Comprehension', value: currentData.skills.comprehension, category: CATEGORIES.COMMUNICATION },
    ].filter(skill => selectedCategories.length === 0 || selectedCategories.includes(skill.category));
  };

  const radarChartData = getRadarChartData();

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
              <Label htmlFor="timeFrame" className="text-sm font-medium">Period:</Label>
              <Select value={timeFrame} onValueChange={(value: TimeFrame) => setTimeFrame(value)}>
                <SelectTrigger className="w-[140px]" id="timeFrame">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
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
                      {currentData.improvement} from previous {timeFrame}
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
                    <CardTitle className="text-lg">Total Calls</CardTitle>
                    <CardDescription>Practice sessions completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{currentData.calls}</div>
                    <Progress 
                      value={viewFilter === "organization" ? 100 : viewFilter === "team" ? 80 : 60} 
                      className="h-2 mb-2" 
                    />
                    <p className="text-sm text-green-600 font-medium">
                      {viewFilter === "organization" 
                        ? "+15% from previous period" 
                        : viewFilter === "team" 
                          ? "+12% from previous period" 
                          : "+8% from previous period"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Top Skill</CardTitle>
                    <CardDescription>Highest performing skill</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      // Find skill with highest value
                      const skills = currentData.skills;
                      const topSkillName = Object.entries(skills).reduce(
                        (max, [key, val]) => val > skills[max as keyof typeof skills] ? key : max, 
                        Object.keys(skills)[0]
                      );
                      const topSkillValue = skills[topSkillName as keyof typeof skills];
                      
                      const skillCategory = topSkillName === "pronunciation" || topSkillName === "grammar" 
                        ? CATEGORIES.ENGLISH 
                        : CATEGORIES.COMMUNICATION;
                      
                      return (
                        <>
                          <div className="text-2xl font-bold mb-1 capitalize">{topSkillName}</div>
                          <div className="flex items-center justify-between mb-2">
                            <Progress value={topSkillValue} className="h-2 flex-grow mr-2" />
                            <span>{topSkillValue}%</span>
                          </div>
                          <Badge 
                            variant="outline"
                            style={{
                              backgroundColor: `${getCategoryColor(skillCategory)}10`,
                              borderColor: `${getCategoryColor(skillCategory)}40`,
                              color: getCategoryColor(skillCategory)
                            }}
                          >
                            {categoryLabels[skillCategory]}
                          </Badge>
                        </>
                      );
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
            
            {/* Performance List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {viewFilter === "organization" ? "Team Performance" : "Learner Performance"}
                  </CardTitle>
                  <CardDescription>
                    {viewFilter === "organization" 
                      ? "Performance metrics by team" 
                      : viewFilter === "team" && selectedTeamId
                        ? `Performance metrics for ${teams.find(t => t.id === selectedTeamId)?.name} members` 
                        : "Individual learner performance metrics"}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox id="select-all" />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Improvement</TableHead>
                      <TableHead>Calls</TableHead>
                      {viewFilter === "organization" && <TableHead>Members</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceList.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox id={`select-${item.id}`} />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={item.progress} className="h-2 w-24" />
                            <span>{item.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600">{item.improvement}</TableCell>
                        <TableCell>{item.calls}</TableCell>
                        {viewFilter === "organization" && 'members' in item && (
                          <TableCell>{item.members}</TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Skills Development Over Time</CardTitle>
                <CardDescription>
                  Monthly progression across key skill areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={skillsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="pronunciation" stroke={chartConfig.pronunciation.color} strokeWidth={2} />
                      <Line type="monotone" dataKey="grammar" stroke={chartConfig.grammar.color} strokeWidth={2} />
                      <Line type="monotone" dataKey="confidence" stroke={chartConfig.confidence.color} strokeWidth={2} />
                      <Line type="monotone" dataKey="comprehension" stroke={chartConfig.comprehension.color} strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
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
