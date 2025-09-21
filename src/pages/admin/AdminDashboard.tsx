import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminOverview from "./AdminOverview";
import ManageUsers from "./ManageUsers";
import ComplaintDatabase from "./ComplaintDatabase";
import Reports from "./Reports";

const AdminDashboard = () => {
  return (
    <DashboardLayout 
      title="System Administrator Portal" 
      subtitle="Manage users, view reports and system analytics"
    >
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/complaints" element={<ComplaintDatabase />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;