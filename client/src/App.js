import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminSidebar from './components/AdminSidebar';
import React from 'react';

// Header and footer
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';

// Pages
import Home from './pages/Home';
import WasteSchedule from './pages/WasteSchedule';
import AllSchedules from './pages/AllSchedules';
import WasteLevels from './pages/WasteLevels';
import AdminDashboard from './pages/AdminDashboard';
import WasteTruckSidebar from './components/WasteTruckSidebar';
import WasteTruckDashboard from './pages/WasteTruckDashboard';

const Layout = () => {
  const location = useLocation();

  const adminRoutes = ["/admin/dashboard", "/admin/dashboard/content", "/admin/requests", "/admin/users", "/admin/reports"];
  const truckRoutes = ["/truck/dashboard", "/truck/dashboard/content", "/truck/requests", "/truck/qrcode"];

  const isAdminRoute = adminRoutes.includes(location.pathname) || location.pathname.startsWith('/admin/');
  const isTruckRoute = truckRoutes.includes(location.pathname) || location.pathname.startsWith('/truck/');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && !isTruckRoute && <Header />}
      <main className="flex-grow flex">
        {isAdminRoute && <AdminSidebar />}
        {isTruckRoute && <WasteTruckSidebar />}
        <div className="flex-grow p-5">
          <Routes>
            {/* User routes */}
            <Route path="/" element={<Home />} />
            <Route path="/wasteSchedule" element={<WasteSchedule />} />
            <Route path="/allSchedules" element={<AllSchedules />} />
            <Route path="/wasteLevels" element={<WasteLevels />} />

            {/* Admin routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Waste truck officer routes */}
            <Route path="/truck/*" element={<WasteTruckDashboard />} />
          </Routes>
        </div>
      </main>
      {!isAdminRoute && !isTruckRoute && <FooterComponent />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;