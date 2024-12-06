import React, { useState } from "react";
import "../../assets/styles/styleManager/styleComponents_manager/addNewLesson.css";
import { useForm } from "react-hook-form";

const AddNewLesson = ({ setShowAddForm, refreshLessons }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // למקרה של טעינה

  const onSubmit = async (data) => {
    try {
      setLoading(true); // התחלת מצב טעינה

      const response = await fetch(
        "http://localhost:5000/lessons-manager/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("שיעור חדש נוסף בהצלחה!");
        reset(); // איפוס הטופס
        setShowAddForm(false); // סגירת הטופס
        refreshLessons(); // רענון הרשימה (אם פונקציה זו קיימת)
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
        throw new Error(error.error || "הוספת השיעור נכשלה.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // לנקות את מצב הטעינה
    }
  };

  return (
    <div className="add-new-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div>
            <label>שם הרב</label>
            <input
              type="text"
              placeholder="שם הרב"
              {...register("rabbi_name", { required: true })}
            />
          </div>
          <div>
            <label>נושא השיעור</label>
            <input
              placeholder="נושא השיעור"
              {...register("topic", { required: true })}
            />
          </div>
          <div>
            <label>יום השיעור בשבוע</label>
            <select
              className="select"
              {...register("day_of_week", { required: true })}
            >
              <option value="ראשון">ראשון</option>
              <option value="שני">שני</option>
              <option value="שלישי">שלישי</option>
              <option value="רביעי">רביעי</option>
              <option value="חמישי">חמישי</option>
              <option value="שישי">שישי</option>
              <option value="שבת">שבת</option>
            </select>
          </div>
          <div>
            <label>שעת השיעור</label>
            <input
              type="time"
              placeholder="שעת השיעור"
              {...register("lesson_time", { required: true })}
            />
          </div>
          <div>
            <label>מיקום השיעור</label>
            <input
              type="text"
              placeholder="מיקום השיעור"
              {...register("location", { required: true })}
            />
          </div>
          <div>
            <label>מספר משתתפים</label>
            <input
              type="number"
              defaultValue={0}
              placeholder="מספר משתתפים"
              {...register("Participants")}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "שולח..." : "שמור"}
          </button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddNewLesson;
