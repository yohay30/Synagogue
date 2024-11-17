import React from "react";
import NavbarManager from "../components_manager/navbarManager";
import ShabbatTimes from "./components_main_board/shabbatTimes";
import Zemanim from "../components_manager/zemanim";
const MainBoard = () => {
  return (
    <div dir="rtl">
      <NavbarManager />
      <h1>לוח תצוגה ראשי</h1>
      <div>
        <Zemanim/>
        <ShabbatTimes />
      </div>
    </div>
  );
};
export default MainBoard;
