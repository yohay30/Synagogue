import React, { useState } from "react";
// import "../../assets/styles/styleManager/styleComponents_manager/addNewEvent.css";
import { useForm } from "react-hook-form";

const AddNewEvent = ({ setShowAddForm, refreshEvents }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // למקרה של טעינה

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("אירוע חדש נוספה בהצלחה!");
        reset();
        setShowAddForm(false);
        refreshEvents();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
        throw new Error(error.error || "הוספת האירוע נכשלה.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-new-modal">
      <h2>הוספת אירוע חדש</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div>
            <label> כותרת האירוע:</label>
            <input type="text" {...register("title", { required: true })} />
          </div>
          <div>
            <label> תיאור האירוע:</label>
            <textarea {...register("description", { required: true })} />
          </div>
          <div>
            <label> תאריך:</label>
            <input type="date" {...register("date", { required: true })} />
          </div>
          <div>
            <label> שעה:</label>
            <input type="time" {...register("time", { required: true })} />
          </div>
          <div>
            <label> מיקום:</label>
            <input type="text" {...register("location", { required: true })} />
          </div>
          <div>
            <label> סוג:</label>
            <select {...register("type", { required: true })}>
              <option value="אירוע ציבורי">אירוע ציבורי</option>
              <option value="אירוע פרטי">אירוע פרטי</option>
            </select>
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

export default AddNewEvent;
