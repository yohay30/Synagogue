import React, { useState } from "react";
import "../../assets/styles/styleManager/styleComponents_manager/addNewMassage.css";
import { useForm } from "react-hook-form";

const AddNewMessage = ({ setShowAddForm, refreshMessages }) => {
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
        alert("הודעה חדשה נוספה בהצלחה!");
        reset();
        setShowAddForm(false);
        refreshMessages();
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error || "בעיה בהוספת הודעה"}`);
        throw new Error(error.error || "הוספת ההודעה נכשלה.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("אירעה שגיאה, אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-new-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div>
            <label> כותרת:</label>
            <input type="text" {...register("title", { required: true })} />
          </div>
          <div>
            <label> תוכן ההודעה:</label>
            <textarea {...register("message", { required: true })}></textarea>
          </div>
          <div>
            <label> סוג:</label>
            <select {...register("type", { required: true })}>
              <option value="מנהלי">מנהלי</option>
              <option value="ציבורי">ציבורי</option>
            </select>
          </div>
          <div>
            <label> שולח:</label>
            <input type="text" {...register("sender", { required: true })} />
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

export default AddNewMessage;
