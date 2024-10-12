import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from './pages/Hello';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hello />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
