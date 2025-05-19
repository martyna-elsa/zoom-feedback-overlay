
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
      <div className="bg-white p-3 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold">ELSA Platform</h1>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl w-full px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome to ELSA</h2>
            <p className="text-lg text-gray-600">English Language Speech Assistant for professional development</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ELSA Web Platform Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-800 p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">ELSA Web Platform</h3>
                <p className="text-blue-100">Access your personal dashboard, view progress, and prepare for calls</p>
              </div>
              <div className="p-6">
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>View Skills Progress</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Call History</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Call Preparation</span>
                  </li>
                </ul>
                <Link to="/web-platform">
                  <Button className="w-full">Enter ELSA Web Platform</Button>
                </Link>
              </div>
            </div>
            
            {/* Zoom Call Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="bg-indigo-800 p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Enhance Video Call</h3>
                <p className="text-indigo-100">Enable video calls with AI-powered assistance</p>
              </div>
              <div className="p-6">
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span>Real-time Conversation Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span>Facilitator Mode</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span>Call Summary</span>
                  </li>
                </ul>
                <Link to="/video-call">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Video className="mr-2 h-5 w-5" />
                    Enable Elsa AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          &copy; 2025 ELSA Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Landing;
