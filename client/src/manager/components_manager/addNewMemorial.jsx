import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddNewMemorial = ({ setShowAddForm, refreshLessons }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

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
        // אם הבקשה הצליחה
        alert("פרטי האזכרה נוספו בהצלחה!");
        reset(); // איפוס הטופס
        setShowAddForm(false); // סגירת הטופס
        refreshLessons(); // רענון הרשימה
      } else {
        // אם הבקשה נכשלה
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
        throw new Error(error.error || "הוספת האזכרה נכשלה.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-new-modal">
      <h2>הוספת אזכרה</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div>
            <label htmlFor="deceased_name">שם הנפטר/ת:</label>
            <input
              type="text"
              id="deceased_name"
              {...register("deceased_name")}
              required
            />
          </div>

          <div>
            <label htmlFor="hebrew_date">תאריך בעברית:</label>
            <input
              type="text"
              id="hebrew_date"
              {...register("hebrew_date")}
              required
            />
          </div>

          <div>
            <label htmlFor="date">תאריך באנגלית:</label>
            <input type="date" id="date" {...register("date")} required />
          </div>

          <div>
            <label htmlFor="notes">הערות:</label>
            <textarea id="notes" {...register("notes")} />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? "טוען..." : "הוסף אזכרה"}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)}>
              ביטול
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddNewMemorial;
