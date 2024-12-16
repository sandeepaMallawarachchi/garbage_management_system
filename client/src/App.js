import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminSidebar from './components/AdminSidebar';
import React from 'react';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home';
import WasteSchedule from './pages/WasteSchedule';
import AllSchedules from './pages/AllSchedules';
import WasteLevels from './pages/WasteLevels';
import AdminDashboard from './pages/AdminDashboard';
import WasteTruckSidebar from './components/WasteTruckSidebar';
import WasteTruckRoutes from './pages/WasteTruckRoutes';
import QRDetails from './pages/QRDetails';
import About from './pages/About';

const Layout = () => {
  const location = useLocation();

  const adminRoutes = ["/admin/dashboard", "/admin/dashboard/content", "/admin/requests", "/admin/users", "/admin/reports, admin/priceAmount"];
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
            <Route path="/" element={<Home />} />
            <Route path="/wasteSchedule" element={<WasteSchedule />} />
            <Route path="/allSchedules" element={<AllSchedules />} />
            <Route path="/wasteLevels" element={<WasteLevels />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/truck/*" element={<WasteTruckRoutes />} />
            <Route path="/qrDetails/:cusID" element={<QRDetails />} />
            <Route path="/about" element={<About />} />
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
