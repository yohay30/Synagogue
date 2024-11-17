import React from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/styleUser/styleUserComponents/navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar" dir="rtl">
      <h1 style={{fontSize: "30px", color:"white"}}> {localStorage.getItem('username')} ברוך הבא</h1>
      <Link to="/home">ראשי</Link>
      <Link to="/about">אודות</Link>
      <Link to="/contact">צור קשר</Link>
      <Link to="/login">התנתק </Link>
    </nav>
  );
};
export default Navbar;