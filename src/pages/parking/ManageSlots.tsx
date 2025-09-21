import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Settings, Car, Clock, MapPin, Zap, Accessibility } from "lucide-react";
import { mockParkingSlots, getStatusColor } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const ManageSlots = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [filterZone, setFilterZone] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const { toast } = useToast();

  const zones = Array.from(new Set(mockParkingSlots.map(slot => slot.zone)));
  const types = Array.from(new Set(mockParkingSlots.map(slot => slot.type)));
  
  const filteredSlots = mockParkingSlots.filter(slot => {
    const matchesLocation = slot.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesZone = filterZone === "all" || slot.zone === filterZone;
    const matchesStatus = filterStatus === "all" || slot.status === filterStatus;
    const matchesType = filterType === "all" || slot.type === filterType;
    
    return matchesLocation && matchesZone && matchesStatus && matchesType;
  });

  const handleStatusChange = (slotId: string, newStatus: string) => {
    toast({
      title: "Slot Status Updated",
      description: `Parking slot ${slotId} status changed to ${newStatus}`,
    });
  };

  const handleBulkUpdate = (status: string) => {
    toast({
      title: "Bulk Update Applied",
      description: `Selected slots have been marked as ${status}`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'disabled':
        return <Accessibility className="w-4 h-4" />;
      case 'electric':
        return <Zap className="w-4 h-4" />;
      case 'motorcycle':
        return <Car className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Parking Slot Management
              </CardTitle>
              <CardDescription>
                Update parking slot status and manage availability
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkUpdate("free")}
              >
                Mark Selected as Free
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkUpdate("maintenance")}
              >
                Mark for Maintenance
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterZone} onValueChange={setFilterZone}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="free">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredSlots.length} of {mockParkingSlots.length} parking slots
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slot ID</TableHead>
                  <TableHead>Location & Zone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-mono text-sm font-medium">
                      {slot.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{slot.location}</span>
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            {slot.zone}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(slot.type)}
                        <span className="text-sm capitalize">{slot.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(slot.status)} text-xs`}>
                        {slot.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(slot.lastUpdated)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={slot.status}
                        onValueChange={(value) => handleStatusChange(slot.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSlots.length === 0 && (
            <div className="text-center py-8">
              <Car className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No parking slots found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Status Overview</CardTitle>
          <CardDescription>Current distribution of parking slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-success">
                {filteredSlots.filter(s => s.status === 'free').length}
              </div>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-destructive">
                {filteredSlots.filter(s => s.status === 'occupied').length}
              </div>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-warning">
                {filteredSlots.filter(s => s.status === 'reserved').length}
              </div>
              <p className="text-sm text-muted-foreground">Reserved</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground">
                {filteredSlots.filter(s => s.status === 'maintenance').length}
              </div>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSlots;