import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthorityOverview from "./AuthorityOverview";
import AssignedComplaints from "./AssignedComplaints";

const AuthorityDashboard = () => {
  return (
    <DashboardLayout 
      title="Department Authority Portal" 
      subtitle="Manage assigned complaints and update resolutions"
    >
      <Routes>
        <Route path="/" element={<AuthorityOverview />} />
        <Route path="/complaints" element={<AssignedComplaints />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AuthorityDashboard;