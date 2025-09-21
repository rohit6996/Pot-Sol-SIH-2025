import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";
import { mockComplaints, getStatusColor, getPriorityColor } from "@/data/mockData";

const AuthorityOverview = () => {
  // Filter complaints assigned to this department
  const assignedComplaints = mockComplaints.filter(complaint => 
    complaint.assignedTo === 'Public Works Dept' || complaint.assignedTo === 'Maintenance Dept'
  );
  
  const recentComplaints = assignedComplaints.slice(0, 3);
  
  const stats = {
    total: assignedComplaints.length,
    pending: assignedComplaints.filter(c => c.status === 'pending').length,
    inProgress: assignedComplaints.filter(c => c.status === 'in-progress').length,
    resolved: assignedComplaints.filter(c => c.status === 'resolved').length,
    urgent: assignedComplaints.filter(c => c.priority === 'urgent').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/authority/complaints">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary rounded-lg">
                  <ClipboardList className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Manage Complaints</CardTitle>
                  <CardDescription>View and update assigned complaints</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-info rounded-lg">
                <Users className="w-4 h-4 text-info-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Department</CardTitle>
                <CardDescription>Public Works Department</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.resolved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.urgent}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Assigned Complaints</CardTitle>
          <CardDescription>Latest complaints assigned to your department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{complaint.id}</span>
                    <Badge className={`${getPriorityColor(complaint.priority)} text-xs`}>
                      {complaint.priority}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium">{complaint.title}</h4>
                  <p className="text-xs text-muted-foreground">{complaint.location}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Submitted {formatDate(complaint.createdAt)}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={`${getStatusColor(complaint.status)} text-xs`}>
                    {complaint.status.replace('-', ' ')}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {complaint.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/authority/complaints">View All Assigned Complaints</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution Rate</CardTitle>
            <CardDescription>Complaints resolved this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">85%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Response Time</CardTitle>
            <CardDescription>Time to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">2.4 hrs</div>
            <p className="text-xs text-muted-foreground mt-1">
              -0.6 hrs from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthorityOverview;