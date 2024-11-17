import React from "react";
import NavbarManager from "../components_manager/navbarManager";
import AdminDashboard from "../components_manager/adminDashboard";
import "../../assets/styles/styleManager/stylePages_manager/homeManager.css";
const Home_manager = () => {
  return (
    <div className="home_manager" dir="rtl">
      <NavbarManager />
      <AdminDashboard />
      
      <div className="div-prayer">
        <h1> זמני התפילה קומפוננטה</h1>
      </div>
      <br></br>
      <div className="div-lessons">
        <h1> לוח שיעורים שבועי קומפוננטה</h1>
      </div>
      <br></br>
      
      <div className="div-message">
        <h1> לוח הודעות שבועי היום קומפוננטה</h1>
      </div>
    </div>
  );
};
export default Home_manager;
