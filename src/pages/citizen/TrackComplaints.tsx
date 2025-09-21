import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Eye, Calendar, MapPin, AlertCircle } from "lucide-react";
import { mockComplaints, getStatusColor, getPriorityColor } from "@/data/mockData";

const TrackComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  const filteredComplaints = mockComplaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Track Your Complaints
          </CardTitle>
          <CardDescription>
            Monitor the status and progress of your reported civic issues
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by title, location, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-mono text-sm">
                      {complaint.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{complaint.title}</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {complaint.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(complaint.status)} text-xs`}>
                        {complaint.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getPriorityColor(complaint.priority)} text-xs`}
                      >
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{complaint.category}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(complaint.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedComplaint(
                          selectedComplaint === complaint.id ? null : complaint.id
                        )}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No complaints found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed View */}
      {selectedComplaint && (
        <Card>
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const complaint = mockComplaints.find(c => c.id === selectedComplaint);
              if (!complaint) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-muted-foreground">ID:</span> {complaint.id}</div>
                        <div><span className="text-muted-foreground">Title:</span> {complaint.title}</div>
                        <div><span className="text-muted-foreground">Category:</span> {complaint.category}</div>
                        <div><span className="text-muted-foreground">Location:</span> {complaint.location}</div>
                        <div><span className="text-muted-foreground">Priority:</span> 
                          <Badge className={`ml-2 ${getPriorityColor(complaint.priority)} text-xs`}>
                            {complaint.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Status & Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-muted-foreground">Status:</span> 
                          <Badge className={`ml-2 ${getStatusColor(complaint.status)} text-xs`}>
                            {complaint.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div><span className="text-muted-foreground">Submitted:</span> {formatDate(complaint.createdAt)}</div>
                        <div><span className="text-muted-foreground">Last Updated:</span> {formatDate(complaint.updatedAt)}</div>
                        {complaint.assignedTo && (
                          <div><span className="text-muted-foreground">Assigned to:</span> {complaint.assignedTo}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      {complaint.description}
                    </p>
                  </div>

                  {complaint.notes && (
                    <div>
                      <h4 className="font-semibold mb-2">Department Notes</h4>
                      <p className="text-sm text-muted-foreground bg-info/10 p-3 rounded-lg border border-info/20">
                        {complaint.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackComplaints;