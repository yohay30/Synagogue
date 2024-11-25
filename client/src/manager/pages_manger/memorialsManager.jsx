import React, { useState, useEffect } from "react";
import NavbarManager from '../components_manager/navbarManager';

const Memorials_manager = () => {
  const [memorials, setMemorials] = useState([]);
  const [editMemorial, setEditMemorial] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemorial, setNewMemorial] = useState({
    deceased_name: "",
    hebrew_date: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        const response = await fetch("http://localhost:5000/memorials-manager");
        const data = await response.json();
        setMemorials(data);
      } catch (error) {
        console.error("Error fetching memorials:", error);
      }
    };
    fetchMemorials();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/memorials-manager/${editMemorial.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editMemorial),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: failed to update memorial with ID ${editMemorial.id}`);
      }

      setMemorials((prevMemorials) =>
        prevMemorials.map((memorial) =>
          memorial.id === editMemorial.id ? { ...memorial, ...editMemorial } : memorial
        )
      );
      setEditMemorial(null);
    } catch (error) {
      console.error("Error updating memorial:", error);
    }
    alert("האזכרה עודכנה בהצלחה!");
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את האזכרה?")) {
      try {
        await fetch(`http://localhost:5000/memorials-manager/${id}`, {
          method: "DELETE",
        });
        setMemorials((prevMemorials) =>
          prevMemorials.filter((memorial) => memorial.id !== id)
        );
      } catch (error) {
        console.error("Error deleting memorial:", error);
      }
    }
  };

  const handleSaveNewMemorial = async () => {
    try {
      const response = await fetch("http://localhost:5000/memorials-manager/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMemorial),
      });

      if (!response.ok) throw new Error("Failed to add new memorial");

      const data = await response.json();
      setMemorials((prevMemorials) => [...prevMemorials, data]);
      alert("האזכרה החדשה נוספה בהצלחה!");
      setShowAddForm(false);
      setNewMemorial({ deceased_name: "", hebrew_date: "", date: "", notes: "" });
    } catch (error) {
      console.error("Error adding new memorial:", error);
    }
  };

  return (
    <div dir="rtl">
      <NavbarManager />
      <div style={{ height: "150px" }}></div>
      <div>
        <h1>לוח אזכרות</h1>
        <div>
          <button onClick={() => setShowAddForm(true)}>הוסף נפטר/ת</button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h2>הוסף אזכרה חדשה</h2>
          <label>שם המנוח:</label>
          <input
            value={newMemorial.deceased_name}
            onChange={(e) => setNewMemorial({ ...newMemorial, deceased_name: e.target.value })}
          />
          <label>תאריך עברי:</label>
          <input
            value={newMemorial.hebrew_date}
            onChange={(e) => setNewMemorial({ ...newMemorial, hebrew_date: e.target.value })}
          />
          <label>תאריך לועזי:</label>
          <input
            value={newMemorial.date}
            onChange={(e) => setNewMemorial({ ...newMemorial, date: e.target.value })}
          />
          <label>הערות:</label>
          <input
            value={newMemorial.notes}
            onChange={(e) => setNewMemorial({ ...newMemorial, notes: e.target.value })}
          />
          <button onClick={handleSaveNewMemorial}>שמור אזכרה</button>
          <button onClick={() => setShowAddForm(false)}>סגור</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>שם המנוח</th>
            <th>תאריך עברי</th>
            <th>תאריך לועזי</th>
            <th>הערות</th>
            <th>ערוך</th>
            <th>מחק</th>
          </tr>
        </thead>
        <tbody>
          {memorials.map((memorial, index) => (
            <tr key={memorial.id}>
              <td>{index + 1}</td>
              <td>{memorial.deceased_name}</td>
              <td>{memorial.hebrew_date}</td>
              <td>{memorial.date}</td>
              <td>{memorial.notes}</td>
              <td>
                <button onClick={() => setEditMemorial(memorial)}>ערוך</button>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteClick(memorial.id)}>
                  מחק
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMemorial && (
        <div className="edit-modal">
          <h2>עריכת אזכרה</h2>
          <label>שם המנוח:</label>
          <input
            value={editMemorial.deceased_name}
            onChange={(e) =>
              setEditMemorial({ ...editMemorial, deceased_name: e.target.value })
            }
          />
          <label>תאריך עברי:</label>
          <input
            value={editMemorial.hebrew_date}
            onChange={(e) =>
              setEditMemorial({ ...editMemorial, hebrew_date: e.target.value })
            }
          />
          <label>תאריך לועזי:</label>
          <input
            value={editMemorial.date}
            onChange={(e) => setEditMemorial({ ...editMemorial, date: e.target.value })}
          />
          <label>הערות:</label>
          <input
            value={editMemorial.notes}
            onChange={(e) => setEditMemorial({ ...editMemorial, notes: e.target.value })}
          />
          <button onClick={handleSaveChanges}>שמור שינויים</button>
          <button onClick={() => setEditMemorial(null)}>סגור</button>
        </div>
      )}
    </div>
  );
};

export default Memorials_manager;
