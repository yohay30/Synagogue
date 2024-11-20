import React, { useState } from "react";
import "../../assets/styles/styleManager/styleComponents_manager/addNewFriend.css";
import { useForm } from "react-hook-form";
const AddNewFriend = ({
  newMember,
  setNewMember,
  handleSaveNewMember,
  setShowAddForm,
}) => {
  const { register, handleSubmit, watch } = useForm();

  const handleSendNewMember = () => {
    try {
      const response = fetch(
        "http://localhost:5000/friends-manager/add/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        }
      );
      if (response.ok) {
        alert("חבר חדש נוספה בהצלחה!");
        setShowAddForm(false);
      } else {
        throw new Error("Failed to add new member");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    handleSaveNewMember();
    setNewMember({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      address: "",
      password: "",
      is_admin: 0,
      id_number: "",
    });
  };

  return (
    <div>
      <div className="add-friend-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
  <label>שם פרטי:</label>
  <input {...register("first_name", { required: true })} />

  <label>שם משפחה:</label>
  <input {...register("last_name", { required: true })} />

  <label>טלפון:</label>
  <input
    type="tel"
    {...register("phone", {
      required: true,
      pattern: /^[0-9]{10}$/, // בדיקת פורמט של מספר טלפון
    })}
  />

  <label>אימייל:</label>
  <input
    type="email"
    {...register("email", {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // אימות של כתובת אימייל
    })}
  />

  <label>כתובת:</label>
  <input {...register("address")} />

  <label>סיסמה:</label>
  <input
    type="password"
    {...register("password", {
      required: true,
      minLength: 6, // דרישה למינימום 6 תווים
    })}
  />

  <label>מנהל:</label>
  <input type="checkbox" {...register("is_admin")} />

  <label>מספר תעודת זהות:</label>
  <input
    {...register("id_number", {
      required: true,
      pattern: /^[0-9]{9}$/, // בדיקת פורמט של ת"ז (9 ספרות)
    })}
  />

  <input type="submit" value="שלח" />
</form>

        {/* <form onSubmit={handleFormSubmit}>
          <label>שם פרטי:</label>
          <input
            required
            type="text"
            value={newMember.first_name}
            onChange={(e) =>
              setNewMember({ ...newMember, first_name: e.target.value })
            }
          />
          {errors.first_name && (
            <div className="error-message">{errors.first_name}</div>
          )}

          <label>שם משפחה:</label>
          <input
            type="text"
            value={newMember.last_name}
            required
            onChange={(e) =>
              setNewMember({ ...newMember, last_name: e.target.value })
            }
          />
          {errors.last_name && (
            <div className="error-message">{errors.last_name}</div>
          )}

          <label>טלפון:</label>
          <input
            required
            type="number"
            value={newMember.phone}
            onChange={(e) =>
              setNewMember({ ...newMember, phone: e.target.value })
            }
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}

          <label>אימייל:</label>
          <input
            type="email"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <label>כתובת:</label>
          <input
            type="text"
            value={newMember.address}
            onChange={(e) =>
              setNewMember({ ...newMember, address: e.target.value })
            }
          />
          {errors.address && (
            <div className="error-message">{errors.address}</div>
          )}

          <label>סיסמה:</label>
          <input
            type="password"
            value={newMember.password}
            onChange={(e) =>
              setNewMember({ ...newMember, password: e.target.value })
            }
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <label>תעודת זהות:</label>
          <input
            type="number"
            value={newMember.id_number}
            onChange={(e) =>
              setNewMember({ ...newMember, id_number: e.target.value })
            }
          />
          {errors.id_number && (
            <div className="error-message">{errors.id_number}</div>
          )}

          <label>מנהל:</label>
          <input
            type="checkbox"
            checked={newMember.is_admin === 1}
            onChange={(e) =>
              setNewMember({ ...newMember, is_admin: e.target.checked ? 1 : 0 })
            }
          />
          <button type="submit">שמור</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            סגור
          </button>
          {console.log(newMember.first_name, "newMember")}
        </form> */}
      </div>
    </div>
  );
};

export default AddNewFriend;
