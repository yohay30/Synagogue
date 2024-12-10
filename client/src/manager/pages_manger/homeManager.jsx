import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import AdminDashboard from "../components_manager/adminDashboard.jsx";
import Footer from "../components_manager/footer";
import "../../assets/styles/styleManager/baseCssManager/tablesAndTitles.css";
import "../../assets/styles/styleManager/baseCssManager/buttonsAndInputs.css";
import "../../assets/styles/styleManager/baseCssManager/baseAndDivs.css";
// import "../../assets/styles/styleManager/stylePages_manager/homeManager.css";
const Home_manager = () => {
  return (
    <div className="base-manager" dir="rtl">
      <header>
        <NavbarManager />
      </header>

      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "50px" }}></div>

        <div className="title-header">
          <AdminDashboard /></div>

        <div className="title-header">
          <h1 > לוח שיעורים שבועי קומפוננטה</h1>
        </div>

        <div className="title-header">
          <h1> לוח הודעות שבועי היום קומפוננטה</h1>
        </div>
        <div style={{ height: "50px" }}></div>
        
        <Footer className="footer" />
      </div>
    </div>
  );
};
export default Home_manager;
