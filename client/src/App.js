import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import React from "react";

//header and footer
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";

//pages
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
