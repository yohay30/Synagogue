import React from "react";
import Watch from "../../mainBoard/components_main_board/watch";
import "../../assets/styles/styleMainBord/styleMainBordPage/mainBoard.css";
import Zemanim from "../components_main_board/zemanim";
import PrayersShow from "../components_main_board/prayersShow";
import ShabbatTimes from "../components_main_board/shabbatTimes";
const MainBoard = () => {
  return (
    <div dir="rtl" className="main-zemanim">
     
      <h1>לוח תצוגה ראשי</h1>

      <div className="zemanim">

        <Watch  />
        <PrayersShow />
        <Zemanim />
        <ShabbatTimes />
      </div>
    </div>
  );
};
export default MainBoard;
