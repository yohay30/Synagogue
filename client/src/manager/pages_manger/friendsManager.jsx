// src/pages_manager/FriendsManager.js

import React, { useEffect, useState } from "react";
import AddNewFriend from "../components_manager/addNewFriend";
import NavbarManager from "../components_manager/navbarManager";
import Footer from "../components_manager/footer";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import "../../assets/styles/styleManager/stylePages_manager/friendsManager.css";

const FriendsManager = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMember, setEditMember] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    is_admin: 0,
    id_number: "",
    chair_number: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/friends-manager");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = members.filter(
      (member) =>
        member.first_name.toLowerCase().includes(query) ||
        member.last_name.toLowerCase().includes(query) ||
        member.phone.includes(query)
    );

    setFilteredMembers(filtered);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/friends-manager/${editMember.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editMember),
        }
      );
      if (!response.ok) throw new Error(`Error updating member`);
      const data = await response.json();
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === editMember.id ? { ...member, ...editMember } : member
        )
      );
      setEditMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
    }
    alert("פרטי החבר עודכנו בהצלחה!");
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את החבר?")) {
      try {
        await fetch(`http://localhost:5000/friends-manager/${id}`, {
          method: "DELETE",
        });
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
        setFilteredMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleEditClick = (member) => setEditMember(member);

  const handleSaveNewMember = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/friends-manager/add/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        }
      );
      if (!response.ok) throw new Error("Failed to add new member");
      const data = await response.json();
      alert("חבר חדש נוספה בהצלחה!");
      setMembers((prevMembers) => [...prevMembers, data]);
      setFilteredMembers((prevMembers) => [...prevMembers, data]);
      setShowAddForm(false);
      setNewMember({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        is_admin: 0,
        id_number: "",
        chair_number: "",
      });
    } catch (error) {
      console.error("Error adding new member:", error);
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
          <h1>חברים בקהילה</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="חפש לפי שם פרטי, משפחה או פלאפון..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="btn-container">
            <button className="add-button" onClick={handleAddClick}>
              הוסף חבר חדש
            </button>
          </div>
        </div>

        {showAddForm && (
          <AddNewFriend
            newMember={newMember}
            setNewMember={setNewMember}
            handleSaveNewMember={handleSaveNewMember}
            setShowAddForm={setShowAddForm}
          />
        )}

        <table className="table-container">
          <thead className="thead">
            <tr>
              <th></th>
              <th rowSpan="2">שם פרטי</th>
              <th>שם משפחה</th>
              <th>טלפון</th>
              <th>אימייל</th>
              <th>כתובת</th>
              <th>כיסא מספר</th>
              <th>מנהל</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={member.id}>
                <td>
                  <strong>{index + 1}</strong>
                </td>
                <td>{member.first_name}</td>
                <td>{member.last_name}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.address}</td>
                <td>{member.chair_number}</td>
                <td>{member.is_admin === 1 ? "כן" : "לא"}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(member)}
                  >
                    <MdOutlineModeEditOutline size={16} />
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(member.id)}
                  >
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMember && (
          <>
            {editMember && (
              <>
                <div className="overlay" onClick={() => setEditMember(null)}>
                </div>
                <div className="edit-modal">
                  <h2>עריכת חבר</h2>
                  <form className="form-grid">
                    <div>
                      <label>שם פרטי:</label>
                      <input
                        value={editMember.first_name}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>שם משפחה:</label>
                      <input
                        value={editMember.last_name}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>טלפון:</label>
                      <input
                        value={editMember.phone}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>אימייל:</label>
                      <input
                        value={editMember.email}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>כתובת:</label>
                      <input
                        value={editMember.address}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>מספר זהות:</label>
                      <input
                        value={editMember.id_number}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            id_number: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>סיסמה:</label>
                      <input
                        value={editMember.password}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label>כיסא מספר:</label>
                      <input
                        value={editMember?.chair_number || ""}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            chair_number: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>מנהל:</label>
                      <input
                        type="checkbox"
                        checked={editMember.is_admin === 1}
                        onChange={(e) =>
                          setEditMember({
                            ...editMember,
                            is_admin: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={handleSaveChanges}>
                        שמור שינויים
                      </button>
                      <button type="button" onClick={() => setEditMember(null)}>
                        ביטול
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </>
        )}

        <div style={{ height: "50px" }}></div>
        <Footer className="footer" />
      </div>
    </div>
  );
};

export default FriendsManager;
