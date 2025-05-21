
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import WebPlatformPage from "./pages/WebPlatformPage";
import VideoCallPage from "./pages/VideoCallPage";
import SkillsProgress from "./pages/SkillsProgress";
import NotFound from "./pages/NotFound";
import CallPreparation from "./pages/CallPreparation";
import CallHistory from "./pages/CallHistory";
import AdminDashboard from "./pages/AdminDashboard";
import PracticeCalls from "./pages/PracticeCalls";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/web-platform" element={<WebPlatformPage />} />
          <Route path="/video-call" element={<VideoCallPage />} />
          <Route path="/skills-progress" element={<SkillsProgress />} />
          <Route path="/call-preparation" element={<CallPreparation />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/practice-calls" element={<PracticeCalls />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
