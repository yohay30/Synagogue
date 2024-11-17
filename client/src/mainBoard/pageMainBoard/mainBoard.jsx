import React from "react";
import Watch from "../../mainBoard/components_main_board/watch";
import NavbarManager from "../../manager/components_manager/navbarManager";
import "../../assets/styles/styleMainBord/styleMainBordPage/mainBoard.css";
import Zemanim from "../components_main_board/zemanim";

import ShabbatTimes from "../components_main_board/shabbatTimes";
const MainBoard = () => {
  return (
    <div dir="rtl" className="main-zemanim">
      <NavbarManager />
      <h1>לוח תצוגה ראשי</h1>

      <div className="zemanim">
        <Watch />
        <Zemanim />
        <ShabbatTimes />
      </div>
    </div>
  );
};
export default MainBoard;
