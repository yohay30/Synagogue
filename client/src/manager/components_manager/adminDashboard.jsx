import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import AddNewEvent from "../components_manager/addNewEvent";
import AddNewFriend from "../components_manager/addNewFriend";
import AddNewLesson from "../components_manager/addNewLesson";
import AddNewMessage from "../components_manager/addNewMassage.jsx";
import AddNewMemorial from "../components_manager/addNewMemorial";
import AddNewPrayer from "../components_manager/addNewPrayer";
import "../../assets/styles/styleManager/baseCssManager/tablesAndTitles.css";
import "../../assets/styles/styleManager/baseCssManager/buttonsAndInputs.css";
import "../../assets/styles/styleManager/baseCssManager/baseAndDivs.css";
function AdminDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentForm, setCurrentForm] = useState(""); // לניהול איזה טופס להציג

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowAddForm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleShowForm = (formType) => {
    setCurrentForm(formType);
    setShowAddForm(true);
  };

  return (
    <div className="admin-dashboard" dir="rtl">
      <header>
        <NavbarManager />
      </header>
      <div className="content">

          <div className="btn-container-manager">
            <button
              className="add-button"
              onClick={() => handleShowForm("prayer")}
            >
              הוסף תפילה
            </button>
            <button
              className="add-button"
              onClick={() => handleShowForm("lesson")}
            >
              הוסף שיעור
            </button>
            <button
              className="add-button"
              onClick={() => handleShowForm("event")}
            >
              הוסף אירוע
            </button>
            <button
              className="add-button"
              onClick={() => handleShowForm("friend")}
            >
              הוסף חבר
            </button>
            <button
              className="add-button"
              onClick={() => handleShowForm("message")}
            >
              הוסף הודעה
            </button>
            <button
              className="add-button"
              onClick={() => handleShowForm("memorial")}
            >
              הוסף אזכרה
            </button>
          </div>
        
       

        {showAddForm && (
          <div className="add-form-modal">
            <div
              className="overlay"
              onClick={() => setShowAddForm(false)}
            ></div>
            <div className="edit-modal">
              {currentForm === "prayer" && <AddNewPrayer />}
              {currentForm === "lesson" && <AddNewLesson />}
              {currentForm === "event" && <AddNewEvent />}
              {currentForm === "friend" && <AddNewFriend />}
              {currentForm === "message" && <AddNewMessage />}
              {currentForm === "memorial" && <AddNewMemorial />}
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
