import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";
import Footer from "../components_manager/footer";
import AddNewLesson from "../components_manager/addNewLesson";
import "../../assets/styles/styleManager/baseCssManager/tablesAndTitles.css";
import "../../assets/styles/styleManager/baseCssManager/buttonsAndInputs.css";
import "../../assets/styles/styleManager/baseCssManager/baseAndDivs.css";
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
    "ראשון",
    "שני",
    "שלישי",
    "רביעי",
    "חמישי",
    "שישי",
    "שבת",
  ];

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("http://localhost:5000/lessons-manager");
        const data = await response.json();
        setLessons(data);
        setFilteredLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLessons(lessons);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = lessons.filter(
        (lesson) =>
          lesson.rabbi_name.toLowerCase().includes(query) ||
          lesson.topic.toLowerCase().includes(query) ||
          lesson.day_of_week.toLowerCase().includes(query) ||
          lesson.lesson_time.toLowerCase().includes(query) ||
          lesson.location.toLowerCase().includes(query)
      );
      setFilteredLessons(filtered);
    }
  }, [searchQuery, lessons]);

const groupLessonsByDay = () => {
  const grouped = {};
  daysOfWeekOrder.forEach((day) => {
    grouped[day] = filteredLessons
      .filter((lesson) => lesson.day_of_week === day)
      .sort((a, b) => {
        const timeA = parseInt(a.lesson_time.replace(":", ""), 10);
        const timeB = parseInt(b.lesson_time.replace(":", ""), 10);
        return timeA - timeB;
      });
  });
  return grouped;
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

  const groupedLessons = groupLessonsByDay();

  return (
    <div className="base-manager">
      <header>
        <NavbarManager />
      </header>
      <div className="base-manager-container" dir="rtl">
        <div style={{ height: "100px" }}></div>

        <div className="title">
          <h1>לוח שיעורים שבועי</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="חפש לפי שם הרב, יום ,נושא ,מיקום, שעה..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            />
            <div style={{ height: "30px" }}></div>
          </>
        )}

        {daysOfWeekOrder.map((day) => (
          <div className="title-container" key={day}>
            {groupedLessons[day].length > 0 && (
              <>
              
                <h2 className="section-header-manager" >{day}</h2>
                <table className="table-container">
                  <thead className="thead">
                    <tr>
                      <th></th>
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
                    {groupedLessons[day].map((lesson, index) => (
                      <tr key={lesson.id}>
                        <td>
                          <strong>{index + 1}</strong>
                        </td>
                        <td>{lesson.rabbi_name}</td>
                        <td>{lesson.topic}</td>
                        <td>{lesson.lesson_time.slice(0, 5)}</td>
                        <td>{lesson.location}</td>
                        <td>{lesson.Participants}</td>
                        <td>
                          <button
                            className="edit-button"
                            onClick={() => setEditLesson(lesson)}
                          >
                            <MdOutlineModeEditOutline className="edit-icon"  />
                          </button>
                        </td>
                        <td>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteClick(lesson.id)}
                          >
                            <MdOutlineDeleteOutline size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ))}

        <div style={{ height: "50px" }}></div>
        <Footer className="footer" />
      </div>
    </div>
  );
}
