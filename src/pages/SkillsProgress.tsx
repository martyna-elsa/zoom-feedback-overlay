
import React from 'react';
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
import { ChevronLeft, TrendingUp } from 'lucide-react';

// Sample data for the skills progress over time
const skillsProgressData = [
  { date: 'Jan 10', pronunciation: 65, grammar: 70, negotiation: 60, persuasion: 55, understanding: 72 },
  { date: 'Jan 24', pronunciation: 68, grammar: 73, negotiation: 65, persuasion: 60, understanding: 75 },
  { date: 'Feb 7', pronunciation: 72, grammar: 78, negotiation: 68, persuasion: 65, understanding: 80 },
  { date: 'Feb 21', pronunciation: 75, grammar: 80, negotiation: 70, persuasion: 68, understanding: 83 },
  { date: 'Mar 7', pronunciation: 78, grammar: 82, negotiation: 74, persuasion: 70, understanding: 85 },
  { date: 'Mar 21', pronunciation: 80, grammar: 85, negotiation: 76, persuasion: 72, understanding: 88 },
  { date: 'Apr 4', pronunciation: 82, grammar: 87, negotiation: 78, persuasion: 75, understanding: 90 },
  { date: 'Apr 18', pronunciation: 85, grammar: 90, negotiation: 82, persuasion: 78, understanding: 95 },
];

// Sample data for the current skills assessment
const currentSkills = [
  { name: 'Pronunciation', value: 85, improvement: '+20%', color: 'bg-blue-600' },
  { name: 'Grammar & Vocabulary', value: 90, improvement: '+20%', color: 'bg-green-600' },
  { name: 'Confidence & Fluency', value: 88, improvement: '+28%', color: 'bg-purple-600' },
  { name: 'Negotiation Skills', value: 82, improvement: '+22%', color: 'bg-amber-600' },
  { name: 'Persuasion Effectiveness', value: 78, improvement: '+23%', color: 'bg-pink-600' },
  { name: 'Customer Understanding', value: 95, improvement: '+23%', color: 'bg-indigo-600' },
];

const chartConfig = {
  pronunciation: { 
    label: 'Pronunciation',
    color: '#3b82f6' // blue-500
  },
  grammar: { 
    label: 'Grammar',
    color: '#10b981' // green-500
  },
  negotiation: { 
    label: 'Negotiation',
    color: '#f59e0b' // amber-500
  },
  persuasion: { 
    label: 'Persuasion',
    color: '#ec4899' // pink-500
  },
  understanding: { 
    label: 'Understanding',
    color: '#6366f1' // indigo-500
  }
};

const SkillsProgress = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Skills Progress Over Time
              </CardTitle>
              <CardDescription>
                Track your improvement in key communication metrics over the last 3 months
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <LineChart data={skillsProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[50, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="pronunciation" 
                    stroke={chartConfig.pronunciation.color} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="grammar" 
                    stroke={chartConfig.grammar.color} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="negotiation" 
                    stroke={chartConfig.negotiation.color} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="persuasion" 
                    stroke={chartConfig.persuasion.color} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="understanding" 
                    stroke={chartConfig.understanding.color} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Assessment</CardTitle>
              <CardDescription>
                Your performance in today's sales call
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSkills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium text-green-600">{skill.improvement}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.value} className="h-2" />
                      <span className="text-sm font-semibold">{skill.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">87%</div>
              <p className="text-sm text-gray-500">Overall skills effectiveness</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Strongest Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">Customer Understanding</div>
              <p className="text-sm text-gray-500">95% proficiency</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Most Improved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">Confidence & Fluency</div>
              <p className="text-sm text-gray-500">+28% improvement</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Focus Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">Persuasion</div>
              <p className="text-sm text-gray-500">78% - Practice needed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;
