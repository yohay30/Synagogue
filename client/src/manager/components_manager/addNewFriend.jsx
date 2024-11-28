
import React, { useState } from "react";
import "../../assets/styles/styleManager/styleComponents_manager/addNewFriend.css";
import { useForm } from "react-hook-form";

const AddNewFriend = ({ setShowAddForm }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // למקרה של טעינה

  const onSubmit = async (data) => {
    try {
      setLoading(true); // התחלת מצב טעינה

      // המרת checkbox ל-0/1
      const formattedData = {
        ...data,
        is_admin: data.is_admin ? 1 : 0,
      };

      const response = await fetch(
        "http://localhost:5000/friends-manager/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        }
      );

      if (response.ok) {
        alert("חבר חדש נוסף בהצלחה!");
        setShowAddForm(false); // סגירת הטופס
        reset(); // איפוס הטופס
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
        throw new Error(error.error || "הוספת החבר נכשלה.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("שגיאה בהוספת חבר חדש.");
    } finally {
      setLoading(false); // סיום מצב טעינה
    }
  };

  return (
    <div>
      <div className="add-friend-modal">
        <h2>הוספת חבר חדש</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            <div>
              <label>שם פרטי:</label>
              <input {...register("first_name", { required: true })} />
            </div>
            <div>
              <label>שם משפחה:</label>
              <input {...register("last_name", { required: true })} />
            </div>
            <div>
              <label>טלפון:</label>
              <input
                type="tel"
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]{10}$/, // בדיקת פורמט טלפון
                })}
              />
            </div>
            <div>
              <label>אימייל:</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // אימות אימייל
                })}
              />
            </div>
            <div>
              <label>כתובת:</label>
              <input {...register("address")} />
            </div>
            <div>
              <label>סיסמה:</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6, // דרישת מינימום 6 תווים
                })}
              />
            </div>
            <div>
              <label>מספר תעודת זהות:</label>
              <input
                {...register("id_number", {
                  required: true,
                  pattern: /^[0-9]{9}$/, // בדיקת פורמט של ת"ז
                })}
              />
            </div>
            <div>
              <label>כיסא מספר</label>
              <input {...register("chair_number")} />
            </div>
            <div>
              <label>מנהל:</label>
              <input type="checkbox" {...register("is_admin")} />
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
    </div>
  );
};

export default AddNewFriend;
