import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'citizen' | 'authority' | 'admin' | 'parking-manager' | 'X Complaint Monitoring';
 
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface RoleContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentRole: UserRole | null;
  setCurrentRole: (role: UserRole | null) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  return (
    <RoleContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        currentRole, 
        setCurrentRole 
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};