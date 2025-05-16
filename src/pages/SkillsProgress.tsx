import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeft, TrendingUp, Calendar } from 'lucide-react';

// Sample data for the skills progress over time
const skillsProgressData = [
  { 
    date: 'Jan 10', 
    // English proficiency
    pronunciation: 65, 
    grammar: 70, 
    vocabulary: 67,
    intonation: 63,
    fluency: 55, 
    // Soft skills
    negotiation: 60, 
    persuasion: 55, 
    // Communication competency
    understanding: 72, 
    confidence: 58, 
    coherence: 68 
  },
  { 
    date: 'Jan 24', 
    // English proficiency
    pronunciation: 68, 
    grammar: 73, 
    vocabulary: 70,
    intonation: 67,
    fluency: 60, 
    // Soft skills
    negotiation: 65, 
    persuasion: 60, 
    // Communication competency
    understanding: 75, 
    confidence: 63, 
    coherence: 70 
  },
  { 
    date: 'Feb 7', 
    // English proficiency
    pronunciation: 72, 
    grammar: 78, 
    vocabulary: 75,
    intonation: 70,
    fluency: 67, 
    // Soft skills
    negotiation: 68, 
    persuasion: 65, 
    // Communication competency
    understanding: 80, 
    confidence: 70, 
    coherence: 73 
  },
  { 
    date: 'Feb 21', 
    // English proficiency
    pronunciation: 75, 
    grammar: 80, 
    vocabulary: 78,
    intonation: 74,
    fluency: 72, 
    // Soft skills
    negotiation: 70, 
    persuasion: 68, 
    // Communication competency
    understanding: 83, 
    confidence: 75, 
    coherence: 76 
  },
  { 
    date: 'Mar 7', 
    // English proficiency
    pronunciation: 78, 
    grammar: 82, 
    vocabulary: 80,
    intonation: 77,
    fluency: 78, 
    // Soft skills
    negotiation: 74, 
    persuasion: 70, 
    // Communication competency
    understanding: 85, 
    confidence: 80, 
    coherence: 79 
  },
  { 
    date: 'Mar 21', 
    // English proficiency
    pronunciation: 80, 
    grammar: 85, 
    vocabulary: 83,
    intonation: 81,
    fluency: 81, 
    // Soft skills
    negotiation: 76, 
    persuasion: 72, 
    // Communication competency
    understanding: 88, 
    confidence: 83, 
    coherence: 82 
  },
  { 
    date: 'Apr 4', 
    // English proficiency
    pronunciation: 82, 
    grammar: 87, 
    vocabulary: 85,
    intonation: 83,
    fluency: 84, 
    // Soft skills
    negotiation: 78, 
    persuasion: 75, 
    // Communication competency
    understanding: 90, 
    confidence: 86, 
    coherence: 84 
  },
  { 
    date: 'Apr 18', 
    // English proficiency
    pronunciation: 85, 
    grammar: 90, 
    vocabulary: 88,
    intonation: 86,
    fluency: 87, 
    // Soft skills
    negotiation: 82, 
    persuasion: 78, 
    // Communication competency
    understanding: 95, 
    confidence: 88, 
    coherence: 88 
  },
];

// Sample historical call data with performance
const historicalCalls = [
  {
    id: 1,
    date: '2025-05-15',
    topic: 'Product Demo - Enterprise Plan',
    skills: [
      // English proficiency
      { name: 'Pronunciation', value: 85, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Grammar', value: 90, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Vocabulary', value: 88, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Intonation', value: 86, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Fluency', value: 87, improvement: '+3%', category: 'English Proficiency' },
      // Soft skills
      { name: 'Negotiation Skills', value: 82, improvement: '+4%', category: 'Soft Skills' },
      { name: 'Persuasion', value: 78, improvement: '+3%', category: 'Soft Skills' },
      // Communication competency
      { name: 'Understanding', value: 95, improvement: '+5%', category: 'Communication Competency' },
      { name: 'Confidence', value: 88, improvement: '+2%', category: 'Communication Competency' },
      { name: 'Coherence', value: 88, improvement: '+4%', category: 'Communication Competency' },
    ],
    progressData: [
      { date: 'Apr 4', pronunciation: 82, grammar: 87, negotiation: 78, persuasion: 75, understanding: 90, confidence: 86, fluency: 84, coherence: 84 },
      { date: 'Apr 11', pronunciation: 83, grammar: 88, negotiation: 79, persuasion: 76, understanding: 92, confidence: 87, fluency: 85, coherence: 86 },
      { date: 'Apr 18', pronunciation: 85, grammar: 90, negotiation: 82, persuasion: 78, understanding: 95, confidence: 88, fluency: 87, coherence: 88 },
    ]
  },
  {
    id: 2,
    date: '2025-05-12',
    topic: 'Pricing Negotiation - Mid-Market Segment',
    skills: [
      // English proficiency
      { name: 'Pronunciation', value: 82, improvement: '+2%', category: 'English Proficiency' },
      { name: 'Grammar', value: 85, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Vocabulary', value: 83, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Intonation', value: 80, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Fluency', value: 80, improvement: '+6%', category: 'English Proficiency' },
      // Soft skills
      { name: 'Negotiation Skills', value: 87, improvement: '+9%', category: 'Soft Skills' },
      { name: 'Persuasion', value: 80, improvement: '+5%', category: 'Soft Skills' },
      // Communication competency
      { name: 'Understanding', value: 88, improvement: '+3%', category: 'Communication Competency' },
      { name: 'Confidence', value: 83, improvement: '+5%', category: 'Communication Competency' },
      { name: 'Coherence', value: 82, improvement: '+4%', category: 'Communication Competency' },
    ],
    progressData: [
      { date: 'Mar 21', pronunciation: 80, grammar: 83, negotiation: 78, persuasion: 75, understanding: 85, confidence: 78, fluency: 74, coherence: 78 },
      { date: 'Apr 4', pronunciation: 81, grammar: 84, negotiation: 82, persuasion: 77, understanding: 86, confidence: 80, fluency: 77, coherence: 80 },
      { date: 'Apr 18', pronunciation: 82, grammar: 85, negotiation: 87, persuasion: 80, understanding: 88, confidence: 83, fluency: 80, coherence: 82 },
    ]
  },
  {
    id: 3,
    date: '2025-05-08',
    topic: 'Feature Walkthrough - Small Business',
    skills: [
      // English proficiency
      { name: 'Pronunciation', value: 80, improvement: '+2%', category: 'English Proficiency' },
      { name: 'Grammar', value: 82, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Vocabulary', value: 80, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Intonation', value: 78, improvement: '+3%', category: 'English Proficiency' },
      { name: 'Fluency', value: 83, improvement: '+5%', category: 'English Proficiency' },
      // Soft skills
      { name: 'Negotiation Skills', value: 74, improvement: '+4%', category: 'Soft Skills' },
      { name: 'Persuasion', value: 72, improvement: '+2%', category: 'Soft Skills' },
      // Communication competency
      { name: 'Understanding', value: 90, improvement: '+5%', category: 'Communication Competency' },
      { name: 'Confidence', value: 84, improvement: '+6%', category: 'Communication Competency' },
      { name: 'Coherence', value: 80, improvement: '+4%', category: 'Communication Competency' },
    ],
    progressData: [
      { date: 'Feb 21', pronunciation: 78, grammar: 79, negotiation: 70, persuasion: 70, understanding: 85, confidence: 78, fluency: 78, coherence: 76 },
      { date: 'Mar 7', pronunciation: 79, grammar: 80, negotiation: 72, persuasion: 70, understanding: 87, confidence: 81, fluency: 80, coherence: 78 },
      { date: 'Mar 21', pronunciation: 80, grammar: 82, negotiation: 74, persuasion: 72, understanding: 90, confidence: 84, fluency: 83, coherence: 80 },
    ]
  }
];

// Current skills assessment
const currentSkills = [
  // English proficiency
  { name: 'Pronunciation', value: 85, improvement: '+20%', color: 'bg-blue-600', category: 'English Proficiency' },
  { name: 'Grammar', value: 90, improvement: '+20%', color: 'bg-green-600', category: 'English Proficiency' },
  { name: 'Vocabulary', value: 88, improvement: '+18%', color: 'bg-emerald-600', category: 'English Proficiency' },
  { name: 'Intonation', value: 86, improvement: '+15%', color: 'bg-teal-600', category: 'English Proficiency' },
  { name: 'Fluency', value: 87, improvement: '+32%', color: 'bg-violet-600', category: 'English Proficiency' },
  // Soft skills
  { name: 'Negotiation Skills', value: 82, improvement: '+22%', color: 'bg-amber-600', category: 'Soft Skills' },
  { name: 'Persuasion', value: 78, improvement: '+23%', color: 'bg-pink-600', category: 'Soft Skills' },
  // Communication competency
  { name: 'Understanding', value: 95, improvement: '+23%', color: 'bg-indigo-600', category: 'Communication Competency' },
  { name: 'Confidence', value: 88, improvement: '+30%', color: 'bg-purple-600', category: 'Communication Competency' },
  { name: 'Coherence', value: 88, improvement: '+18%', color: 'bg-cyan-600', category: 'Communication Competency' },
];

const chartConfig = {
  // English proficiency
  pronunciation: { 
    label: 'Pronunciation',
    color: '#3b82f6', // blue-500
    category: 'English Proficiency'
  },
  grammar: { 
    label: 'Grammar',
    color: '#10b981', // green-500
    category: 'English Proficiency'
  },
  vocabulary: {
    label: 'Vocabulary',
    color: '#059669', // emerald-600
    category: 'English Proficiency'
  },
  intonation: {
    label: 'Intonation',
    color: '#0d9488', // teal-600
    category: 'English Proficiency'
  },
  fluency: {
    label: 'Fluency',
    color: '#7c3aed', // violet-600
    category: 'English Proficiency'
  },
  // Soft skills
  negotiation: { 
    label: 'Negotiation',
    color: '#f59e0b', // amber-500
    category: 'Soft Skills'
  },
  persuasion: { 
    label: 'Persuasion',
    color: '#ec4899', // pink-500
    category: 'Soft Skills'
  },
  // Communication competency
  understanding: { 
    label: 'Understanding',
    color: '#6366f1', // indigo-500
    category: 'Communication Competency'
  },
  confidence: {
    label: 'Confidence',
    color: '#8b5cf6', // purple-500
    category: 'Communication Competency'
  },
  coherence: {
    label: 'Coherence',
    color: '#06b6d4', // cyan-500
    category: 'Communication Competency'
  }
};

const SkillsProgress = () => {
  const [selectedCallId, setSelectedCallId] = useState<number | null>(null);
  const [viewingHistorical, setViewingHistorical] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter data based on selection
  const selectedCall = historicalCalls.find(call => call.id === selectedCallId);
  const displayData = viewingHistorical && selectedCall 
    ? selectedCall.progressData 
    : skillsProgressData;
  
  const displaySkills = viewingHistorical && selectedCall 
    ? selectedCall.skills 
    : currentSkills;

  // Group skills by category
  const skillsByCategory = displaySkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof displaySkills>);

  const handleCallSelect = (value: string) => {
    const id = parseInt(value);
    setSelectedCallId(id);
    setViewingHistorical(true);
    setSelectedCategory(null);
  };

  const handleViewLatest = () => {
    setSelectedCallId(null);
    setViewingHistorical(false);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Filter chart skills by category
  const getFilteredSkills = () => {
    if (!selectedCategory) return Object.keys(chartConfig);
    
    return Object.entries(chartConfig)
      .filter(([_, config]) => config.category === selectedCategory)
      .map(([key]) => key);
  };

  const filteredSkillKeys = getFilteredSkills();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Skills Performance Progress</h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Back to Call
            </Button>
          </Link>
        </div>
        
        {/* Call Selection Area */}
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                Select Call for Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-full md:w-64">
                  <Select onValueChange={handleCallSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a call" />
                    </SelectTrigger>
                    <SelectContent>
                      {historicalCalls.map((call) => (
                        <SelectItem key={call.id} value={call.id.toString()}>
                          {call.date} - {call.topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleViewLatest}
                  className={!viewingHistorical ? "bg-blue-50" : ""}
                >
                  Current Performance
                </Button>
                <Link to="/call-history" className="ml-auto">
                  <Button variant="outline" className="flex items-center gap-2">
                    View All Call History
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {viewingHistorical && selectedCall && (
          <div className="mb-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800">
                {selectedCall.date} - {selectedCall.topic}
              </h2>
              <p className="text-sm text-blue-700">
                Showing performance data for the selected call
              </p>
            </div>
          </div>
        )}

        {/* Category filters */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Filter by Skill Category</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategorySelect(null)}
              >
                All Skills
              </Button>
              {Object.keys(skillsByCategory).map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Skills Progress Over Time
                {selectedCategory && <span className="text-sm font-normal text-gray-500 ml-2">({selectedCategory})</span>}
              </CardTitle>
              <CardDescription>
                Track your improvement in key communication metrics 
                {viewingHistorical && selectedCall 
                  ? ` for the ${selectedCall.topic} call` 
                  : ' over the last 3 months'}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <LineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[50, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  {filteredSkillKeys.includes('pronunciation') && (
                    <Line 
                      type="monotone" 
                      dataKey="pronunciation" 
                      stroke={chartConfig.pronunciation.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('grammar') && (
                    <Line 
                      type="monotone" 
                      dataKey="grammar" 
                      stroke={chartConfig.grammar.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('vocabulary') && (
                    <Line 
                      type="monotone" 
                      dataKey="vocabulary" 
                      stroke={chartConfig.vocabulary.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('intonation') && (
                    <Line 
                      type="monotone" 
                      dataKey="intonation" 
                      stroke={chartConfig.intonation.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('negotiation') && (
                    <Line 
                      type="monotone" 
                      dataKey="negotiation" 
                      stroke={chartConfig.negotiation.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('persuasion') && (
                    <Line 
                      type="monotone" 
                      dataKey="persuasion" 
                      stroke={chartConfig.persuasion.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('understanding') && (
                    <Line 
                      type="monotone" 
                      dataKey="understanding" 
                      stroke={chartConfig.understanding.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('confidence') && (
                    <Line 
                      type="monotone" 
                      dataKey="confidence" 
                      stroke={chartConfig.confidence.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('coherence') && (
                    <Line 
                      type="monotone" 
                      dataKey="coherence" 
                      stroke={chartConfig.coherence.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                  {filteredSkillKeys.includes('fluency') && (
                    <Line 
                      type="monotone" 
                      dataKey="fluency" 
                      stroke={chartConfig.fluency.color} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  )}
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {viewingHistorical && selectedCall 
                  ? `${selectedCall.date} Assessment` 
                  : 'Latest Assessment'}
                {selectedCategory && <span className="text-sm font-normal text-gray-500 ml-2">({selectedCategory})</span>}
              </CardTitle>
              <CardDescription>
                {viewingHistorical && selectedCall 
                  ? `Performance in ${selectedCall.topic}` 
                  : 'Your performance in today\'s sales call'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  (!selectedCategory || selectedCategory === category) && (
                    <div key={category} className="space-y-4">
                      <h3 className="text-md font-semibold text-gray-700">{category}</h3>
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm font-medium text-green-600">{skill.improvement}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={skill.value} className={`h-2 ${skill.color}`} />
                            <span className="text-sm font-semibold">{skill.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {viewingHistorical && selectedCall ? 'Call Performance' : 'Today\'s Performance'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {viewingHistorical && selectedCall 
                  ? Math.round(selectedCall.skills.reduce((acc, curr) => acc + curr.value, 0) / selectedCall.skills.length) + '%'
                  : '87%'}
              </div>
              <p className="text-sm text-gray-500">Overall skills effectiveness</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Strongest Skill</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedCategory ? (
                <>
                  <div className="text-3xl font-bold text-indigo-600">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills.reduce((max, skill) => max.value > skill.value ? max : skill, selectedCall.skills[0]).name
                      : 'Understanding'}
                  </div>
                  <p className="text-sm text-gray-500">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills.reduce((max, skill) => max.value > skill.value ? max : skill, selectedCall.skills[0]).value + '% proficiency'
                      : '95% proficiency'}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-indigo-600">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => max.value > skill.value ? max : skill, selectedCall.skills.filter(skill => skill.category === selectedCategory)[0]).name
                      : displaySkills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => max.value > skill.value ? max : skill, displaySkills.filter(skill => skill.category === selectedCategory)[0]).name}
                  </div>
                  <p className="text-sm text-gray-500">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => max.value > skill.value ? max : skill, selectedCall.skills.filter(skill => skill.category === selectedCategory)[0]).value + '% proficiency'
                      : displaySkills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => max.value > skill.value ? max : skill, displaySkills.filter(skill => skill.category === selectedCategory)[0]).value + '% proficiency'}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Most Improved</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedCategory ? (
                <>
                  <div className="text-3xl font-bold text-violet-600">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills.reduce((max, skill) => {
                          const improvementValue = parseInt(max.improvement.replace('+', '').replace('%', ''));
                          const currentImprovement = parseInt(skill.improvement.replace('+', '').replace('%', ''));
                          return improvementValue > currentImprovement ? max : skill;
                        }, selectedCall.skills[0]).name
                      : 'Fluency'}
                  </div>
                  <p className="text-sm text-gray-500">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills.reduce((max, skill) => {
                          const improvementValue = parseInt(max.improvement.replace('+', '').replace('%', ''));
                          const currentImprovement = parseInt(skill.improvement.replace('+', '').replace('%', ''));
                          return improvementValue > currentImprovement ? max : skill;
                        }, selectedCall.skills[0]).improvement + ' improvement'
                      : '+32% improvement'}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-violet-600">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => {
                            const improvementValue = parseInt(max.improvement.replace('+', '').replace('%', ''));
                            const currentImprovement = parseInt(skill.improvement.replace('+', '').replace('%', ''));
                            return improvementValue > currentImprovement ? max : skill;
                          }, selectedCall.skills.filter(skill => skill.category === selectedCategory)[0]).name
                      : displaySkills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => {
                            const improvementValue = parseInt(max.improvement.replace('+', '').replace('%', ''));
                            const currentImprovement = parseInt(skill.improvement.replace('+', '').replace('%', ''));
                            return improvementValue > currentImprovement ? max : skill;
                          }, displaySkills.filter(skill => skill.category === selectedCategory)[0]).name}
                  </div>
                  <p className="text-sm text-gray-500">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => {
                            const improvementValue = parseInt(max.improvement.replace('+', '').replace('%', ''));
                            const currentImprovement = parseInt(skill.improvement.replace('+', '').replace('%', ''));
                            return improvementValue > currentImprovement ? max : skill;
                          }, selectedCall.skills.filter(skill => skill.category === selectedCategory)[0]).improvement + ' improvement'
                      : displaySkills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((max, skill) => {
                            const improvementValue = parseInt(max.improvement.replace('+', '').replace('%', ''));
                            const currentImprovement = parseInt(skill.improvement.replace('+', '').replace('%', ''));
                            return improvementValue > currentImprovement ? max : skill;
                          }, displaySkills.filter(skill => skill.category === selectedCategory)[0]).improvement + ' improvement'}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Focus Area</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedCategory ? (
                <>
                  <div className="text-3xl font-bold text-pink-600">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills.reduce((min, skill) => min.value < skill.value ? min : skill, selectedCall.skills[0]).name
                      : 'Persuasion'}
                  </div>
                  <p className="text-sm text-gray-500">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills.reduce((min, skill) => min.value < skill.value ? min : skill, selectedCall.skills[0]).value + '% - Practice needed'
                      : '78% - Practice needed'}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-pink-600">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((min, skill) => min.value < skill.value ? min : skill, selectedCall.skills.filter(skill => skill.category === selectedCategory)[0]).name
                      : displaySkills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((min, skill) => min.value < skill.value ? min : skill, displaySkills.filter(skill => skill.category === selectedCategory)[0]).name}
                  </div>
                  <p className="text-sm text-gray-500">
                    {viewingHistorical && selectedCall 
                      ? selectedCall.skills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((min, skill) => min.value < skill.value ? min : skill, selectedCall.skills.filter(skill => skill.category === selectedCategory)[0]).value + '% - Practice needed'
                      : displaySkills
                          .filter(skill => skill.category === selectedCategory)
                          .reduce((min, skill) => min.value < skill.value ? min : skill, displaySkills.filter(skill => skill.category === selectedCategory)[0]).value + '% - Practice needed'}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pagination for navigating between calls */}
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => {
                  e.preventDefault();
                  if (selectedCallId && selectedCallId > 1) {
                    setSelectedCallId(selectedCallId - 1);
                    setViewingHistorical(true);
                  }
                }} />
              </PaginationItem>
              {historicalCalls.map(call => (
                <PaginationItem key={call.id}>
                  <PaginationLink 
                    href="#" 
                    isActive={selectedCallId === call.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCallId(call.id);
                      setViewingHistorical(true);
                    }}
                  >
                    {call.id}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => {
                  e.preventDefault();
                  if (selectedCallId && selectedCallId < historicalCalls.length) {
                    setSelectedCallId(selectedCallId + 1);
                    setViewingHistorical(true);
                  }
                }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
