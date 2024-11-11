import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import "../assets/styles/stylePages_manager/friendsManager.css";

const FriendsManager = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null); // לחבר שאותו עורכים
  const [showAddForm, setShowAddForm] = useState(false); // נכון / לא נכון אם הטופס להוספה פתוח
  const [newMember, setNewMember] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    is_admin: 0,
    id_number: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/friends-manager");
        if (!response.ok) {
          throw new Error("Network response was not ok in fetchData file friendsManager");
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/friends-manager/${editMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: editMember.first_name,
          last_name: editMember.last_name,
          phone: editMember.phone,
          email: editMember.email,
          address: editMember.address,
          is_admin: editMember.is_admin,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: failed to update member with ID ${editMember.id}`);
      }
  
      const data = await response.json();
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === editMember.id ? { ...member, ...editMember } : member
        )
      );
      
      setEditMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את החבר?")) {
      try {
        await fetch(`http://localhost:5000/friends-manager/${id}`, {
          method: "DELETE",
        });
        setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleAdminChange = async (id, isAdmin) => {
    try {
      await fetch(`http://localhost:5000/friends-manager/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_admin: isAdmin ? 1 : 0 }),
      });

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, is_admin: isAdmin ? 1 : 0 } : member
        )
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  const handleEditClick = (member) => {
    setEditMember(member); 
  };

  const handleSaveNewMember = async () => {
    try {
      const response = await fetch("http://localhost:5000/friends-manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error("Failed to add new member");
      }

      const data = await response.json();
      alert("חבר חדש נוספה בהצלחה!");
      setMembers((prevMembers) => [...prevMembers, data]);
      setShowAddForm(false); // סגור את הטופס אחרי הוספה
      setNewMember({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        is_admin: 0,
        id_number: '',
      });
    } catch (error) {
      console.error("Error adding new member:", error);
    }
  };

  const handleAddClick = () => {
    setShowAddForm(true); // מציג את הטופס להוספת חבר
  };

  return (
    <div>
      <header>
        <NavbarManager />
      </header>

      <div className="friends_manager" dir="rtl">
        <div style={{ height: "150px" }}></div>

        <div className="title">
          <h1>חברים בקהילה</h1>
          <div className="btn-container">
            <button onClick={handleAddClick}>הוסף חבר חדש</button>
            <button className="search-button">
              <span className="search-icon">🔍</span> חפש
            </button>
          </div>
        </div>

        <table className="table-container">
          <thead className="thead">
            <tr>
              <th></th>
              <th>פרטי</th>
              <th>משפחה</th>
              <th>מס זהות</th>
              <th>טלפון</th>
              <th>אימייל</th>
              <th>סיסמה</th>
              <th>כתובת</th>
              <th>מנהל</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td><strong>{index + 1}</strong></td>
                <td>{member.first_name}</td>
                <td>{member.last_name}</td>
                <td>{member.id_number}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.password}</td>
                <td>{member.address}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={member.is_admin === 1}
                    onChange={(e) =>
                      handleAdminChange(member.id, e.target.checked)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => handleEditClick(member)}>ערוך</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(member.id)}>מחק</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMember && (
          <>
            <div className="modal-overlay" onClick={() => setEditMember(null)}></div>
            <div className="edit-modal">
              <h2>עריכה </h2>
              <label>שם פרטי:</label>
              <input
                value={editMember.first_name}
                onChange={(e) => setEditMember({ ...editMember, first_name: e.target.value })}
              />
              <label>שם משפחה:</label>
              <input
                value={editMember.last_name}
                onChange={(e) => setEditMember({ ...editMember, last_name: e.target.value })}
              />
              <label>טלפון:</label>
              <input
                value={editMember.phone}
                onChange={(e) => setEditMember({ ...editMember, phone: e.target.value })}
              />
              <label>אימייל:</label>
              <input
                value={editMember.email}
                onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
              />
              <label>כתובת:</label>
              <input
                value={editMember.address}
                onChange={(e) => setEditMember({ ...editMember, address: e.target.value })}
              />
              <button onClick={handleSaveChanges}>שמור</button>
              <button onClick={() => setEditMember(null)}>סגור</button>
            </div>
          </>
        )}

        {showAddForm && (
          <>
            <div className="modal-overlay" onClick={() => setShowAddForm(false)}></div>
            <div className="add-modal">
              <h2>הוסף חבר חדש</h2>
              <label>שם פרטי:</label>
              <input
                value={newMember.first_name}
                onChange={(e) => setNewMember({ ...newMember, first_name: e.target.value })}
              />
              <label>שם משפחה:</label>
              <input
                value={newMember.last_name}
                onChange={(e) => setNewMember({ ...newMember, last_name: e.target.value })}
              />
              <label>טלפון:</label>
              <input
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              />
              <label>אימייל:</label>
              <input
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
              <label>כתובת:</label>
              <input
                value={newMember.address}
                onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
              />
              <button onClick={handleSaveNewMember}>שמור</button>
              <button onClick={() => setShowAddForm(false)}>סגור</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsManager;
