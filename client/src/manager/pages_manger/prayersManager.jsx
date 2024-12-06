import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import AddNewPrayer from "../components_manager/addNewPrayer"
import "../../assets/styles/styleManager/stylePages_manager/prayersManager.css";
import Footer from "../components_manager/footer";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

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
      <tbody>
        {prayerTypes.map((prayerType) => (
          <>
            <tr className="table-section-header">
              <td colSpan="1">
                <strong className="section-header">{prayerType}</strong>
              </td>
            </tr>
            {prayers
              .filter(
                (prayer) =>
                  prayer.Day_Type === dayType &&
                  prayer.Prayer_Type === prayerType
              )
              .sort((a, b) => {
                const [hoursA, minutesA] = a.Time.split(":").map(Number);
                const [hoursB, minutesB] = b.Time.split(":").map(Number);
                return hoursA - hoursB || minutesA - minutesB;
              })
              .map((prayer, index) => (
                <tr key={index} className="table-row">
                  <td>
                    <strong>{index + 1}</strong>
                  </td>
                  <td>{prayer.Time}</td>
                  <td>{prayer.Location}</td>
                  <td>{prayer.Description}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(prayer)}
                    >
                      <MdOutlineModeEditOutline size={16} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(prayer.id)}
                    >
                      <MdOutlineDeleteOutline size={16} />
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
          <strong>
            <h1>תפילות</h1>
          </strong>
          <button className="add-button" onClick={() => setShowAddForm(true)}>
            הוסף תפילה
          </button>
        </div>
        <div>
          {showAddForm && (
            <>
              <div style={{ height: "30px" }}></div>
              <AddNewPrayer
                setShowAddForm={setShowAddForm}
                refreshPrayers={fetchPrayers}
              />
              <div style={{ height: "30px" }}></div>
            </>
          )}
        </div>

        <h2 className="title-header"> חול</h2>
        {renderPrayerTable("חול", ["שחרית", "מנחה", "ערבית"])}
        <div style={{ height: "50px" }}></div>

        <h2 className="title-header"> שבת</h2>
        {renderPrayerTable("שבת", ["שחרית", "מנחה", "ערבית"])}
        <div style={{ height: "50px" }}></div>

        <h2 className="title-header">חג </h2>

        {renderPrayerTable("חג", ["שחרית", "מנחה", "ערבית"])}

        {editPrayer && (
          <>
            <div className="overlay" onClick={() => setEditPrayer(null)}></div>
            <div className="edit-modal">
              <h2>עריכת תפילה</h2>
              <form className="form-grid">
                <div>
                  <label>סוג תפילה:</label>
                  <select
                    className="select"
                    value={editPrayer.Prayer_Type}
                    onChange={(e) => {
                      setEditPrayer({
                        ...editPrayer,
                        Prayer_Type: e.target.value,
                      });
                    }}
                  >
                    <option value="חול">חול</option>
                    <option value="שבת">שבת</option>
                    <option value="חג">חג</option>
                    <option value="צום">צום</option>
                    <option value="חול המועד">חול המועד</option>
                    <option value="חנוכה">חנוכה</option>
                    <option value="פורים">פורים</option>
                  </select>
                </div>
                <div>
                  <label>שעת תפילה:</label>
                  <input
                    value={editPrayer.Time}
                    onChange={(e) =>
                      setEditPrayer({ ...editPrayer, Time: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>תאריך תפילה:</label>
                  <input
                    value={editPrayer.Prayer_Date}
                    onChange={(e) =>
                      setEditPrayer({
                        ...editPrayer,
                        Prayer_Date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>מיקום תפילה:</label>
                  <input
                    value={editPrayer.Location}
                    onChange={(e) =>
                      setEditPrayer({ ...editPrayer, Location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>תאריך עברי:</label>
                  <input
                    value={editPrayer.Hebrew_Date}
                    onChange={(e) =>
                      setEditPrayer({
                        ...editPrayer,
                        Hebrew_Date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>תיאור:</label>
                  <input
                    value={editPrayer.Description}
                    onChange={(e) =>
                      setEditPrayer({
                        ...editPrayer,
                        Description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleSaveChanges}>
                    שמור שינויים
                  </button>
                  <button type="button" onClick={() => setEditPrayer(null)}>
                    ביטול
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        <div style={{ height: "50px" }}></div>
        <Footer className="footer" />
      </div>
    </div>
  );
};

export default PrayersManager;
