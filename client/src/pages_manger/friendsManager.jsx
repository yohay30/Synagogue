import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import "../assets/styles/stylePages_manager/friendsManager.css";

const FriendsManager = () => {
  const [members, setMembers] = useState([]);

  // קבלת רשימת חברים
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/friends-manager");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // פונקציה לעדכון סטטוס מנהל
  const handleAdminChange = async (id, isAdmin) => {
    try {
      await fetch(`http://localhost:5000/friends-manager/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_admin: isAdmin ? 1 : 0 }),
      });

      // עדכון במצב הקומפוננטה
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, is_admin: isAdmin ? 1 : 0 } : member
        )
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  return (
    <div>
      <header>
        <NavbarManager />
      </header>

      <div className="friends_manager" dir="rtl">
        <div style={{ height: "150px" }}></div>

        <div>
          <div className="title">
            <h1>חברים בקהילה</h1>
            <div className="btn-container">
              <button>הוסף</button>
              <button class="search-button">
                <span class="search-icon">🔍</span>
                חפש
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: "50px" }}></div>

        <table className="table-container">
          <thead className="thead" dir="rtl">
            <tr dir="rtl">
              <th></th>
              <th> פרטי</th>
              <th> משפחה</th>
              <th>מס זהות</th>
              <th>טלפון</th>
              <th>אימייל</th>
              <th>סיסמה</th>
              <th>כתובת</th>
              <th>מנהל</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <strong>{index + 1}</strong>
                </td>
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
                  {" "}
                  <button>ערוך </button>
                </td>
                <td>
                  {" "}
                  <button>מחק </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FriendsManager;
