import React, { useEffect, useState } from "react";
import NavbarManager from "../components_manager/navbarManager";

export default function Lessons_manager() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("http://localhost:5000/lessons-manager");
        const data = await response.json();
        console.log(data);
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div dir="rtl">
      <NavbarManager />
      <div>
        <div style={{ height: "150px" }}></div>
        <div>
          <h1> לוח שיעורים שבועי </h1>
          <div>
            <button>הוסף שיעור</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th> שם הרב</th>
              <th>נושא השיעור</th>
              <th>יום </th>
              <th>שעה</th>
              <th>מיקום</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lesson.rabbi_name}</td>
                <td>{lesson.topic}</td>
                <td>{lesson.day_of_week}</td>
                <td>{lesson.lesson_time}</td>
                <td>{lesson.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>סטיסטיקה</h1>
      </div>
    </div>
  );
}
