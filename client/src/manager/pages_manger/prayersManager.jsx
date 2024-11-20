import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import "../../assets/styles/styleManager/stylePages_manager/prayersManager.css";
import AddNewPrayer from "../components_manager/addNewprayers";

const PrayersManager = () => {
  const [prayers, setPrayers] = useState([]);
  const [editPrayer, setEditPrayer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [shaharit, setShaharit] = useState([]);
  const [mincha, setMincha] = useState([]);
  const [arvit, setArvit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/prayers-manager");
        const data = await response.json();
        console.log("Fetched prayers:", data); // בדיקה
        setPrayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // מוודא שברגע שהנתונים מתעדכנים, נוודא שאנחנו ממיינים את התפילות לפי סוג
    setShaharit(prayers.filter((prayer) => prayer.Prayer_Type === "שחרית"));
    setMincha(prayers.filter((prayer) => prayer.Prayer_Type === "מנחה"));
    setArvit(prayers.filter((prayer) => prayer.Prayer_Type === "ערבית"));
  }, [prayers]);

  const refreshPrayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/prayers-manager");
      if (!response.ok) throw new Error("Failed to refresh prayers");
      const data = await response.json();
      setPrayers(data);
    } catch (error) {
      console.error("Error refreshing prayers:", error);
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

      if (!response.ok) {
        throw new Error(
          `Error: failed to update prayer with ID ${editPrayer.id}`
        );
      }

      setPrayers((prevPrayers) =>
        prevPrayers.map((prayer) =>
          prayer.id === editPrayer.id ? { ...prayer, ...editPrayer } : prayer
        )
      );
      setEditPrayer(null);
    } catch (error) {
      console.error("Error updating prayer:", error);
    }
    alert("התפילה עודכנה בהצלחה!");
  };

  const handleDeleteClick = async (id) => {
    console.log("Deleting prayer with ID:", id); // בדיקת הערך
    if (window.confirm("האם אתה בטוח שברצונך למחוק את התפילה?")) {
      try {
        await fetch(`http://localhost:5000/prayers-manager/${id}`, {
          method: "DELETE",
        });
        setPrayers((prevPrayers) =>
          prevPrayers.filter((prayer) => prayer.id !== id)
        );
      } catch (error) {
        console.error("Error deleting prayer:", error);
      }
    }
  };

  const handleEditClick = (prayer) => {
    setEditPrayer(prayer);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  return (
    <div>
      <header>
        <NavbarManager />
      </header>

      <div className="prayers_manager" dir="rtl">
        <div style={{ height: "150px" }}></div>

        <div className="title">
          <h1>ניהול תפילות</h1>
          <div className="btn-container">
            <button onClick={handleAddClick}>הוסף תפילה חדשה</button>
          </div>
        </div>

        {/* דיב של תפילות שחרית */}
        <div>
          <h2>שחרית</h2>
          {shaharit.map((prayer, index) => (
            <div key={index}>
              <p>תפילה: {prayer.Prayer_Type}</p>
              <p>שעה: {prayer.Time}</p>
              <button onClick={() => handleEditClick(prayer)}>ערוך</button>
              <button onClick={() => handleDeleteClick(prayer.id)}>מחק</button>
            </div>
          ))}
        </div>

        {/* דיב של תפילות מנחה */}
        <div>
          <h2>מנחה</h2>
          {mincha.map((prayer, index) => (
            <div key={index}>
              <p>תפילה: {prayer.Prayer_Type}</p>
              <p>שעה: {prayer.Time}</p>
              <button onClick={() => handleEditClick(prayer)}>ערוך</button>
              <button onClick={() => handleDeleteClick(prayer.id)}>מחק</button>
            </div>
          ))}
        </div>

        {/* דיב של תפילות ערבית */}
        <div>
          <h2>ערבית</h2>
          {arvit.map((prayer, index) => (
            <div key={index}>
              <p>תפילה: {prayer.Prayer_Type}</p>
              <p>שעה: {prayer.Time}</p>
              <button onClick={() => handleEditClick(prayer)}>ערוך</button>
              <button onClick={() => handleDeleteClick(prayer.id)}>מחק</button>
            </div>
          ))}
        </div>

        {showAddForm && (
          <AddNewPrayer
            setShowAddForm={setShowAddForm}
            refreshPrayers={refreshPrayers}
          />
        )}

        {/* טבלה לתפילות */}
        <table className="table-container-shaharit">
          <thead>
            <tr>
              <th>#</th>
              <th>סוג תפילה</th>
              <th>שעת תפילה</th>
              <th>תאריך תפילה</th>
              <th>מיקום תפילה</th>
              <th>תאריך עברי</th>
              <th>תיאור</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {prayers.map((prayer, index) => (
              <tr key={prayer.id}>
                <td>{index + 1}</td>
                <td>{prayer.Prayer_Type}</td>
                <td>{prayer.Time}</td>
                <td>{prayer.Prayer_Date}</td>
                <td>{prayer.Location}</td>
                <td>{prayer.Hebrew_Date}</td>
                <td>{prayer.Description}</td>
                <td>
                  <button onClick={() => handleEditClick(prayer)}>ערוך</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(prayer.id)}>מחק</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
