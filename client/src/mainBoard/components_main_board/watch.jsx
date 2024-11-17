import React from "react";
import { useState , useEffect} from "react";
import '../../assets/styles/styleMainBord/styleMainBoardComponnets/watch.css'
const Watch = () => {

  const [currentTime, setCurrentTime] = useState(new Date()); // זמן נוכחי
  useEffect(() => {

    // עדכון הזמן הנוכחי כל שנייה
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // לנקות את ה-interval כשיצאים מהקומפוננטה
    return () => clearInterval(interval);
  }, []); // טוען את הפונקציה פעם אחת בלבד

  return (
    <div dir="rtl" className="watch">
      <h1>{currentTime.toLocaleTimeString()}</h1> {/* מציג את הזמן הנוכחי */}
    </div>
  );
};
export default Watch;
