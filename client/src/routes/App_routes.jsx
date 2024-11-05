import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Home from "../pages/home.js";
import About from "../pages/about.js";
import Contact from "../pages/contact.js";
import Login from "../pages/login.js";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
