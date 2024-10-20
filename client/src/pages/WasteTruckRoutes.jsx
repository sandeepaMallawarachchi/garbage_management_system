import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import WasteTruckDashboard from './WasteTruckDashboard.jsx';

const WasteTruckRoutes = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-5">
        <Routes>
          <Route path="*" element={<Navigate to="/truck/dashboard/content" replace />} />
          <Route path="/dashboard/content" element={<WasteTruckDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default WasteTruckRoutes;
