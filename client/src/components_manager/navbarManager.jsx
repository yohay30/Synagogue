import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/styleComponents_manager/navbar_manager.css";
const NavbarManager = () => {
  return (
    <nav className="navbar_manager" dir="rtl">
      <h1 style={{ fontSize: "30px", color: "white" }}>
        {" "}
        {localStorage.getItem("username")} ברוך הבא
      </h1>
      <Link to="/home_manager">ראשי</Link>
      <Link to="/main_board">לוח תצוגה ראשי</Link>
      <Link to="/prayers_manager">תפילות </Link>
      <Link to="/lessons_manager">שיעורים </Link>
      <Link to="/massages_manager">הודעות</Link>
      <Link to="/events_manager">ארועים</Link>
      <Link to="/memorials_manager">אזכרות</Link>
      <Link to="/friends-manager">חברים בקהילה</Link>
      <Link to="/chairs_manager">כיסאות </Link>
      <Link to="/contact_manager">צור קשר</Link>
      <Link to="/about_manager">אודות</Link>
      <Link to="/halacha_manager">הלכות</Link>
      <Link to="/">התנתק </Link>
    </nav>
  );
};
export default NavbarManager;
