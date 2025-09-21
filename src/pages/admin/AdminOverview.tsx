import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield
} from "lucide-react";
import { mockComplaints, mockUsers } from "@/data/mockData";

const AdminOverview = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.isActive).length;
  
  const complaintsStats = {
    total: mockComplaints.length,
    pending: mockComplaints.filter(c => c.status === 'pending').length,
    inProgress: mockComplaints.filter(c => c.status === 'in-progress').length,
    resolved: mockComplaints.filter(c => c.status === 'resolved').length,
    urgent: mockComplaints.filter(c => c.priority === 'urgent').length
  };

  const usersByRole = {
    citizens: mockUsers.filter(u => u.role === 'citizen').length,
    authorities: mockUsers.filter(u => u.role === 'authority').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
    parkingManagers: mockUsers.filter(u => u.role === 'parking-manager').length
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/admin/users">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary rounded-lg">
                  <Users className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
                  <CardDescription className="text-xs">Add, edit, remove users</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/admin/complaints">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-info rounded-lg">
                  <FileText className="w-4 h-4 text-info-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Complaint Database</CardTitle>
                  <CardDescription className="text-xs">View all complaints</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/admin/reports">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent rounded-lg">
                  <BarChart3 className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Reports</CardTitle>
                  <CardDescription className="text-xs">System analytics</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success rounded-lg">
                <Shield className="w-4 h-4 text-success-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">System Admin</CardTitle>
                <CardDescription className="text-xs">Full system access</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complaints</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaintsStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Total filed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{complaintsStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{complaintsStats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{complaintsStats.resolved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{complaintsStats.urgent}</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Users by role in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Citizens</span>
                <Badge variant="outline">{usersByRole.citizens}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Department Authorities</span>
                <Badge variant="outline">{usersByRole.authorities}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">System Administrators</span>
                <Badge variant="outline">{usersByRole.admins}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Parking Managers</span>
                <Badge variant="outline">{usersByRole.parkingManagers}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Key metrics for system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Resolution Rate</span>
                <span className="text-sm font-medium text-success">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Response Time</span>
                <span className="text-sm font-medium text-info">2.4 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">User Satisfaction</span>
                <span className="text-sm font-medium text-success">4.2/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">System Uptime</span>
                <span className="text-sm font-medium text-success">99.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;