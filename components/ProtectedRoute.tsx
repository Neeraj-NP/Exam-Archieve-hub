import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
  allowedRoles: ('student' | 'admin')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, redirectTo = '/login' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-semibold text-slate-700">Loading...</div>
        </div>
    );
  }

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
