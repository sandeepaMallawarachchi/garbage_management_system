import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboardContent from './AdminDashboardContent.jsx';
import AdminReports from './AdminReports.jsx';
import AdminRequests from './AdminRequests.jsx';
import AdminUsers from './AdminUsers.jsx';
import UpdatePriceAndAmount from './UpdatePriceAndAmount.jsx';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-5">
        <Routes>
          <Route path="*" element={<Navigate to="/admin/dashboard/content" replace />} />
          <Route path="/dashboard/content" element={<AdminDashboardContent />} />
          <Route path="/requests" element={<AdminRequests />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/priceAmount" element={<UpdatePriceAndAmount />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
