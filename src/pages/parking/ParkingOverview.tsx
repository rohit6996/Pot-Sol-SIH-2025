import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Settings, 
  BarChart3, 
  MapPin, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { mockParkingSlots, getStatusColor } from "@/data/mockData";

const ParkingOverview = () => {
  const stats = {
    total: mockParkingSlots.length,
    free: mockParkingSlots.filter(slot => slot.status === 'free').length,
    occupied: mockParkingSlots.filter(slot => slot.status === 'occupied').length,
    reserved: mockParkingSlots.filter(slot => slot.status === 'reserved').length,
    maintenance: mockParkingSlots.filter(slot => slot.status === 'maintenance').length
  };

  const occupancyRate = Math.round((stats.occupied / stats.total) * 100);
  const availabilityRate = Math.round((stats.free / stats.total) * 100);

  // Group by zones
  const zoneStats = mockParkingSlots.reduce((acc, slot) => {
    if (!acc[slot.zone]) {
      acc[slot.zone] = { total: 0, free: 0, occupied: 0 };
    }
    acc[slot.zone].total++;
    if (slot.status === 'free') acc[slot.zone].free++;
    if (slot.status === 'occupied') acc[slot.zone].occupied++;
    return acc;
  }, {} as Record<string, { total: number; free: number; occupied: number }>);

  // Recent updates
  const recentUpdates = mockParkingSlots
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/parking/manage-slots">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary rounded-lg">
                  <Settings className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Manage Slots</CardTitle>
                  <CardDescription>Update parking slot status</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/parking/reports">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-info rounded-lg">
                  <BarChart3 className="w-4 h-4 text-info-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Usage Reports</CardTitle>
                  <CardDescription>View parking analytics</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent rounded-lg">
                <Car className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Parking Manager</CardTitle>
                <CardDescription>City parking operations</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.free}</div>
            <p className="text-xs text-muted-foreground">
              {availabilityRate}% available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.occupied}</div>
            <p className="text-xs text-muted-foreground">
              {occupancyRate}% occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.reserved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{stats.maintenance}</div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Status Overview</CardTitle>
          <CardDescription>Parking availability by zone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(zoneStats).map(([zone, data]) => (
              <div key={zone} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{zone}</h4>
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-medium">{data.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-medium text-success">{data.free}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Occupied:</span>
                    <span className="font-medium text-destructive">{data.occupied}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${(data.free / data.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Slot Updates</CardTitle>
          <CardDescription>Latest parking slot status changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUpdates.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">{slot.id}</span>
                    <Badge className={`${getStatusColor(slot.status)} text-xs`}>
                      {slot.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{slot.location} - {slot.zone}</p>
                  <p className="text-xs text-muted-foreground capitalize">{slot.type} parking</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(slot.lastUpdated)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/parking/manage-slots">Manage All Parking Slots</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Occupancy Rate</CardTitle>
            <CardDescription>Current utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: 75-85%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Turnover Rate</CardTitle>
            <CardDescription>Daily average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">3.2x</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cars per slot per day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Impact</CardTitle>
            <CardDescription>Monthly estimate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">$12.5K</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on current usage
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParkingOverview;