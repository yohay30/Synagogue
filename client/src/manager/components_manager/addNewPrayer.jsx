import React from "react";
import { useForm } from "react-hook-form";
// import "../../assets/styles/styleManager/styleComponents_manager/addNewPrayer.css";
import "../../assets/styles/styleManager/styleComponents_manager/addNewMain.css";
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
    <div className="add-new-modal">
      <h2>הוספת תפילה חדשה</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div>
            <label>סוג תפילה:</label>
            <input
              {...register("Prayer_Type", { required: "סוג תפילה חובה" })}
              placeholder="שחרית / מנחה / ערבית / מוסף   "
            />
          </div>

          <div>
            <label>שעת תפילה:</label>
            <input
              {...register("Time", { required: "שעת תפילה חובה" })}
              type="time"
              placeholder="הכנס שעת תפילה"
            />
          </div>

          <div>
            <label>סוג יום:</label>
            <br/>
            <select className="select" {...register("Day_Type", { required: "סוג יום חובה" })}
              placeholder="הכנס סוג יום" >
              <option value="חול">חול</option>
              <option value="שבת">שבת</option>
              <option value="חג">חג</option>
              <option value="צום">צום</option>
              <option value="חול המועד">חול המועד</option>
              <option value="חנוכה ">חנוכה</option>
              <option value="פורים ">פורים</option>
            </select>
          </div>
          
          <div>
            <label>תאריך תפילה:</label>
            <input
              {...register("Prayer_Date")}
              type="date"
              placeholder="הכנס תאריך תפילה"
            />
          </div>
          <div>
            <label>מיקום תפילה:</label>
            <input
              {...register("Location", { required: "מיקום תפילה חובה" })}
              placeholder="הכנס מיקום תפילה"
            />
          </div>
          <div>
            <label>תאריך עברי:</label>
            <input
              {...register("Hebrew_Date")}
              placeholder="לא חובה"
            />
          </div>
          <div>
            <label>תיאור:</label>
            <textarea
              {...register("Description")}
              placeholder="הכנס תיאור (אופציונלי)"
            ></textarea>
          </div>
        </div>
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
