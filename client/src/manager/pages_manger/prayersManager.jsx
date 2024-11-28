import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import "../../assets/styles/styleManager/stylePages_manager/prayersManager.css";
import AddNewPrayer from "../components_manager/addNewprayers";

const PrayersManager = () => {
  const [prayers, setPrayers] = useState([]);
  const [editPrayer, setEditPrayer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/prayers-manager");
      const data = await response.json();
      setPrayers(data);
    } catch (error) {
      console.error("Error fetching prayers:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/prayers-manager/${editPrayer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editPrayer),
        }
      );

      if (!response.ok) throw new Error("Failed to update prayer");
      await fetchPrayers();
      setEditPrayer(null);
      alert("התפילה עודכנה בהצלחה!");
    } catch (error) {
      console.error("Error updating prayer:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את התפילה?")) {
      try {
        await fetch(`http://localhost:5000/prayers-manager/${id}`, {
          method: "DELETE",
        });
        await fetchPrayers();
      } catch (error) {
        console.error("Error deleting prayer:", error);
      }
    }
  };

  const handleEditClick = (prayer) => {
    setEditPrayer({ ...prayer });
  };

  const renderPrayerTable = (dayType, prayerTypes) => (
    <table className="table-container">
      <thead className="thead">
        <tr>
          <th></th>
          <th>סוג תפילה</th>
          <th>שעת תפילה</th>
          <th>מיקום תפילה</th>
          <th>תיאור</th>
          <th>ערוך</th>
          <th>מחק</th>
        </tr>
      </thead>
      <tbody>
        {prayerTypes.map((prayerType) => (
          <>
            <tr className="table-section-header">
              <td colSpan="9">
                <strong className="section-header">{prayerType}</strong>
              </td>
            </tr>
            {prayers
              .filter(
                (prayer) =>
                  prayer.Day_Type === dayType &&
                  prayer.Prayer_Type === prayerType
              )
              .map((prayer, index) => (
                <tr key={index} className="table-row">
                   <td>
                  <strong>{index + 1}</strong>
                </td>
                  <td>{prayer.Prayer_Type}</td>
                  <td>{prayer.Time}</td>
                  <td>{prayer.Location}</td>
                  <td>{prayer.Description}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(prayer)}
                    >
                      ערוך
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(prayer.id)}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
          </>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>

      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>

        <div className="title">
          <h1>תפילות </h1>
          
        </div>

        <h2 className="title"> חול 
          <button className="add-button" onClick={() => setShowAddForm(true)}>
              הוסף תפילה
            </button></h2>
        {renderPrayerTable("חול", ["שחרית", "מנחה", "ערבית"])}
        <div style={{ height: "50px" }}></div>

        <h2 className="title"> שבת 
        <button className="add-button" onClick={() => setShowAddForm(true)}>
              הוסף תפילה
            </button>
        </h2>
        {renderPrayerTable("שבת", ["שחרית", "מנחה", "ערבית"])}
        <div style={{ height: "50px" }}></div>

        <h2 className="title">חג <button className="add-button" onClick={() => setShowAddForm(true)}>
              הוסף תפילה
            </button></h2>
        
        {renderPrayerTable("חג", ["שחרית", "מנחה", "ערבית"])}
        {showAddForm && (
          <AddNewPrayer
            setShowAddForm={setShowAddForm}
            refreshPrayers={fetchPrayers}
          />
        )}

        {editPrayer && (
          <div>
            <h2>עריכת תפילה</h2>
            <div>
              <label>סוג תפילה:</label>
              <input
                value={editPrayer.Prayer_Type}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Prayer_Type: e.target.value })
                }
              />
              <label>שעת תפילה:</label>
              <input
                value={editPrayer.Time}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Time: e.target.value })
                }
              />
              <label>תאריך תפילה:</label>
              <input
                value={editPrayer.Prayer_Date}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Prayer_Date: e.target.value })
                }
              />
              <label>מיקום תפילה:</label>
              <input
                value={editPrayer.Location}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Location: e.target.value })
                }
              />
              <label>תאריך עברי:</label>
              <input
                value={editPrayer.Hebrew_Date}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Hebrew_Date: e.target.value })
                }
              />
              <label>תיאור:</label>
              <input
                value={editPrayer.Description}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Description: e.target.value })
                }
              />
              <button onClick={handleSaveChanges}>שמור שינויים</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayersManager;
