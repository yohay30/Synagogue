import { useEffect, useState } from "react";
import React from "react";

const Zemanim = () => {
  const [zemanim, setZemanim] = useState(null); // שיניתי ל-null כי לא נרצה להתחיל עם מערך ריק
  const [error, setError] = useState(null); // לניהול שגיאות
  const [loading, setLoading] = useState(true); // לניהול מצב טעינה
  const [currentTime, setCurrentTime] = useState(new Date()); // זמן נוכחי

  const fetchZemanim = async () => {
    try {
      const response = await fetch(
        "https://api.sunrise-sunset.org/json?lat=31.749&lng=35.216&formatted=0"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setZemanim(data.results); // שמירת הנתונים
    } catch (error) {
      setError(error.message); // שמירת השגיאה
    } finally {
      setLoading(false); // לנקות את מצב הטעינה
    }
  };

  useEffect(() => {
    fetchZemanim();

    // עדכון הזמן הנוכחי כל שנייה
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // לנקות את ה-interval כשיצאים מהקומפוננטה
    return () => clearInterval(interval);
  }, []); // טוען את הפונקציה פעם אחת בלבד

  return (
    <div dir="rtl" className="zemanim">
      <h1>{currentTime.toLocaleTimeString()}</h1> {/* מציג את הזמן הנוכחי */}
      <h1>Zemanim</h1>
      {loading && <p>Loading...</p>} {/* מציג את הטעינה */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}{" "}
      {/* מציג שגיאה אם יש */}
      {zemanim && (
        <ul>
          <li>
            <strong>זריחה:</strong>{" "}
            {new Date(zemanim.sunrise).toLocaleTimeString()}
          </li>
          <li>
            <strong>שקיעה:</strong>{" "}
            {new Date(zemanim.sunset).toLocaleTimeString()}
          </li>
          <li>
            <strong>חצות היום:</strong>{" "}
            {new Date(zemanim.solar_noon).toLocaleTimeString()}
          </li>
          <li>
            <strong>אורך היום:</strong>{" "}
            {new Date(zemanim.day_length * 1000).toISOString().substr(11, 8)}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Zemanim;
