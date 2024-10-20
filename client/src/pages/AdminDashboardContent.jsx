import React from 'react'
import AdminDashboardReportGeneration from '../components/AdminDashboardReportGeneration'
import AdminTypeChart from '../components/AdminTypeChart';

const AdminDashboardContent = () => {
  return (
    <div>
        <AdminTypeChart />
        <AdminDashboardReportGeneration />
    </div>
  )
}

export default AdminDashboardContent