import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';
import toast from 'react-hot-toast';

export const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        toast.error("Please login to access this page!");
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export const AdminRoute = () => {
    const role = getUserRole();
    if (!isAuthenticated() || role !== 'ADMIN') {
        toast.error("Access Denied! You must be an administrator.");
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};
