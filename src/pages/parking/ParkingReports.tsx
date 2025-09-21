import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Car, 
  Clock, 
  DollarSign,
  Calendar,
  Target,
  Award,
  Download
} from "lucide-react";
import { mockParkingSlots } from "@/data/mockData";

const ParkingReports = () => {
  const totalSlots = mockParkingSlots.length;
  const occupiedSlots = mockParkingSlots.filter(slot => slot.status === 'occupied').length;
  const freeSlots = mockParkingSlots.filter(slot => slot.status === 'free').length;
  const maintenanceSlots = mockParkingSlots.filter(slot => slot.status === 'maintenance').length;

  const occupancyRate = Math.round((occupiedSlots / totalSlots) * 100);
  const availabilityRate = Math.round((freeSlots / totalSlots) * 100);

  // Zone statistics
  const zoneData = mockParkingSlots.reduce((acc, slot) => {
    if (!acc[slot.zone]) {
      acc[slot.zone] = { total: 0, occupied: 0, free: 0, revenue: 0 };
    }
    acc[slot.zone].total++;
    if (slot.status === 'occupied') {
      acc[slot.zone].occupied++;
      acc[slot.zone].revenue += Math.floor(Math.random() * 15) + 5; // Mock revenue
    }
    if (slot.status === 'free') acc[slot.zone].free++;
    return acc;
  }, {} as Record<string, { total: number; occupied: number; free: number; revenue: number }>);

  // Mock time-based data
  const hourlyData = [
    { hour: '6 AM', occupancy: 15 },
    { hour: '8 AM', occupancy: 85 },
    { hour: '10 AM', occupancy: 92 },
    { hour: '12 PM', occupancy: 78 },
    { hour: '2 PM', occupancy: 88 },
    { hour: '4 PM', occupancy: 95 },
    { hour: '6 PM', occupancy: 72 },
    { hour: '8 PM', occupancy: 45 },
  ];

  const dailyRevenue = Object.values(zoneData).reduce((sum, zone) => sum + zone.revenue, 0);
  const monthlyRevenue = dailyRevenue * 30; // Mock monthly calculation

  const handleExportReport = () => {
    // Mock export functionality
    const reportData = {
      date: new Date().toISOString().split('T')[0],
      totalSlots,
      occupancyRate,
      availabilityRate,
      dailyRevenue,
      zones: zoneData
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parking_report_${reportData.date}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Parking Usage Reports
              </CardTitle>
              <CardDescription>
                Comprehensive analytics and usage patterns
              </CardDescription>
            </div>
            
            <Button onClick={handleExportReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Target className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              Current utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${dailyRevenue}</div>
            <p className="text-xs text-muted-foreground">
              Today's earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Turnover</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">2.8 hrs</div>
            <p className="text-xs text-muted-foreground">
              Per parking session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">92%</div>
            <p className="text-xs text-muted-foreground">
              System performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Zone Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Performance Analysis</CardTitle>
          <CardDescription>Utilization and revenue by parking zones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(zoneData).map(([zone, data]) => (
              <div key={zone} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{zone}</h4>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Total: {data.total}</span>
                    <span>Occupied: {data.occupied}</span>
                    <span>Available: {data.free}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge className="bg-success text-success-foreground">
                    ${data.revenue} revenue
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((data.occupied / data.total) * 100)}% occupied
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Usage Pattern</CardTitle>
            <CardDescription>Peak and off-peak hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hourlyData.map((data, index) => (
                <div key={data.hour} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.hour}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${data.occupancy}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground w-12">
                      {data.occupancy}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Revenue and usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                  <div className="text-2xl font-bold text-success">${monthlyRevenue}</div>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Daily Occupancy</span>
                  <Badge variant="outline">{occupancyRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peak Hour Utilization</span>
                  <Badge variant="outline">95%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Off-Peak Utilization</span>
                  <Badge variant="outline">35%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Session Duration</span>
                  <Badge variant="outline">2.8 hours</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Overall parking system metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-info">{occupancyRate}%</div>
              <p className="text-sm text-muted-foreground">
                System Utilization
                <br />
                <span className="text-xs">Target: 75-85%</span>
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-success">${dailyRevenue}</div>
              <p className="text-sm text-muted-foreground">
                Daily Revenue
                <br />
                <span className="text-xs">+15% vs. last month</span>
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-warning">92%</div>
              <p className="text-sm text-muted-foreground">
                System Efficiency
                <br />
                <span className="text-xs">Above target of 85%</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParkingReports;