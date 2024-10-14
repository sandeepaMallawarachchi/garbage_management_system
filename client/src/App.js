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

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wasteSchedule' element={<WasteSchedule />} />
        <Route path='/allSchedules' element={<AllSchedules />} />
        <Route path='/wasteLevels' element={<WasteLevels />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
