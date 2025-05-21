
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Landing from '@/pages/Landing';
import VideoCallPage from '@/pages/VideoCallPage';
import WebPlatformPage from '@/pages/WebPlatformPage';
import CallPreparation from '@/pages/CallPreparation';
import CallInformation from '@/pages/CallInformation';
import CallHistory from '@/pages/CallHistory';
import ParticipantProfiles from '@/pages/ParticipantProfiles';
import SkillsProgress from '@/pages/SkillsProgress';
import AdminDashboard from '@/pages/AdminDashboard';
import PracticeCalls from '@/pages/PracticeCalls';

import '@/App.css';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/video-call" element={<VideoCallPage />} />
          <Route path="/web-platform" element={<WebPlatformPage />} />
          <Route path="/call-preparation" element={<CallPreparation />} />
          <Route path="/call-information" element={<CallInformation />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/participant-profiles" element={<ParticipantProfiles />} />
          <Route path="/skills-progress" element={<SkillsProgress />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/practice-calls" element={<PracticeCalls />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
