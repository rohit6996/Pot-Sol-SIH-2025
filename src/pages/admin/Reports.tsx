import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { mockComplaints, mockUsers } from "@/data/mockData";

const Reports = () => {
  // Calculate statistics
  const totalComplaints = mockComplaints.length;
  const resolvedComplaints = mockComplaints.filter(c => c.status === 'resolved').length;
  const pendingComplaints = mockComplaints.filter(c => c.status === 'pending').length;
  const inProgressComplaints = mockComplaints.filter(c => c.status === 'in-progress').length;
  const urgentComplaints = mockComplaints.filter(c => c.priority === 'urgent').length;

  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;
  
  // User statistics
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.isActive).length;
  const citizenUsers = mockUsers.filter(u => u.role === 'citizen').length;
  const authorityUsers = mockUsers.filter(u => u.role === 'authority').length;

  // Complaint categories
  const categoryStats = mockComplaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Monthly trends (mock data)
  const monthlyData = [
    { month: 'Dec 2023', complaints: 45, resolved: 38 },
    { month: 'Jan 2024', complaints: 52, resolved: 41 },
    { month: 'Current', complaints: totalComplaints, resolved: resolvedComplaints }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            System Analytics & Reports
          </CardTitle>
          <CardDescription>
            Comprehensive performance metrics and system insights
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {resolvedComplaints} of {totalComplaints} resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">2.4 hrs</div>
            <p className="text-xs text-muted-foreground">
              First department response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <Award className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">4.2/5</div>
            <p className="text-xs text-muted-foreground">
              Average rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Complaint Status Breakdown</CardTitle>
            <CardDescription>Current distribution of complaint statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success text-success-foreground text-xs">
                    {resolvedComplaints}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {resolutionRate}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-info" />
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-info text-info-foreground text-xs">
                    {inProgressComplaints}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((inProgressComplaints / totalComplaints) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-warning text-warning-foreground text-xs">
                    {pendingComplaints}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((pendingComplaints / totalComplaints) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm">Urgent Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-destructive text-destructive-foreground text-xs">
                    {urgentComplaints}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Requires attention
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Complaint Categories</CardTitle>
            <CardDescription>Most frequently reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.map(([category, count], index) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm">
                    {index + 1}. {category}
                  </span>
                  <Badge variant="outline">
                    {count} report{count !== 1 ? 's' : ''}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Platform user metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Users</span>
                </div>
                <Badge variant="outline">{totalUsers}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Active Users</span>
                </div>
                <Badge className="bg-success text-success-foreground text-xs">
                  {activeUsers}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm ml-6">Citizens</span>
                <Badge variant="outline">{citizenUsers}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm ml-6">Authorities</span>
                <Badge variant="outline">{authorityUsers}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Complaint volume and resolution trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{data.month}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {data.complaints} filed
                    </Badge>
                    <Badge className="bg-success text-success-foreground text-xs">
                      {data.resolved} resolved
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Overall system performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-success">{resolutionRate}%</div>
              <p className="text-sm text-muted-foreground">
                Resolution Rate
                <br />
                <span className="text-xs">Above target of 70%</span>
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-info">2.4 hrs</div>
              <p className="text-sm text-muted-foreground">
                Avg Response Time
                <br />
                <span className="text-xs">Below target of 4 hrs</span>
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-warning">4.2/5</div>
              <p className="text-sm text-muted-foreground">
                User Satisfaction
                <br />
                <span className="text-xs">Above target of 4.0</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;