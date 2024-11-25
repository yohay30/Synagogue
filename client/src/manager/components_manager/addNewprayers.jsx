import React from "react";
import { useForm } from "react-hook-form";

const AddNewPrayer = ({ setShowAddForm, refreshPrayers }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/prayers-manager/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("תפילה חדשה נוספה בהצלחה!");
        reset(); // איפוס הטופס
        setShowAddForm(false); // סגירת הטופס
        refreshPrayers(); // רענון הרשימה (אם פונקציה זו קיימת)
      } else {
        throw new Error("Failed to add new prayer");
      }
    } catch (error) {
      console.error("Error adding prayer:", error);
      alert("שגיאה בהוספת תפילה חדשה.");
    }
  };

  return (
    <div className="add-prayer-modal">
      <h2>הוספת תפילה חדשה</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>סוג תפילה:</label>
        <input
          {...register("Prayer_Type", { required: "סוג תפילה חובה" })}
          placeholder="הכנס סוג תפילה"
        />

        <label>שעת תפילה:</label>
        <input
          {...register("Time", { required: "שעת תפילה חובה" })}
          type="time"
          placeholder="הכנס שעת תפילה"
        />
        <label>סוג יום:</label>
        <select {...register("Day_Type", { required: "סוג יום חובה" })}>
          <option value="חול">חול</option>
          <option value="שבת">שבת</option>
          <option value="חג">חג</option>
          <option value="כיפור">כיפור</option>
          <option value="כיפור">כיפור</option>
        </select>

        <label>תאריך תפילה:</label>
        <input
          {...register("Prayer_Date", { required: "תאריך תפילה חובה" })}
          type="date"
          placeholder="הכנס תאריך תפילה"
        />

        <label>מיקום תפילה:</label>
        <input
          {...register("Location", { required: "מיקום תפילה חובה" })}
          placeholder="הכנס מיקום תפילה"
        />

        <label>תאריך עברי:</label>
        <input
          {...register("Hebrew_Date")}
          placeholder="הכנס תאריך עברי (אופציונלי)"
        />

        <label>תיאור:</label>
        <textarea
          {...register("Description")}
          placeholder="הכנס תיאור (אופציונלי)"
        ></textarea>

        <div className="form-actions">
          <button type="submit">שמור</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPrayer;
