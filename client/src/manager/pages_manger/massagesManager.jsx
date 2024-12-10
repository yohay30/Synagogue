import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import AddNewMassage from "../components_manager/addNewMassage.jsx";
import Footer from "../components_manager/footer";
// import "../../assets/styles/styleManager/stylePages_manager/massagesManager.css";
import "../../assets/styles/styleManager/baseCssManager/tablesAndTitles.css";
import "../../assets/styles/styleManager/baseCssManager/buttonsAndInputs.css";
import "../../assets/styles/styleManager/baseCssManager/baseAndDivs.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

const MassagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessage, setFilteredMessage] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const filtered = messages.filter((message) =>
      message.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessage(filtered);
  }, [searchQuery, messages]);

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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // חודשים מתחילים מ-0
    const year = date.getFullYear();

    return ` ${day}.${month}.${year}`;
  };

  const formatTime = (message) => {
    const date = new Date(message.created_at);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSearch = (event) => {
    const query = event.target.value;

    setSearchQuery(query);
    const filtered = messages.filter(
      (message) =>
        message.title.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query) ||
        message.type.toLowerCase().includes(query) ||
        message.sender.toLowerCase().includes(query) ||
        formatDate(message).toLowerCase().includes(query)
    );

    setFilteredMessage(filtered);
  };

  const handleRowClick = (message) => {
    if (selectedMessageId === message.id) {
      setSelectedMessageId(null);
    } else {
      setSelectedMessageId(message.id);
    }
  };

  const noResultsMessage = (
    <tr>
      <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold" }}>
        לא נמצאו תוצאות.
      </td>
    </tr>
  );
  return (
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>
      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>
        <div className="title">
          <h1>לוח הודעות</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="חפש לפי סוג ההודעה, כותרת, תוכן, שם השולח, תאריך"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="sort-container">
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            > הצג
              <option value="הכל">כל ההודעות </option>
              <option value="מנהלי">מנהלי</option>
              <option value="כללי"> כללי</option>
           </select>
          </div>
          <div className="btn-container">
            <button
              className="add-button"
              onClick={() => {
                setShowAddForm(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
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
        <div className="table-container">
          <h2 className="title-header"> מנהלי</h2>
          <div
            className="table-spacer"
            style={{ height: "30px", backgroundColor: "white" }}
          ></div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>כותרת</th>
                <th>תוכן</th>
                <th>סוג ההודעה</th>
                <th>שם השולח</th>
                <th>תאריך שליחה</th>
                <th>זמן שליחה</th>
                <th>ערוך</th>
                <th>מחק</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessage.length === 0
                ? messages.filter((message) => message.type === "מנהלי")
                    .length === 0
                  ? noResultsMessage
                  : messages.map((message, index) => (
                      <tr
                        key={message.id}
                        onClick={() => handleRowClick(message)}
                      >
                        <td>{index + 11}</td>
                        <td>{message.title}</td>
                        <td
                          style={{
                            maxWidth: "300px",
                            maxHeight: "100px",
                            overflowY: "auto",
                            overflowX: "auto",
                          }}
                        >
                          {selectedMessageId === message.id
                            ? message.message
                            : message.message.slice(0, 50) + "..."}
                        </td>
                        <td>{message.sender}</td>

                        <td>{formatDate(message)}</td>
                        <td>{formatTime(message)}</td>
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
                    ))
                : filteredMessage
                    .filter((message) => message.type === "מנהלי")
                    .map((message, index) => (
                      <tr key={message.id}>
                        <td>{index + 1}</td>
                        <td>{message.title}</td>
                        <td>{message.message}</td>
                        <td>{message.type}</td>
                        <td>{message.sender}</td>
                        <td>{formatDate(message)}</td>
                        <td>{formatTime(message)}</td>
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
              {selectedMessage && (
                <div className="title-header">
                  <td>{selectedMessage.message}</td>
                  <button onClick={() => setSelectedMessage(null)}>סגור</button>
                </div>
              )}
            </tbody>
          </table>
          <div style={{ height: "60px" }}></div>

          <h2 className="title-header"> כללי</h2>
          <div style={{ height: "30px" }}></div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>כותרת</th>
                <th>תוכן</th>
                <th>שם השולח</th>
                <th>סוג ההודעה</th>
                <th>תאריך שליחה</th>
                <th>זמן שליחה</th>
                <th>ערוך</th>
                <th>מחק</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessage.length === 0
                ? messages
                    .filter((message) => message.type === "כללי")
                    .map((message, index) => (
                      <tr key={message.id}>
                        <td>{index + 1}</td>
                        <td>{message.title}</td>
                        <td>{message.message}</td>
                        <td>{message.type}</td>
                        <td>{message.sender}</td>
                        <td>{formatDate(message)}</td>
                        <td>{formatTime(message)}</td>
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
                    ))
                : filteredMessage
                    .filter((message) => message.type === "כללי")
                    .map((message, index) => (
                      <tr key={message.id}>
                        <td>{index + 1}</td>
                        <td>{message.title}</td>
                        <td>{message.message}</td>
                        <td>{message.type}</td>
                        <td>{message.sender}</td>
                        <td>{formatDate(message)}</td>
                        <td>{formatTime(message)}</td>
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
        </div>

        {editMessage && (
          <>
            {editMessage && (
              <>
                <div
                  className="overlay"
                  onClick={() => setEditMessage(null)}
                ></div>

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
                      <button type="button" onClick={handleSaveChanges}>
                        שמור שינויים
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMessage(null)}
                      >
                        סגור
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

export default MassagesManager;
