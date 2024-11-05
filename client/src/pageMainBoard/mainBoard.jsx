import React from "react";
import NavbarManager from "../components_manager/navbarManager";
import ShabbatTimes from "./components_main_board/shabbatTimes";

const MainBoard = () => {
  return (
    <div>
      <NavbarManager />
      <h1>לוח תצוגה ראשי</h1>
      <div>
        <ShabbatTimes />
      </div>
    </div>
  );
};
export default MainBoard;
