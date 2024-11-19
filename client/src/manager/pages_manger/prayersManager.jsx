import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import "../../assets/styles/styleManager/stylePages_manager/prayersManager.css";

const PrayersManager = () => {
  const [prayers, setPrayers] = useState([]);
  const [editPrayer, setEditPrayer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrayer, setNewPrayer] = useState({
    Prayer_Type: "",
    Time: "",
    Prayer_Date: "",
    Location: "",
    Hebrew_Date: "",
    Description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/prayers-manager");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPrayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

      const data = await response.json();
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

  const handleEditClick = (prayer) => setEditPrayer(prayer);

  const handleSaveNewPrayer = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/prayers-manager/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPrayer),
        }
      );

      if (!response.ok) throw new Error("Failed to add new prayer");
      const data = await response.json();
      alert("תפילה חדשה נוספה בהצלחה!");

      setPrayers((prevPrayers) => [...prevPrayers, data]);
      setShowAddForm(false);
      setNewPrayer({
        Prayer_Type: "",
        Time: "",
        Prayer_Date: "",
        Location: "",
        Hebrew_Date: "",
        Description: "",
      });
    } catch (error) {
      console.error("Error adding new prayer:", error);
    }
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

        {showAddForm && (
          <div>
            <label>סוג תפילה:</label>
            <input
              value={newPrayer.Prayer_Type}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, Prayer_Type: e.target.value })
              }
            />
            <label>שעת תפילה:</label>
            <input
              value={newPrayer.Time}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, Time: e.target.value })
              }
            />
            <label>תאריך תפילה:</label>
            <input
              value={newPrayer.Prayer_Date}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, Prayer_Date: e.target.value })
              }
            />
            <label>מיקום תפילה:</label>
            <input
              value={newPrayer.Location}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, Location: e.target.value })
              }
            />
            <label>תאריך עברי:</label>
            <input
              value={newPrayer.Hebrew_Date}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, Hebrew_Date: e.target.value })
              }
            />
            <label>תיאור:</label>
            <textarea
              value={newPrayer.Description}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, Description: e.target.value })
              }
            />
            <button onClick={handleSaveNewPrayer}>שמור תפילה</button>
            <button onClick={() => setShowAddForm(false)}>סגור</button>
          </div>
        )}

        <table className="table-container">
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
          {prayers.map((prayer) => (
  <tr key={prayer.id}> {/* כל תג tr לא יכיל רווחים או טקסט ריק */}
    <td><strong>{prayer.index}</strong></td>
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
              <textarea
                value={editPrayer.Description}
                onChange={(e) =>
                  setEditPrayer({ ...editPrayer, Description: e.target.value })
                }
              />
            </div>
            <button onClick={handleSaveChanges}>שמור שינויים</button>
            <button onClick={() => setEditPrayer(null)}>סגור</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayersManager;
