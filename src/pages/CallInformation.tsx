
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const CallInformation: React.FC = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      companyName: 'Acme Corporation',
      industry: 'Technology',
      callObjective: 'Product demo and pricing discussion',
      companySize: '50-100 employees',
      painPoints: 'Current solution lacks scalability and integration capabilities',
      previousInteractions: 'Initial discovery call on May 5th',
      additionalNotes: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "Call information updated",
      description: "You'll now receive contextual feedback based on this information."
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Call
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Update Call & Company Information</CardTitle>
            <CardDescription>
              Provide details about the current call to receive more accurate contextual feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Industry" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="callObjective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call Objective</FormLabel>
                      <FormControl>
                        <Input placeholder="What's the main goal of this call?" {...field} />
                      </FormControl>
                      <FormDescription>
                        Clearly defined objectives help receive more relevant feedback
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <FormControl>
                        <Input placeholder="Company size" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="painPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Known Pain Points</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What challenges is the customer facing?" 
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousInteractions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Interactions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Summary of previous calls or meetings" 
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any other relevant information" 
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button type="submit">Update Information</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallInformation;
