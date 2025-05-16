
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Upload, FileText, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CallInformation: React.FC = () => {
  const { toast } = useToast();

  const handleUpload = (type: string) => {
    toast({
      title: "Upload initiated",
      description: `You'll soon be able to upload documents for ${type}.`
    });
  };

  const handleUrlSubmit = (type: string, event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const url = new FormData(form).get('url') as string;
    
    if (url) {
      toast({
        title: "URL received",
        description: `We'll analyze this URL for ${type}.`
      });
      form.reset();
    }
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
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Company Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Update Your Company Information</CardTitle>
              <CardDescription>
                Add details about your company to improve contextual feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer" 
                   onClick={() => handleUpload('your company')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Upload Document</h3>
                    <p className="text-sm text-gray-500">Upload company brochures, presentations or other documents</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={(e) => handleUrlSubmit('your company', e)}>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <LinkIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Paste Company URL</h3>
                      <p className="text-sm text-gray-500">Add your company website or LinkedIn page</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      name="url"
                      placeholder="https://yourcompany.com" 
                      type="url" 
                      className="flex-1"
                      required
                    />
                    <Button type="submit">Analyze</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Participant's Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Participant's Company Information</CardTitle>
              <CardDescription>
                Add details about the participant's company to receive more relevant insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => handleUpload('participant company')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Upload Document</h3>
                    <p className="text-sm text-gray-500">Upload materials about the participant's company</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={(e) => handleUrlSubmit('participant company', e)}>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <LinkIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Paste Company URL</h3>
                      <p className="text-sm text-gray-500">Add their company website or LinkedIn page</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      name="url"
                      placeholder="https://theircompany.com" 
                      type="url" 
                      className="flex-1"
                      required
                    />
                    <Button type="submit">Analyze</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CallInformation;
