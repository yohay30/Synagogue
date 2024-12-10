import React from "react";
import NavbarManager from '../components_manager/navbarManager';
import "../../assets/styles/styleManager/baseCssManager/tablesAndTitles.css";
import "../../assets/styles/styleManager/baseCssManager/buttonsAndInputs.css";
import "../../assets/styles/styleManager/baseCssManager/baseAndDivs.css";

export default function Halacha_manager() {
    return (
        <div className="base-manager-container">
            <NavbarManager />
            <h1 >הלכה </h1>
        </div>
    );
};