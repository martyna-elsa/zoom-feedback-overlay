
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

// Define skill categories
const CATEGORIES = {
  ENGLISH: "english-proficiency",
  SOFT: "soft-skills",
  COMMUNICATION: "communication-competency",
  ALL: "all"
};

// Sample data for radar chart
const radarData = [
  { name: "Pronunciation", value: 65, category: CATEGORIES.ENGLISH, improvement: "+15%" },
  { name: "Grammar", value: 68, category: CATEGORIES.ENGLISH, improvement: "+12%" },
  { name: "Vocabulary", value: 72, category: CATEGORIES.ENGLISH, improvement: "+8%" },
  { name: "Intonation", value: 55, category: CATEGORIES.ENGLISH, improvement: "+20%" },
  { name: "Fluency", value: 60, category: CATEGORIES.ENGLISH, improvement: "+10%" },
  { name: "Negotiation", value: 75, category: CATEGORIES.SOFT, improvement: "+5%" },
  { name: "Persuasion", value: 70, category: CATEGORIES.SOFT, improvement: "+15%" },
  { name: "Understanding", value: 80, category: CATEGORIES.COMMUNICATION, improvement: "+7%" },
  { name: "Confidence", value: 85, category: CATEGORIES.COMMUNICATION, improvement: "+25%" },
  { name: "Coherence", value: 78, category: CATEGORIES.COMMUNICATION, improvement: "+18%" }
];

// Category labels mapping
const categoryLabels = {
  [CATEGORIES.ENGLISH]: "English Proficiency",
  [CATEGORIES.SOFT]: "Soft Skills",
  [CATEGORIES.COMMUNICATION]: "Communication Competency",
  [CATEGORIES.ALL]: "All Categories"
};

// Color mapping for categories
const categoryColors = {
  [CATEGORIES.ENGLISH]: "blue",
  [CATEGORIES.SOFT]: "green",
  [CATEGORIES.COMMUNICATION]: "purple",
};

// Timeframe options
const timeframeOptions = [
  { label: "Last Day", value: "last-day" },
  { label: "Last Week", value: "last-week" },
  { label: "Last Month", value: "last-month" },
  { label: "Last Quarter", value: "last-quarter" },
];

// View options
const viewOptions = [
  { label: "Timeframe", value: "timeframe" },
  { label: "Specific Call", value: "specific-call" },
];

const SkillsProgress: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES.ALL);
  const [selectedTimeframe, setSelectedTimeframe] = useState("last-month");
  const [selectedView, setSelectedView] = useState("timeframe");
  
  // Filter skills by selected category
  const filteredSkills = selectedCategory === CATEGORIES.ALL 
    ? radarData 
    : radarData.filter(skill => skill.category === selectedCategory);

  // Calculate total proficiency score
  const totalProficiency = Math.round(
    filteredSkills.reduce((sum, item) => sum + item.value, 0) / filteredSkills.length
  );
  
  // Group skills by category for details view
  const skillsByCategory = radarData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof radarData>);
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold">Skills Progress</h1>
            
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">View:</span>
                <Select value={selectedView} onValueChange={setSelectedView}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    {viewOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Timeframe:</span>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-fit">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-8 overflow-x-auto">
            <ToggleGroup type="single" value={selectedCategory} onValueChange={(value) => setSelectedCategory(value || CATEGORIES.ALL)}>
              <ToggleGroupItem 
                value={CATEGORIES.ENGLISH}
                className={`${selectedCategory === CATEGORIES.ENGLISH ? "bg-blue-100" : ""} text-blue-700 hover:text-blue-900 hover:bg-blue-50 border-blue-200`}
              >
                English Proficiency
              </ToggleGroupItem>
              <ToggleGroupItem 
                value={CATEGORIES.SOFT}
                className={`${selectedCategory === CATEGORIES.SOFT ? "bg-green-100" : ""} text-green-700 hover:text-green-900 hover:bg-green-50 border-green-200`}
              >
                Soft Skills
              </ToggleGroupItem>
              <ToggleGroupItem 
                value={CATEGORIES.COMMUNICATION}
                className={`${selectedCategory === CATEGORIES.COMMUNICATION ? "bg-purple-100" : ""} text-purple-700 hover:text-purple-900 hover:bg-purple-50 border-purple-200`}
              >
                Communication Competency
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Overall Proficiency Card */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Overall Proficiency</h3>
                    <p className="text-sm text-gray-500 mb-4">Combined skills assessment</p>
                    
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-blue-600">{totalProficiency}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${totalProficiency}%` }}
                      />
                    </div>
                    
                    <p className="text-sm text-green-600">+14% from previous period</p>
                  </CardContent>
                </Card>
                
                {/* Most Improved Card */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Most Improved</h3>
                    <p className="text-sm text-gray-500 mb-4">Skill with highest growth</p>
                    
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold">Confidence</span>
                      <span className="ml-auto text-lg font-medium text-green-600">+25%</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ width: '85%' }}
                      />
                    </div>
                    
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      Communication Competency
                    </Badge>
                  </CardContent>
                </Card>
                
                {/* Focus Area Card */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Focus Area</h3>
                    <p className="text-sm text-gray-500 mb-4">Suggested skill to improve</p>
                    
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold">Intonation</span>
                      <span className="ml-auto text-lg font-medium text-green-600">+20%</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ width: '55%' }}
                      />
                    </div>
                    
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      English Proficiency
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Radar Section */}
              <Card className="shadow-sm mt-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-1">Skills Radar</h3>
                  <p className="text-sm text-gray-500 mb-6">Visualize your skills progression across different areas</p>
                  
                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={filteredSkills}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis 
                          dataKey="name" 
                          tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <PolarRadiusAxis 
                          angle={90}
                          domain={[0, 100]}
                          tick={{ fill: '#94a3b8' }}
                          axisLine={false}
                        />
                        <Radar
                          name="Skills"
                          dataKey="value"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {activeTab === 'details' && (
            <Card className="shadow-sm mt-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Individual Skills Analysis</h2>
                <p className="text-gray-600 mb-8">Detailed breakdown of each skill with improvement metrics</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredSkills.map((skill) => {
                    const categoryColor = 
                      skill.category === CATEGORIES.ENGLISH ? 'blue' : 
                      skill.category === CATEGORIES.SOFT ? 'green' : 'purple';
                    
                    return (
                      <div 
                        key={skill.name} 
                        className={`p-4 rounded-lg border border-${categoryColor}-100 bg-white`}
                      >
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-lg font-medium">{skill.name}</h3>
                          <span className="text-green-600 font-medium">{skill.improvement}</span>
                        </div>
                        
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                          <div 
                            className={`bg-${categoryColor}-600 h-2 rounded-full`}
                            style={{ width: `${skill.value}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between mt-1">
                          <span className="font-medium">{skill.value}%</span>
                          <Badge 
                            className={`bg-${categoryColor}-100 text-${categoryColor}-800 hover:bg-${categoryColor}-200`}
                          >
                            {categoryLabels[skill.category]}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
