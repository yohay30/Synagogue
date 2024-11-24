import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/styleManager/styleComponents_manager/navbar_manager.css";
const NavbarManager = () => {
  return (
    <nav className="navbar_manager" dir="rtl">
      <h1 style={{ fontSize: "30px", color: "white" }}>
        {localStorage.getItem("username")} ברוך הבא
      </h1>
      <Link to="/home-manager">ראשי</Link>
      <Link to="/main-board">לוח תצוגה </Link>
      <Link to="/prayers-manager">תפילות </Link>
      <Link to="/lessons-manager">שיעורים </Link>
      <Link to="/massages-manager">הודעות</Link>
      <Link to="/events-manager">ארועים</Link>
      <Link to="/memorials-manager">אזכרות</Link>
      <Link to="/friends-manager">חברים בקהילה</Link>
      <Link to="/chairs-manager">כיסאות </Link>
      <Link to="/contact-manager">צור קשר</Link>
      <Link to="/about-manager">אודות</Link>
      <Link to="/halacha-manager">הלכות</Link>
      <Link to="/">התנתק </Link>
    </nav>
  );
};
export default NavbarManager;
