import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from 'recharts';

// Define skill categories
const CATEGORIES = {
  ENGLISH: "english-proficiency",
  SOFT: "soft-skills",
  COMMUNICATION: "communication-competency"
};

// Sample data for radar chart
const radarData = [
  { name: "Pronunciation", value: 78, category: CATEGORIES.ENGLISH },
  { name: "Grammar", value: 78, category: CATEGORIES.ENGLISH },
  { name: "Vocabulary", value: 80, category: CATEGORIES.ENGLISH },
  { name: "Intonation", value: 74, category: CATEGORIES.ENGLISH },
  { name: "Fluency", value: 77, category: CATEGORIES.ENGLISH },
  { name: "Negotiation", value: 81, category: CATEGORIES.SOFT },
  { name: "Persuasion", value: 78, category: CATEGORIES.SOFT },
  { name: "Understanding", value: 84, category: CATEGORIES.COMMUNICATION },
  { name: "Confidence", value: 75, category: CATEGORIES.COMMUNICATION },
  { name: "Coherence", value: 80, category: CATEGORIES.COMMUNICATION }
];

// Category labels mapping
const categoryLabels = {
  [CATEGORIES.ENGLISH]: "English Proficiency",
  [CATEGORIES.SOFT]: "Soft Skills",
  [CATEGORIES.COMMUNICATION]: "Communication Competency"
};

const SkillsProgress: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Calculate total proficiency score
  const totalProficiency = Math.round(
    radarData.reduce((sum, item) => sum + item.value, 0) / radarData.length
  );
  
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
                <Button variant="outline" className="flex items-center gap-2">
                  Timeframe
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </Button>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Timeframe:</span>
                <Button variant="outline" className="flex items-center gap-2">
                  Last Month
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-fit">
            <TabsList>
              <TabsTrigger 
                value="overview"
                onClick={() => setActiveTab('overview')}
                className={activeTab === 'overview' ? 'bg-background' : ''}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                onClick={() => setActiveTab('details')}
                className={activeTab === 'details' ? 'bg-background' : ''}
              >
                Details
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-center space-x-6 mb-8">
            <Button 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              English Proficiency
            </Button>
            <Button 
              variant="ghost" 
              className="text-green-600 hover:text-green-800 hover:bg-green-50"
            >
              Soft Skills
            </Button>
            <Button 
              variant="ghost" 
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
            >
              Communication Competency
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Proficiency Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Overall Proficiency</h3>
                <p className="text-sm text-gray-500 mb-4">Combined skills assessment</p>
                
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-blue-600">71%</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: '71%' }}
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
                    style={{ width: '75%' }}
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
                    style={{ width: '70%' }}
                  />
                </div>
                
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  English Proficiency
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Skills Radar Section */}
        <Card className="shadow-sm mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-1">Skills Radar</h3>
            <p className="text-sm text-gray-500 mb-6">Visualize your skills progression across different areas</p>
            
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={radarData}>
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
      </div>
    </div>
  );
};

export default SkillsProgress;
