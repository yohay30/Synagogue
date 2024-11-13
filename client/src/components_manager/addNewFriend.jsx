import React, { useState } from 'react';
import '../assets/styles/styleComponents_manager/addNewFriend.css';

const AddNewFriend = ({ newMember, setNewMember, handleSaveNewMember, setShowAddForm }) => {
  const [errorMessage, setErrorMessage] = useState(''); // לאחסן הודעת שגיאה

  // פונקציה לבדוק אם כל השדות מולאו
  const validateForm = () => {
    return (
      newMember.first_name &&
      newMember.last_name &&
      newMember.phone &&
      newMember.email &&
      newMember.address &&
      newMember.id_number &&
      newMember.password
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      setErrorMessage('אנא מלא את כל השדות לפני שמירה'); // הצגת הודעת שגיאה
    } else {
      setErrorMessage('');
      handleSaveNewMember();
    }
  };

  return (
    <div>
      <div className="div-addFriend" onClick={() => setShowAddForm(false)}></div>

      <div className="add-friend-modal">
        <h2>הוסף חבר חדש</h2>
        <br />
        <label>שם פרטי:</label>
        <input
          value={newMember.first_name}
          onChange={(e) => setNewMember({ ...newMember, first_name: e.target.value })}
        />
        <label>שם משפחה:</label>
        <input
          value={newMember.last_name}
          onChange={(e) => setNewMember({ ...newMember, last_name: e.target.value })}
        />
        <label>טלפון:</label>
        <input
          value={newMember.phone}
          onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
        />
        <br />
        <br />

        <label>אימייל:</label>
        <input
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
        />
        <label>כתובת:</label>
        <input
          value={newMember.address}
          onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
        />
        <label>מס זהות:</label>
        <input
          value={newMember.id_number}
          onChange={(e) => setNewMember({ ...newMember, id_number: e.target.value })}
        />
        <br />
        <br />

        <label>סיסמה:</label>
        <input
          type="password"
          value={newMember.password}
          onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
        />
        <label>מנהל:</label>
        <input
          type="checkbox"
          checked={newMember.is_admin === 1}
          onChange={(e) => setNewMember({ ...newMember, is_admin: e.target.checked ? 1 : 0 })}
        />

        {/* הצגת הודעת שגיאה אם יש */}
        {errorMessage && console.log("errorMessage", errorMessage)}
       

        <button 
          onClick={handleSave} 
          disabled={!validateForm()} // כפתור שמירה ייבטל אם לא כל השדות מולאו
        >
          שמור
        </button>
        <button onClick={() => setShowAddForm(false)}>ביטול</button>
      </div>
    </div>
  );
};

export default AddNewFriend;
