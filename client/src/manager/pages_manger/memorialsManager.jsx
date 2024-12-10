import React, { useState, useEffect } from "react";
import NavbarManager from "../components_manager/navbarManager";
import Footer from "../components_manager/footer";
import AddNewMemorial from "../components_manager/addNewMemorial";
// import "../../assets/styles/styleManager/stylePages_manager/memorialsManager.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

const MemorialsManager = () => {
  const [memorials, setMemorials] = useState([]);
  const [filteredMemorials, setFilteredMemorials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMemorial, setEditMemorial] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemorial, setNewMemorial] = useState({
    deceased_name: "",
    hebrew_date: "",
    date: "",
    notes: "",
  });
  const fetchMemorials = async () => {
    try {
      const response = await fetch("http://localhost:5000/memorials-manager");
      const data = await response.json();
      setMemorials(data);
      setFilteredMemorials(data);
    } catch (error) {
      console.error("Error fetching memorials:", error);
    }
  };
  useEffect(() => {
    fetchMemorials();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = memorials.filter(
      (memorial) =>
        memorial.deceased_name.toLowerCase().includes(query) ||
        memorial.hebrew_date.includes(query) ||
        memorial.date.includes(query)
    );

    setFilteredMemorials(filtered);
  };

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
      if (!response.ok) throw new Error("Failed to update memorial");

      setMemorials((prevMemorials) =>
        prevMemorials.map((memorial) =>
          memorial.id === editMemorial.id
            ? { ...memorial, ...editMemorial }
            : memorial
        )
      );
      setEditMemorial(null);
      alert("האזכרה עודכנה בהצלחה!");
    } catch (error) {
      console.error("Error updating memorial:", error);
    }
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
        setFilteredMemorials((prevMemorials) =>
          prevMemorials.filter((memorial) => memorial.id !== id)
        );
      } catch (error) {
        console.error("Error deleting memorial:", error);
      }
    }
  };

  const handleSaveNewMemorial = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/memorials-manager/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMemorial),
        }
      );

      if (!response.ok) throw new Error("Failed to add new memorial");

      const data = await response.json();
      setMemorials((prevMemorials) => [...prevMemorials, data]);
      setFilteredMemorials((prevMemorials) => [...prevMemorials, data]);
      alert("האזכרה החדשה נוספה בהצלחה!");
      setShowAddForm(false);
      setNewMemorial({
        deceased_name: "",
        hebrew_date: "",
        date: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding new memorial:", error);
    }
  };

  const handleAddClick = () => setShowAddForm(true);

  return (
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>

      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>

        <div className="title">
          <h1>לוח אזכרות</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="חפש לפי שם מנוח, תאריך עברי, תאריך לועזי..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="btn-container">
            <button
              className="add-button"
              onClick={() => {
                handleAddClick(); // קריאה לפונקציה שמוסיפה חבר חדש
                window.scrollTo({ top: 0, behavior: "smooth" }); // גלילה לראש העמוד
              }}
            >
              הוסף חבר חדש
            </button>
          </div>
        </div>

        {showAddForm && (
          <AddNewMemorial
            setShowAddForm={setShowAddForm}
            handleSaveNewMemorial={handleSaveNewMemorial}
            newMemorial={newMemorial}
            setNewMemorial={setNewMemorial}
            refreshLessons={fetchMemorials}
          />
        )}

        <table className="table-container">
          <thead className="thead">
            <tr>
              <th></th>
              <th>שם המנוח</th>
              <th>תאריך עברי</th>
              <th>תאריך לועזי</th>
              <th>הערות</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemorials.map((memorial, index) => (
              <tr key={memorial.id}>
                <td>
                  <strong>{index + 1}</strong>
                </td>
                <td>{memorial.deceased_name}</td>
                <td>{memorial.hebrew_date}</td>
                <td>{memorial.date}</td>
                <td>{memorial.notes}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => setEditMemorial(memorial)}
                  >
                    <MdOutlineModeEditOutline size={16} />
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(memorial.id)}
                  >
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMemorial && (
          <div>
            <div
              className="overlay"
              onClick={() => setEditMemorial(null)}
            ></div>
            <div className="edit-modal">
              <h2>עריכת אזכרה</h2>
              <form className="form-grid">
                <div>
                  <label>שם המנוח:</label>
                  <input
                    value={editMemorial.deceased_name}
                    onChange={(e) =>
                      setEditMemorial({
                        ...editMemorial,
                        deceased_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>תאריך עברי:</label>
                  <input
                    value={editMemorial.hebrew_date}
                    onChange={(e) =>
                      setEditMemorial({
                        ...editMemorial,
                        hebrew_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>תאריך לועזי:</label>
                  <input
                    value={editMemorial.date}
                    onChange={(e) =>
                      setEditMemorial({
                        ...editMemorial,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>הערות:</label>
                  <input
                    value={editMemorial.notes}
                    onChange={(e) =>
                      setEditMemorial({
                        ...editMemorial,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={handleSaveChanges}>
                    שמור שינויים
                  </button>
                  <button type="button" onClick={() => setEditMemorial(null)}>
                    סגור
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div style={{ height: "50px" }}></div>
        <Footer />
      </div>
    </div>
  );
};

export default MemorialsManager;
