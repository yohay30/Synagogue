import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import AddNewEvent from "../components_manager/addNewEvent.jsx"; // קומפוננטה חדשה שתהיה דומה ל-AddNewMassage
import Footer from "../components_manager/footer";
import "../../assets/styles/styleManager/baseCssManager/tablesAndTitles.css";
import "../../assets/styles/styleManager/baseCssManager/buttonsAndInputs.css";
import "../../assets/styles/styleManager/baseCssManager/baseAndDivs.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
// import "../../assets/styles/styleManager/stylePages_manager/eventsManager.css";

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    event_name: "",
    event_date: "",
    event_time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events-manager");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/events-manager/${editEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editEvent),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error: failed to update event with ID ${editEvent.id}`
        );
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editEvent.id ? { ...event, ...editEvent } : event
        )
      );
      setEditEvent(null);
      alert("האירוע עודכן בהצלחה!");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את האירוע?")) {
      try {
        await fetch(`http://localhost:5000/events-manager/${id}`, {
          method: "DELETE",
        });
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleSaveNewEvent = async () => {
    try {
      const response = await fetch("http://localhost:5000/events-manager/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) throw new Error("Failed to add new event");

      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, data]);
      alert("אירוע חדש נוסף בהצלחה!");
      setShowAddForm(false);
      setNewEvent({
        event_name: "",
        event_date: "",
        event_time: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  return (
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>
      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>
        <div className="title">
          <h1>לוח אירועים</h1>
          <div className="btn-container">
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              הוסף אירוע
            </button>
          </div>
        </div>

        {showAddForm && (
          <>
            <AddNewEvent
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleSaveNewEvent={handleSaveNewEvent}
              setShowAddForm={setShowAddForm}
            />
            <div style={{ height: "30px" }}></div>
          </>
        )}

        <table className="table-container">
          <thead className="thead">
            <tr>
              <th>#</th>
              <th>שם האירוע</th>
              <th>תאריך</th>
              <th>שעה</th>
              <th>מיקום</th>
              <th>תיאור</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.event_name}</td>
                <td>{event.event_date}</td>
                <td>{event.event_time}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => setEditEvent(event)}
                  >
                    <MdOutlineModeEditOutline size={16} />
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(event.id)}
                  >
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editEvent && (
          <>
            {editEvent && (
              <>
                <div
                  className="overlay"
                  onClick={() => setEditEvent(null)}
                ></div>
                <div className="edit-modal">
                  <h2>עריכת אירוע</h2>
                  <form className="form-grid">
                    <div>
                      <label>שם האירוע:</label>
                      <input
                        value={editEvent.event_name}
                        onChange={(e) =>
                          setEditEvent({
                            ...editEvent,
                            event_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>תאריך האירוע:</label>
                      <input
                        type="date"
                        value={editEvent.event_date}
                        onChange={(e) =>
                          setEditEvent({
                            ...editEvent,
                            event_date: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>שעת האירוע:</label>
                      <input
                        type="time"
                        value={editEvent.event_time}
                        onChange={(e) =>
                          setEditEvent({
                            ...editEvent,
                            event_time: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>מיקום:</label>
                      <input
                        value={editEvent.location}
                        onChange={(e) =>
                          setEditEvent({
                            ...editEvent,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>תיאור:</label>
                      <textarea
                        value={editEvent.description}
                        onChange={(e) =>
                          setEditEvent({
                            ...editEvent,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-actions">
                      <button type="button" onClick={handleSaveChanges}>
                        שמור שינויים
                      </button>

                      <button type="button" onClick={() => setEditEvent(null)}>
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

export default EventsManager;
