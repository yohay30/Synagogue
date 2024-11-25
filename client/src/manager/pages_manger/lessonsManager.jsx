import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";

export default function Lessons_manager() {
  const [lessons, setLessons] = useState([]);
  const [editLesson, setEditLesson] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    rabbi_name: "",
    topic: "",
    day_of_week: "",
    lesson_time: "",
    location: "",
  });

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("http://localhost:5000/lessons-manager");
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/lessons-manager/${editLesson.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editLesson),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: failed to update lesson with ID ${editLesson.id}`);
      }

      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === editLesson.id ? { ...lesson, ...editLesson } : lesson
        )
      );
      setEditLesson(null);
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
    alert("השיעור עודכן בהצלחה!");
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את השיעור?")) {
      try {
        await fetch(`http://localhost:5000/lessons-manager/${id}`, {
          method: "DELETE",
        });
        setLessons((prevLessons) =>
          prevLessons.filter((lesson) => lesson.id !== id)
        );
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    }
  };

  const handleSaveNewLesson = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/lessons-manager/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLesson),
        }
      );

      if (!response.ok) throw new Error("Failed to add new lesson");

      const data = await response.json();
      setLessons((prevLessons) => [...prevLessons, data]);
      alert("שיעור חדש נוסף בהצלחה!");
      setShowAddForm(false);
      setNewLesson({
        rabbi_name: "",
        topic: "",
        day_of_week: "",
        lesson_time: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding new lesson:", error);
    }
  };

  return (
    <div dir="rtl">
      <NavbarManager />
      <div>
        <div style={{ height: "150px" }}></div>
        <div>
          <h1> לוח שיעורים שבועי </h1>
          <div>
            <button onClick={() => setShowAddForm(true)}>הוסף שיעור</button>
          </div>
        </div>

        {showAddForm && (
          <div className="add-form">
            <h2>הוסף שיעור חדש</h2>
            <label>שם הרב:</label>
            <input
              value={newLesson.rabbi_name}
              onChange={(e) =>
                setNewLesson({ ...newLesson, rabbi_name: e.target.value })
              }
            />
            <label>נושא השיעור:</label>
            <input
              value={newLesson.topic}
              onChange={(e) =>
                setNewLesson({ ...newLesson, topic: e.target.value })
              }
            />
            <label>יום בשבוע:</label>
            <input
              value={newLesson.day_of_week}
              onChange={(e) =>
                setNewLesson({ ...newLesson, day_of_week: e.target.value })
              }
            />
            <label>שעה:</label>
            <input
              value={newLesson.lesson_time}
              onChange={(e) =>
                setNewLesson({ ...newLesson, lesson_time: e.target.value })
              }
            />
            <label>מיקום:</label>
            <input
              value={newLesson.location}
              onChange={(e) =>
                setNewLesson({ ...newLesson, location: e.target.value })
              }
            />
            <button onClick={handleSaveNewLesson}>שמור שיעור</button>
            <button onClick={() => setShowAddForm(false)}>סגור</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>שם הרב</th>
              <th>נושא השיעור</th>
              <th>יום</th>
              <th>שעה</th>
              <th>מיקום</th>
              <th>ערוך</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson.id}>
                <td>{index + 1}</td>
                <td>{lesson.rabbi_name}</td>
                <td>{lesson.topic}</td>
                <td>{lesson.day_of_week}</td>
                <td>{lesson.lesson_time}</td>
                <td>{lesson.location}</td>
                <td>
                  <button onClick={() => setEditLesson(lesson)}>ערוך</button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(lesson.id)}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editLesson && (
          <div className="edit-modal">
            <h2>עריכת שיעור</h2>
            <label>שם הרב:</label>
            <input
              value={editLesson.rabbi_name}
              onChange={(e) =>
                setEditLesson({ ...editLesson, rabbi_name: e.target.value })
              }
            />
            <label>נושא השיעור:</label>
            <input
              value={editLesson.topic}
              onChange={(e) =>
                setEditLesson({ ...editLesson, topic: e.target.value })
              }
            />
            <label>יום בשבוע:</label>
            <input
              value={editLesson.day_of_week}
              onChange={(e) =>
                setEditLesson({ ...editLesson, day_of_week: e.target.value })
              }
            />
            <label>שעה:</label>
            <input
              value={editLesson.lesson_time}
              onChange={(e) =>
                setEditLesson({ ...editLesson, lesson_time: e.target.value })
              }
            />
            <label>מיקום:</label>
            <input
              value={editLesson.location}
              onChange={(e) =>
                setEditLesson({ ...editLesson, location: e.target.value })
              }
            />
            <button onClick={handleSaveChanges}>שמור שינויים</button>
            <button onClick={() => setEditLesson(null)}>סגור</button>
          </div>
        )}
      </div>
    </div>
  );
}
