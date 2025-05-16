
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Filter } from 'lucide-react';
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

  const displayedSkills = getDisplayedSkills(skills, selectedCategories);
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

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>
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

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Summary Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Proficiency</CardTitle>
                  <CardDescription>Combined skills assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">72%</div>
                  <Progress value={72} className="h-2 mb-2" />
                  <p className="text-sm text-green-600 font-medium">+12% from previous month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Most Improved</CardTitle>
                  <CardDescription>Skill with highest growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">Confidence</div>
                  <div className="flex items-center justify-between mb-2">
                    <Progress value={85} className="h-2 flex-grow mr-2" />
                    <span className="text-green-600 font-medium">+25%</span>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Communication Competency
                  </Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Focus Area</CardTitle>
                  <CardDescription>Suggested skill to improve</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">Intonation</div>
                  <div className="flex items-center justify-between mb-2">
                    <Progress value={55} className="h-2 flex-grow mr-2" />
                    <span className="text-green-600 font-medium">+20%</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    English Proficiency
                  </Badge>
                </CardContent>
              </Card>
            </div>
            
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Radar</CardTitle>
                <CardDescription>
                  Visualize your skills progression across different areas
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

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Skills History</CardTitle>
                <CardDescription>
                  Track your improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-10">
                  Historical data visualization will be available after multiple assessments.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsProgress;
