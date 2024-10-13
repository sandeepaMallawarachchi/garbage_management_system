import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import FeeManage from "./pages/feemanage";

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
        <Route path="/feemanage" element={<FeeManage />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
