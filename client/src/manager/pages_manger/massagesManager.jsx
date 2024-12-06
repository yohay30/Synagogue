import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import AddNewMassage from "../components_manager/addNewMassage.jsx";
import Footer from "../components_manager/footer";
import "../../assets/styles/styleManager/stylePages_manager/massagesManager.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

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
  useEffect(() => {
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

  const formatDate = (message) => {
    const date = new Date(message.created_at);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("he-IL", {
      month: "long",
    })} ${date.getFullYear()} ,  ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    return formattedDate;
  };
  return (
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>
      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>
        <div className="title">
          <h1>לוח הודעות</h1>
          <div className="btn-container">
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              הוסף הודעה
            </button>
          </div>
        </div>
        {showAddForm && (
          <>
            <AddNewMassage
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSaveNewMessage={handleSaveNewMessage}
              setShowAddForm={setShowAddForm}
              refreshLessons={fetchMessages}
            />
            <div style={{ height: "30px" }}></div>
          </>
        )}
        <table className="table-container">
          <thead className="thead">
            <tr>
              <th></th>
              <th>כותרת</th>
              <th>תוכן</th>
              <th>סוג</th>
              <th>שם השולח</th>
              <th>זמן שליחה </th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={message.id}>
                <td>
                  <strong>{index + 1}</strong>
                </td>
                <td>{message.title}</td>
                <td>{message.message}</td>
                <td>{message.type}</td>
                <td>{message.sender}</td>
                <td>{formatDate(message)}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => setEditMessage(message)}
                  >
                    <MdOutlineModeEditOutline size={16} />
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(message.id)}
                  >
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMessage && (
          <>
            {editMessage && (
              <>
                <div className="overlay" onClick={() => setEditMessage(null)}>
                </div>

                <div className="edit-modal">
                  <h2>עריכת הודעה</h2>
                  <form className="form-grid">
                    <div>
                      <label>כותרת:</label>
                      <input
                        value={editMessage.title}
                        onChange={(e) =>
                          setEditMessage({
                            ...editMessage,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>תוכן ההודעה:</label>
                      <textarea
                        value={editMessage.message}
                        onChange={(e) =>
                          setEditMessage({
                            ...editMessage,
                            message: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>סוג:</label>
                      <select
                        value={editMessage.type}
                        onChange={(e) =>
                          setEditMessage({
                            ...editMessage,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="כללי">כללי</option>
                        <option value="מנהלי">מנהלי</option>
                      </select>
                    </div>
                    <div>
                      <label>שם השולח:</label>
                      <input
                        value={editMessage.sender}
                        onChange={(e) =>
                          setEditMessage({
                            ...editMessage,
                            sender: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={handleSaveChanges}>שמור שינויים</button>
                      <button type="button" onClick={() => setEditMessage(null)}>סגור</button>
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

export default MassagesManager;
