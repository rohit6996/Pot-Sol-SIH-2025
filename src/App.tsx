import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RoleProvider } from "./contexts/RoleContext";
import RoleSelector from "./pages/RoleSelector";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ParkingManagerDashboard from "./pages/parking/ParkingManagerDashboard";
import TweetsPage from "./pages/x-complaints/TweetsPage";   // 👈 import your new page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RoleSelector />} />
            <Route path="/citizen/*" element={<CitizenDashboard />} />
            <Route path="/authority/*" element={<AuthorityDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/parking/*" element={<ParkingManagerDashboard />} />

            {/* 👇 new route for X Complaint Monitoring */}
            <Route path="/x-complaints" element={<TweetsPage />} />

            {/* fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
