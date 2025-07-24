import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronDown, TrendingUp, Award, Handshake } from 'lucide-react';
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

// Sales skills insight data
const salesSkillsInsights = {
  negotiations: {
    title: "Negotiations",
    trend: "+8% improvement",
    description: "Your negotiation skills have improved significantly. You've demonstrated better value articulation and pricing discussions, leading to 12% higher close rates on competitive deals.",
    icon: TrendingUp,
    color: "text-emerald-600"
  },
  objectionHandling: {
    title: "Objection Handling",
    trend: "+15% improvement",
    description: "Notable improvement in addressing pricing concerns. Your listening-to-talking ratio has optimized to 65:35, leading to better customer sentiment scores.",
    icon: Handshake,
    color: "text-blue-600"
  },
  persuasionTechniques: {
    title: "Persuasion Techniques",
    trend: "+10% improvement",
    description: "Effective use of social proof and scarcity principles in your latest calls. Value-based selling approach has resulted in 18% higher average deal size.",
    icon: Award,
    color: "text-purple-600"
  }
};

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

// Sample calls data for specific call selection
const callOptions = [
  { label: "Product Demo - Enterprise Plan", value: "call-1", date: "May 15, 2025" },
  { label: "Pricing Negotiation - Mid-Market", value: "call-2", date: "May 12, 2025" },
  { label: "Feature Walkthrough - Small Business", value: "call-3", date: "May 8, 2025" },
  { label: "Annual Contract Renewal - Healthcare", value: "call-4", date: "May 3, 2025" },
  { label: "Technical Support Follow-up", value: "call-5", date: "April 28, 2025" },
];

const SkillsProgress: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES.ALL);
  const [selectedTimeframe, setSelectedTimeframe] = useState("last-month");
  const [selectedCall, setSelectedCall] = useState("call-1");
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

  // Handler for when view changes
  const handleViewChange = (value: string) => {
    setSelectedView(value);
    // Reset the selected option when switching views
    if (value === "timeframe") {
      setSelectedTimeframe("last-month");
    } else {
      setSelectedCall("call-1");
    }
  };
  
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
                <Select value={selectedView} onValueChange={handleViewChange}>
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
                <span className="text-sm text-gray-600 mr-2">
                  {selectedView === "timeframe" ? "Timeframe:" : "Call:"}
                </span>
                {selectedView === "timeframe" ? (
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
                ) : (
                  <Select value={selectedCall} onValueChange={setSelectedCall}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select call" />
                    </SelectTrigger>
                    <SelectContent>
                      {callOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-gray-500">{option.date}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
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
              {/* Summary Feedback Section */}
              <Card className="shadow-sm mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div>
                      <h4 className="text-md font-medium text-green-700 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Strengths
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                          <p className="text-sm text-green-800">
                            <strong>Exceptional listening skills:</strong> You demonstrate strong active listening, allowing customers to fully express concerns before responding. This builds trust and shows genuine interest in their needs.
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                          <p className="text-sm text-green-800">
                            <strong>Clear value articulation:</strong> You excel at connecting product features to specific customer benefits, making it easy for prospects to understand the ROI and business impact.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Areas for Improvement */}
                    <div>
                      <h4 className="text-md font-medium text-orange-700 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        Areas for Improvement
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                          <p className="text-sm text-orange-800">
                            <strong>Objection handling timing:</strong> Consider addressing objections earlier in conversations rather than waiting until the end. This prevents concerns from building up and shows proactive problem-solving.
                          </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                          <p className="text-sm text-orange-800">
                            <strong>Follow-up question depth:</strong> While you ask good initial questions, deeper follow-up questions could uncover additional pain points and create stronger urgency for your solution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                      {selectedCategory === CATEGORIES.COMMUNICATION ? (
                        <>
                          <span className="text-2xl font-bold">Understanding</span>
                          <span className="ml-auto text-lg font-medium text-green-600">+7%</span>
                        </>
                      ) : selectedCategory === CATEGORIES.ENGLISH ? (
                        <>
                          <span className="text-2xl font-bold">Pronunciation</span>
                          <span className="ml-auto text-lg font-medium text-green-600">+15%</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl font-bold">Negotiation</span>
                          <span className="ml-auto text-lg font-medium text-green-600">+5%</span>
                        </>
                      )}
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ width: selectedCategory === CATEGORIES.COMMUNICATION ? '80%' : selectedCategory === CATEGORIES.ENGLISH ? '65%' : '75%' }}
                      />
                    </div>
                    
                    {selectedCategory === CATEGORIES.COMMUNICATION ? (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Communication Competency
                      </Badge>
                    ) : selectedCategory === CATEGORIES.ENGLISH ? (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        English Proficiency
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Soft Skills
                      </Badge>
                    )}
                  </CardContent>
                </Card>
                
                {/* Focus Area Card */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Focus Area</h3>
                    <p className="text-sm text-gray-500 mb-4">Suggested skill to improve</p>
                    
                    <div className="flex items-baseline mb-2">
                      {selectedCategory === CATEGORIES.COMMUNICATION ? (
                        <>
                          <span className="text-2xl font-bold">Confidence</span>
                          <span className="ml-auto text-lg font-medium text-green-600">+25%</span>
                        </>
                      ) : selectedCategory === CATEGORIES.ENGLISH ? (
                        <>
                          <span className="text-2xl font-bold">Fluency</span>
                          <span className="ml-auto text-lg font-medium text-green-600">+10%</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl font-bold">Persuasion</span>
                          <span className="ml-auto text-lg font-medium text-green-600">+15%</span>
                        </>
                      )}
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ width: selectedCategory === CATEGORIES.COMMUNICATION ? '85%' : selectedCategory === CATEGORIES.ENGLISH ? '60%' : '70%' }}
                      />
                    </div>
                    
                    {selectedCategory === CATEGORIES.COMMUNICATION ? (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Communication Competency
                      </Badge>
                    ) : selectedCategory === CATEGORIES.ENGLISH ? (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        English Proficiency
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Soft Skills
                      </Badge>
                    )}
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
