import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ParkingOverview from "./ParkingOverview";
import ManageSlots from "./ManageSlots";
import ParkingReports from "./ParkingReports";

const ParkingManagerDashboard = () => {
  return (
    <DashboardLayout 
      title="Parking Manager Portal" 
      subtitle="Update parking slot status and view usage reports"
    >
      <Routes>
        <Route path="/" element={<ParkingOverview />} />
        <Route path="/manage-slots" element={<ManageSlots />} />
        <Route path="/reports" element={<ParkingReports />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ParkingManagerDashboard;