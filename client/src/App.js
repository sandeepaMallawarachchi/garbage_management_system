import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wasteSchedule' element={<WasteSchedule />} />
            <Route path='/allSchedules' element={<AllSchedules />} />
            <Route path='/wasteLevels' element={<WasteLevels />} />

            {/* admin routes */}
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
