import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Home from "../../src/user/pages/home.js";
import About from '../../src/user/pages/about.js';
import Contact from "../../src/user/pages/contact.js";
import Login from "../../src/user/pages/login.js";

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
