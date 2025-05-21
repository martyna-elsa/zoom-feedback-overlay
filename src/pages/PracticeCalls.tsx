import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, FileText, Flag, ListTodo, TargetIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Sample practice call scenarios - copied from CallPreparation.tsx
const practiceCallScenarios = [
  {
    id: "new-client",
    title: "First Meeting with a Prospective Client",
    goal: "Establish rapport and gather information about the client's needs",
    description: "You're meeting a potential client for the first time. They've shown interest in your product but have limited knowledge of its features and benefits.",
    difficulty: "beginner",
    tasks: [
      { id: "intro", label: "Introduce yourself and your company effectively", completed: false },
      { id: "rapport", label: "Build rapport by finding common ground", completed: false },
      { id: "needs", label: "Identify key pain points and needs", completed: false },
      { id: "questions", label: "Ask open-ended discovery questions", completed: false },
      { id: "listen", label: "Practice active listening techniques", completed: false },
      { id: "solution", label: "Briefly explain how your solution could help", completed: false },
      { id: "next", label: "Set clear next steps", completed: false }
    ]
  },
  {
    id: "objection",
    title: "Handling Pricing Objections",
    goal: "Address pricing concerns while maintaining the value proposition",
    description: "The client is interested in your solution but has expressed concerns about the cost compared to competitors.",
    difficulty: "intermediate",
    tasks: [
      { id: "acknowledge", label: "Acknowledge the concern without being defensive", completed: false },
      { id: "value", label: "Reframe the discussion around value, not just cost", completed: false },
      { id: "roi", label: "Demonstrate ROI with specific examples", completed: false },
      { id: "compare", label: "Differentiating from competitors without criticizing them", completed: false },
      { id: "options", label: "Present flexible pricing options if available", completed: false },
      { id: "testimonial", label: "Share relevant success stories or testimonials", completed: false },
      { id: "agreement", label: "Work toward agreement on value before finalizing price", completed: false }
    ]
  },
  {
    id: "technical",
    title: "Technical Demonstration to IT Team",
    goal: "Effectively communicate technical details while addressing security concerns",
    description: "You're presenting to a company's IT department who will evaluate the technical aspects and security of your solution.",
    difficulty: "advanced",
    tasks: [
      { id: "tech-assess", label: "Assess technical knowledge of the audience", completed: false },
      { id: "adapt", label: "Adapt explanation based on their expertise level", completed: false },
      { id: "features", label: "Demonstrate key technical features clearly", completed: false },
      { id: "security", label: "Address security and compliance questions confidently", completed: false },
      { id: "integration", label: "Explain integration capabilities with existing systems", completed: false },
      { id: "tech-objection", label: "Handle technical objections with evidence", completed: false },
      { id: "tech-support", label: "Clarify technical support and implementation process", completed: false }
    ]
  },
  {
    id: "multi-stakeholder",
    title: "Multi-Stakeholder Negotiation",
    goal: "Navigate competing interests while moving toward agreement",
    description: "You're in a meeting with multiple decision-makers from different departments, each with their own priorities and concerns.",
    difficulty: "expert",
    tasks: [
      { id: "identify", label: "Identify each stakeholder's role and priorities", completed: false },
      { id: "balance", label: "Balance attention across all participants", completed: false },
      { id: "align", label: "Find alignment between departmental interests", completed: false },
      { id: "address", label: "Address conflicting requirements diplomatically", completed: false },
      { id: "consensus", label: "Build consensus around core benefits", completed: false },
      { id: "champion", label: "Identify and develop internal champions", completed: false },
      { id: "roadmap", label: "Create a roadmap that addresses various concerns", completed: false }
    ]
  }
];

const PracticeCalls: React.FC = () => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState(practiceCallScenarios[0]);
  
  const handleScenarioChange = (value: string) => {
    const scenario = practiceCallScenarios.find(s => s.id === value);
    if (scenario) {
      setSelectedScenario(scenario);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setSelectedScenario(prevScenario => {
      const updatedTasks = prevScenario.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prevScenario, tasks: updatedTasks };
    });

    toast({
      title: "Task status updated",
      description: "Your progress has been saved."
    });
  };

  const startPracticeCall = () => {
    toast({
      title: "Practice call initiated",
      description: "Setting up your practice environment..."
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <Link to="/web-platform">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Practice Calls</h1>

        <Card>
          <CardHeader>
            <CardTitle>Practice Sales Call Scenarios</CardTitle>
            <CardDescription>
              Select a scenario to practice specific sales call situations and skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FormLabel className="mb-2 inline-block">Select Scenario</FormLabel>
                <Select 
                  defaultValue={selectedScenario.id} 
                  onValueChange={handleScenarioChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {practiceCallScenarios.map((scenario) => (
                      <SelectItem key={scenario.id} value={scenario.id}>
                        {scenario.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <FormLabel className="mb-2 inline-block">Difficulty Level</FormLabel>
                <div className="flex items-center h-10 px-4 border border-input rounded-md bg-background">
                  <Badge variant={
                    selectedScenario.difficulty === "beginner" ? "default" :
                    selectedScenario.difficulty === "intermediate" ? "secondary" : 
                    selectedScenario.difficulty === "advanced" ? "outline" : "destructive"
                  }>
                    {selectedScenario.difficulty.charAt(0).toUpperCase() + selectedScenario.difficulty.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <TargetIcon className="h-4 w-4 text-blue-600" />
                    Call Goal
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">{selectedScenario.goal}</p>
                  
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Scenario Description
                  </h3>
                  <p className="text-sm text-gray-700">{selectedScenario.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <ListTodo className="h-4 w-4 text-green-600" />
                    Call Checklist
                  </h3>
                  <div className="space-y-3">
                    {selectedScenario.tasks.map((task) => (
                      <div key={task.id} className="flex items-start space-x-2">
                        <Checkbox 
                          id={task.id} 
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <label
                          htmlFor={task.id}
                          className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}
                        >
                          {task.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startPracticeCall} className="gap-2">
              <Flag className="h-4 w-4" />
              Start Practice Call
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PracticeCalls;
