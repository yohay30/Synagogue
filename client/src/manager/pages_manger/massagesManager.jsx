import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";

const MassagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: "",
    message: "",
    type: "כללי",
    sender: "",
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/massages-manager");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/massages-manager/${editMessage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editMessage),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error: failed to update message with ID ${editMessage.id}`
        );
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === editMessage.id ? { ...msg, ...editMessage } : msg
        )
      );
      setEditMessage(null);
    } catch (error) {
      console.error("Error updating message:", error);
    }
    alert("ההודעה עודכנה בהצלחה!");
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את ההודעה?")) {
      try {
        await fetch(`http://localhost:5000/massages-manager/${id}`, {
          method: "DELETE",
        });
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== id)
        );
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const handleSaveNewMessage = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/massages-manager/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (!response.ok) throw new Error("Failed to add new message");

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]);
      alert("הודעה חדשה נוספה בהצלחה!");
      setShowAddForm(false);
      setNewMessage({ title: "", message: "", type: "כללי", sender: "" });
    } catch (error) {
      console.error("Error adding new message:", error);
    }
  };

  return (
    <div>
      <NavbarManager />
      <div className="massages_manager" dir="rtl">
        <div style={{ height: "150px" }}></div>
        <div className="title">
          <h1>לוח הודעות</h1>
          <div className="btn-container">
            <button onClick={() => setShowAddForm(true)}>הוסף הודעה</button>
          </div>
        </div>

        {showAddForm && (
          <div className="add-form">
            <h2>הוסף הודעה חדשה</h2>
            <label>כותרת:</label>
            <input
              value={newMessage.title}
              onChange={(e) =>
                setNewMessage({ ...newMessage, title: e.target.value })
              }
            />
            <label>תוכן ההודעה:</label>
            <textarea
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage({ ...newMessage, message: e.target.value })
              }
            />
            <label>סוג:</label>
            <select
              value={newMessage.type}
              onChange={(e) =>
                setNewMessage({ ...newMessage, type: e.target.value })
              }
            >
              <option value="כללי">כללי</option>
              <option value="מנהלי">מנהלי</option>
            </select>
            <label>שולח:</label>
            <input
              value={newMessage.sender}
              onChange={(e) =>
                setNewMessage({ ...newMessage, sender: e.target.value })
              }
            />
            <button onClick={handleSaveNewMessage}>שמור הודעה</button>
            <button onClick={() => setShowAddForm(false)}>סגור</button>
          </div>
        )}

        <table className="table-container">
          <thead>
            <tr>
              <th>#</th>
              <th>כותרת</th>
              <th>הודעה</th>
              <th>סוג</th>
              <th>שולח</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={message.id}>
                <td>{index + 1}</td>
                <td>{message.title}</td>
                <td>{message.message}</td>
                <td>{message.type}</td>
                <td>{message.sender}</td>
                <td>
                  <button onClick={() => setEditMessage(message)}>ערוך</button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(message.id)}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMessage && (
          <div className="edit-modal">
            <h2>עריכת הודעה</h2>
            <label>כותרת:</label>
            <input
              value={editMessage.title}
              onChange={(e) =>
                setEditMessage({ ...editMessage, title: e.target.value })
              }
            />
            <label>תוכן ההודעה:</label>
            <textarea
              value={editMessage.message}
              onChange={(e) =>
                setEditMessage({ ...editMessage, message: e.target.value })
              }
            />
            <label>סוג:</label>
            <select
              value={editMessage.type}
              onChange={(e) =>
                setEditMessage({ ...editMessage, type: e.target.value })
              }
            >
              <option value="כללי">כללי</option>
              <option value="מנהלי">מנהלי</option>
            </select>
            <label>שולח:</label>
            <input
              value={editMessage.sender}
              onChange={(e) =>
                setEditMessage({ ...editMessage, sender: e.target.value })
              }
            />
            <button onClick={handleSaveChanges}>שמור שינויים</button>
            <button onClick={() => setEditMessage(null)}>סגור</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MassagesManager;
