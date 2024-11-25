import React, { useEffect, useState } from "react";
import NavbarManager from '../components_manager/navbarManager';

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
        throw new Error(`Error: failed to update event with ID ${editEvent.id}`);
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editEvent.id ? { ...event, ...editEvent } : event
        )
      );
      setEditEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
    alert("האירוע עודכן בהצלחה!");
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
      const response = await fetch(
        "http://localhost:5000/events-manager/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (!response.ok) throw new Error("Failed to add new event");

      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, data]);
      alert("אירוע חדש נוסף בהצלחה!");
      setShowAddForm(false);
      setNewEvent({ event_name: "", event_date: "", event_time: "", location: "", description: "" });
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  return (
    <div>
      <NavbarManager />
      <div className="events_manager" dir="rtl">
        <div style={{ height: "150px" }}></div>
        <div className="title">
          <h1>לוח אירועים</h1>
          <div className="btn-container">
            <button onClick={() => setShowAddForm(true)}>הוסף אירוע</button>
          </div>
        </div>

        {showAddForm && (
          <div className="add-form">
            <h2>הוסף אירוע חדש</h2>
            <label>שם האירוע:</label>
            <input
              value={newEvent.event_name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, event_name: e.target.value })
              }
            />
            <label>תאריך האירוע:</label>
            <input
              type="date"
              value={newEvent.event_date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, event_date: e.target.value })
              }
            />
            <label>שעת האירוע:</label>
            <input
              type="time"
              value={newEvent.event_time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, event_time: e.target.value })
              }
            />
            <label>מיקום:</label>
            <input
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <label>תיאור:</label>
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <button onClick={handleSaveNewEvent}>שמור אירוע</button>
            <button onClick={() => setShowAddForm(false)}>סגור</button>
          </div>
        )}

        <table className="table-container">
          <thead>
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
                  <button onClick={() => setEditEvent(event)}>ערוך</button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(event.id)}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editEvent && (
          <div className="edit-modal">
            <h2>עריכת אירוע</h2>
            <label>שם האירוע:</label>
            <input
              value={editEvent.event_name}
              onChange={(e) =>
                setEditEvent({ ...editEvent, event_name: e.target.value })
              }
            />
            <label>תאריך האירוע:</label>
            <input
              type="date"
              value={editEvent.event_date}
              onChange={(e) =>
                setEditEvent({ ...editEvent, event_date: e.target.value })
              }
            />
            <label>שעת האירוע:</label>
            <input
              type="time"
              value={editEvent.event_time}
              onChange={(e) =>
                setEditEvent({ ...editEvent, event_time: e.target.value })
              }
            />
            <label>מיקום:</label>
            <input
              value={editEvent.location}
              onChange={(e) =>
                setEditEvent({ ...editEvent, location: e.target.value })
              }
            />
            <label>תיאור:</label>
            <textarea
              value={editEvent.description}
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
              }
            />
            <button onClick={handleSaveChanges}>שמור שינויים</button>
            <button onClick={() => setEditEvent(null)}>סגור</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsManager;
