import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import Footer from "../components_manager/footer";
import AddNewLesson from "../components_manager/addNewLesson";
import "../../assets/styles/styleManager/stylePages_manager/lessonsManager.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function Lessons_manager() {
  const [lessons, setLessons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [editLesson, setEditLesson] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    rabbi_name: "",
    topic: "",
    day_of_week: "",
    lesson_time: "",
    location: "",
  });
  const daysOfWeekOrder = [
    "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"
  ];
  const sortedLessons = [...lessons].sort((a, b) => {
    const dayA = daysOfWeekOrder.indexOf(a.day_of_week);
    const dayB = daysOfWeekOrder.indexOf(b.day_of_week);
    return dayA - dayB;
  });
    

  const fetchLessons = async () => {
    try {
      const response = await fetch("http://localhost:5000/lessons-manager");
      const data = await response.json();
      setLessons(data);
      setFilteredLessons(data); // הצגת כל השיעורים מידית
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };
  useEffect(() => {
    fetchLessons();
  }, []);
  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredLessons(lessons);
    }
  }, [searchQuery, lessons]);
  
  useEffect(() => {
    // מיון השיעורים לפי סדר הימים
    const sortedLessons = [...lessons].sort((a, b) => {
      const dayA = daysOfWeekOrder.indexOf(a.day_of_week);
      const dayB = daysOfWeekOrder.indexOf(b.day_of_week);
      return dayA - dayB;
    });
    setFilteredLessons(sortedLessons);
  }, [lessons]);
  
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    setSearchQuery(query);
    const filtered = lessons.filter(
      (lesson) =>
        lesson.rabbi_name.toLowerCase().includes(query) ||
        lesson.topic.toLowerCase().includes(query) ||
        lesson.day_of_week.toLowerCase().includes(query) ||
        lesson.lesson_time.toLowerCase().includes(query) ||
        lesson.location.toLowerCase().includes(query)
    );
    setFilteredLessons(filtered);
  };
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
        throw new Error(
          `Error: failed to update lesson with ID ${editLesson.id}`
        );
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
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>
      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>

        <div className="title">
          <h1> לוח שיעורים שבועי </h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="חפש לפי שם הרב, יום ,נושא ,מיקום, שעה..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="btn-container">
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              הוסף שיעור
            </button>
          </div>
        </div>

        {showAddForm && (
          <>
            <div style={{ height: "30px" }}></div>
            <AddNewLesson
              newLesson={newLesson}
              setNewLesson={setNewLesson}
              setShowAddForm={setShowAddForm}
              handleSaveNewLesson={handleSaveNewLesson}
              refreshLessons={fetchLessons}
            />
            <div style={{ height: "30px" }}></div>
          </>
        )}

<table className="table-container">
  <thead className="thead">
    <tr>
      <th></th>
      <th>יום</th>
      <th>שם הרב</th>
      <th>נושא השיעור</th>
      <th>שעה</th>
      <th>מיקום</th>
      <th>מס משתתפים</th>
      <th>ערוך</th>
      <th>מחק</th>
    </tr>
  </thead>
  <tbody>
    {filteredLessons.map((lesson, index) => (
      <tr key={lesson.id}>
        <td>
          <strong>{index + 1}</strong>
        </td>
        <td>{lesson.day_of_week}</td>
        <td>{lesson.rabbi_name}</td>
        <td>{lesson.topic}</td>
        <td>{lesson.lesson_time}</td>
        <td>{lesson.location}</td>
        <td>{lesson.Participants}</td>
        <td>
          <button
            className="edit-button"
            onClick={() => setEditLesson(lesson)}
          >
            <MdOutlineModeEditOutline size={16} />
          </button>
        </td>
        <td>
          <button
            className="delete-button"
            onClick={() => handleDeleteClick(lesson.id)}
          >
            <MdOutlineDeleteOutline size={16} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        {editLesson && (
          <>
            {editLesson && (
              <>
                <div
                  className="overlay"
                  onClick={() => setEditLesson(null)}
                ></div>
                <div className="edit-modal">
                  <h2>עריכת שיעור</h2>
                  <form className="form-grid">
                    <div>
                      <label>שם הרב:</label>
                      <input
                        value={editLesson.rabbi_name}
                        onChange={(e) =>
                          setEditLesson({
                            ...editLesson,
                            rabbi_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>נושא השיעור:</label>
                      <input
                        value={editLesson.topic}
                        onChange={(e) =>
                          setEditLesson({
                            ...editLesson,
                            topic: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>יום בשבוע:</label>
                      <input
                        value={editLesson.day_of_week}
                        onChange={(e) =>
                          setEditLesson({
                            ...editLesson,
                            day_of_week: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>שעה:</label>
                      <input
                        value={editLesson.lesson_time}
                        onChange={(e) =>
                          setEditLesson({
                            ...editLesson,
                            lesson_time: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>מיקום:</label>
                      <input
                        value={editLesson.location}
                        onChange={(e) =>
                          setEditLesson({
                            ...editLesson,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={handleSaveChanges}>שמור שינויים</button>
                      <button type="button" onClick={() => setEditLesson(null)}>סגור</button>
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
}
