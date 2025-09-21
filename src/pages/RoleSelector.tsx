import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { Users, Shield, Settings, Car, X, XIcon, SeparatorVerticalIcon, Camera } from "lucide-react";

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  path: string;
}

const roles: RoleOption[] = [
  {
    role: 'citizen',
    title: 'Citizen Portal',
    description: 'Report civic issues and check parking availability',
    icon: Users,
    color: 'bg-primary hover:bg-primary-light',
    path: '/citizen'
  },
  {
    role: 'authority',
    title: 'Department Authority',
    description: 'Manage assigned complaints and update resolutions',
    icon: Shield,
    color: 'bg-accent hover:bg-accent/90',
    path: '/authority'
  },
  {
    role: 'admin',
    title: 'System Administrator',
    description: 'Manage users, view reports and system analytics',
    icon: Settings,
    color: 'bg-info hover:bg-info/90',
    path: '/admin'
  },
  {
    role: 'parking-manager',
    title: 'Parking Manager',
    description: 'Update parking slot status and view usage reports',
    icon: Car,
    color: 'bg-success hover:bg-success/90',
    path: '/parking'
  },
  {
  role: 'X Complaint Monitoring',
  title: 'X Complaint Monitoring',
  description: 'View Complaints from X Platform',
  icon: Camera,
  color: 'bg-success hover:bg-success/90',
  path: '/x-complaints'  // ✅ updated to match the React route
}

];

const RoleSelector = () => {
  const navigate = useNavigate();
  const { setCurrentRole, setCurrentUser } = useRole();

  const handleRoleSelect = (role: RoleOption) => {
    // Set mock user data for demo
    setCurrentUser({
      id: `${role.role}-demo-user`,
      name: `${role.title} Demo User`,
      email: `${role.role}@civic-system.gov`,
      role: role.role
    });
    setCurrentRole(role.role);
    navigate(role.path);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pot-Sol: From Problems to Solutions!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for crowdsourced civic issue reporting and smart parking management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.role} 
                className="hover:shadow-civic transition-all duration-300 cursor-pointer group"
                onClick={() => handleRoleSelect(role)}
              >
                <CardHeader className="text-center pb-3">
                  <div className={`w-16 h-16 rounded-lg ${role.color} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4 text-sm leading-relaxed">
                    {role.description}
                  </CardDescription>
                  <Button 
                    className={`w-full ${role.color} text-white border-0`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoleSelect(role);
                    }}
                  >
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            This is a demo system. Select any role to explore the interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;