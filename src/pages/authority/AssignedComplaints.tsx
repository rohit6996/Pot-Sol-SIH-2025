import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Edit, Calendar, MapPin, User, Save } from "lucide-react";
import { mockComplaints, getStatusColor, getPriorityColor } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AssignedComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [updateForm, setUpdateForm] = useState({
    status: "",
    notes: ""
  });
  const { toast } = useToast();

  // Filter complaints assigned to this department
  const assignedComplaints = mockComplaints.filter(complaint => 
    complaint.assignedTo === 'Public Works Dept' || complaint.assignedTo === 'Maintenance Dept'
  );

  const filteredComplaints = assignedComplaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateComplaint = () => {
    toast({
      title: "Complaint Updated",
      description: `Status updated to "${updateForm.status}" for complaint ${selectedComplaint?.id}`,
    });
    setSelectedComplaint(null);
    setUpdateForm({ status: "", notes: "" });
  };

  const openUpdateDialog = (complaint: any) => {
    setSelectedComplaint(complaint);
    setUpdateForm({
      status: complaint.status,
      notes: complaint.notes || ""
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" />
            Assigned Complaints Management
          </CardTitle>
          <CardDescription>
            Manage and update complaints assigned to your department
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by ID, title, or location..."
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
                  <TableHead>Title & Location</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
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
                      <div className="flex items-center text-sm">
                        <User className="w-3 h-3 mr-1 text-muted-foreground" />
                        {complaint.citizenName}
                      </div>
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
                      <Badge className={`${getStatusColor(complaint.status)} text-xs`}>
                        {complaint.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(complaint.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openUpdateDialog(complaint)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Update Complaint {complaint.id}</DialogTitle>
                            <DialogDescription>
                              Update the status and add notes for this complaint
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            {/* Complaint Details */}
                            <div className="bg-muted p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">{complaint.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{complaint.description}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground">
                                <span>Location: {complaint.location}</span>
                                <span>Category: {complaint.category}</span>
                                <span>Priority: {complaint.priority}</span>
                              </div>
                            </div>

                            {/* Update Form */}
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                  value={updateForm.status} 
                                  onValueChange={(value) => setUpdateForm(prev => ({ ...prev, status: value }))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="notes">Department Notes</Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Add notes about the progress, actions taken, or resolution details..."
                                  rows={4}
                                  value={updateForm.notes}
                                  onChange={(e) => setUpdateForm(prev => ({ ...prev, notes: e.target.value }))}
                                />
                              </div>

                              <Button 
                                onClick={handleUpdateComplaint}
                                className="w-full"
                                disabled={!updateForm.status}
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Update Complaint
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-8">
              <Edit className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No assigned complaints found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignedComplaints;