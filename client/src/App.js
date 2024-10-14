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

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wasteSchedule' element={<WasteSchedule />} />
        <Route path='/allSchedules' element={<AllSchedules />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
