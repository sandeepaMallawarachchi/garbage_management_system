import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from 'react';

//header and footer
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';

//pages
import Home from './pages/Home';
import WasteSchedule from './pages/WasteSchedule';
import AllSchedules from './pages/AllSchedules';
import WasteLevels from './pages/WasteLevels';
import AdminDashboard from './pages/AdminDashboard';


const Layout = () => {
  const location = useLocation();
  const adminRoutes = ['/admin/dashboard'];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wasteSchedule' element={<WasteSchedule />} />
          <Route path='/allSchedules' element={<AllSchedules />} />
          <Route path='/wasteLevels' element={<WasteLevels />} />

          {/* admin routes */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
      </main>

      {!adminRoutes.includes(location.pathname) && <FooterComponent />}
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
