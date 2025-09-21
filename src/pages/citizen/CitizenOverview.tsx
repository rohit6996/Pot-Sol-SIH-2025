import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Car, 
  Plus, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { mockComplaints, getStatusColor } from "@/data/mockData";

const CitizenOverview = () => {
  const userComplaints = mockComplaints.slice(0, 3); // Show latest 3 for demo
  const stats = {
    totalComplaints: 4,
    pending: 2,
    resolved: 1,
    inProgress: 1
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/citizen/raise-complaint">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary rounded-lg">
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Report Issue</CardTitle>
                  <CardDescription>Submit a new complaint</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/citizen/track-complaints">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-info rounded-lg">
                  <Search className="w-4 h-4 text-info-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Track Status</CardTitle>
                  <CardDescription>View your complaints</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/citizen/check-parking">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent rounded-lg">
                  <Car className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Parking</CardTitle>
                  <CardDescription>Check availability</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
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
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Reports</CardTitle>
          <CardDescription>Latest civic issues you've reported</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{complaint.title}</h4>
                  <p className="text-xs text-muted-foreground">{complaint.location}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={`${getStatusColor(complaint.status)} text-xs`}>
                  {complaint.status.replace('-', ' ')}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/citizen/track-complaints">View All Complaints</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenOverview;