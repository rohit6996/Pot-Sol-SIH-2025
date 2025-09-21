// Mock data for the civic management system

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  location: string;
  citizenId: string;
  citizenName: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  notes?: string;
}

export interface ParkingSlot {
  id: string;
  location: string;
  zone: string;
  status: 'free' | 'occupied' | 'reserved' | 'maintenance';
  type: 'regular' | 'disabled' | 'electric' | 'motorcycle';
  lastUpdated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'authority' | 'admin' | 'parking-manager';
  department?: string;
  createdAt: string;
  isActive: boolean;
}

export const mockComplaints: Complaint[] = [
  {
    id: 'C001',
    title: 'Broken Streetlight on Main Street',
    description: 'The streetlight near the intersection of Main St and Oak Ave has been out for 3 days, making it dangerous for pedestrians at night.',
    status: 'in-progress',
    priority: 'high',
    category: 'Street Lighting',
    location: 'Main St & Oak Ave',
    citizenId: 'U001',
    citizenName: 'John Smith',
    assignedTo: 'Public Works Dept',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    notes: 'Repair crew scheduled for tomorrow morning'
  },
  {
    id: 'C002',
    title: 'Large Pothole on Elm Street',
    description: 'There is a large pothole on Elm Street that is damaging vehicles. It needs immediate attention.',
    status: 'pending',
    priority: 'urgent',
    category: 'Road Maintenance',
    location: 'Elm Street, Block 200',
    citizenId: 'U002',
    citizenName: 'Sarah Johnson',
    createdAt: '2024-01-16T08:15:00Z',
    updatedAt: '2024-01-16T08:15:00Z'
  },
  {
    id: 'C003',
    title: 'Graffiti on Public Building',
    description: 'Inappropriate graffiti has appeared on the side of the community center building.',
    status: 'resolved',
    priority: 'medium',
    category: 'Vandalism',
    location: 'Community Center, 123 Park Ave',
    citizenId: 'U003',
    citizenName: 'Mike Davis',
    assignedTo: 'Maintenance Dept',
    createdAt: '2024-01-10T16:45:00Z',
    updatedAt: '2024-01-14T11:30:00Z',
    notes: 'Cleaned and painted over on 01/14'
  },
  {
    id: 'C004',
    title: 'Overflowing Trash Can',
    description: 'The trash can at Central Park playground area is overflowing and attracting pests.',
    status: 'pending',
    priority: 'medium',
    category: 'Waste Management',
    location: 'Central Park Playground',
    citizenId: 'U004',
    citizenName: 'Lisa Wilson',
    createdAt: '2024-01-16T12:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z'
  }
];

export const mockParkingSlots: ParkingSlot[] = [
  { id: 'P001', location: 'Downtown Plaza', zone: 'Zone A', status: 'occupied', type: 'regular', lastUpdated: '2024-01-16T14:30:00Z' },
  { id: 'P002', location: 'Downtown Plaza', zone: 'Zone A', status: 'free', type: 'regular', lastUpdated: '2024-01-16T14:15:00Z' },
  { id: 'P003', location: 'Downtown Plaza', zone: 'Zone A', status: 'free', type: 'disabled', lastUpdated: '2024-01-16T13:45:00Z' },
  { id: 'P004', location: 'City Hall', zone: 'Zone B', status: 'occupied', type: 'regular', lastUpdated: '2024-01-16T14:20:00Z' },
  { id: 'P005', location: 'City Hall', zone: 'Zone B', status: 'free', type: 'electric', lastUpdated: '2024-01-16T12:30:00Z' },
  { id: 'P006', location: 'Central Market', zone: 'Zone C', status: 'reserved', type: 'regular', lastUpdated: '2024-01-16T14:25:00Z' },
  { id: 'P007', location: 'Central Market', zone: 'Zone C', status: 'free', type: 'motorcycle', lastUpdated: '2024-01-16T14:10:00Z' },
  { id: 'P008', location: 'Library District', zone: 'Zone D', status: 'maintenance', type: 'regular', lastUpdated: '2024-01-16T09:00:00Z' }
];

export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'citizen',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'U002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'citizen',
    createdAt: '2024-01-02T00:00:00Z',
    isActive: true
  },
  {
    id: 'U003',
    name: 'Mike Davis',
    email: 'mike.davis@city.gov',
    role: 'authority',
    department: 'Public Works',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'U004',
    name: 'Lisa Wilson',
    email: 'lisa.wilson@email.com',
    role: 'citizen',
    createdAt: '2024-01-03T00:00:00Z',
    isActive: true
  },
  {
    id: 'U005',
    name: 'Admin User',
    email: 'admin@city.gov',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'bg-success text-success-foreground';
    case 'in-progress':
      return 'bg-info text-info-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'rejected':
      return 'bg-destructive text-destructive-foreground';
    case 'free':
      return 'bg-success text-success-foreground';
    case 'occupied':
      return 'bg-destructive text-destructive-foreground';
    case 'reserved':
      return 'bg-warning text-warning-foreground';
    case 'maintenance':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-destructive text-destructive-foreground';
    case 'high':
      return 'bg-warning text-warning-foreground';
    case 'medium':
      return 'bg-info text-info-foreground';
    case 'low':
      return 'bg-secondary text-secondary-foreground';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};