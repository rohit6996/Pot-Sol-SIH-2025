import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CitizenOverview from "./CitizenOverview";
import RaiseComplaint from "./RaiseComplaint";
import TrackComplaints from "./TrackComplaints";
import CheckParking from "./CheckParking";

const CitizenDashboard = () => {
  return (
    <DashboardLayout 
      title="Citizen Portal" 
      subtitle="Report civic issues and check parking availability"
    >
      <Routes>
        <Route path="/" element={<CitizenOverview />} />
        <Route path="/raise-complaint" element={<RaiseComplaint />} />
        <Route path="/track-complaints" element={<TrackComplaints />} />
        <Route path="/check-parking" element={<CheckParking />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CitizenDashboard;