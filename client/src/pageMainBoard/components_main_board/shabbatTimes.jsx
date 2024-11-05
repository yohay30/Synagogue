import React, { useEffect, useState } from 'react';

const ShabbatTimes = () => {
  const [times, setTimes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShabbatTimes = async () => {
      try {
        const response = await fetch('https://www.hebcal.com/shabbat?cfg=json&geonameid=281184&ue=off&M=on&lg=s&tgt=_top');

        // בדוק אם התגובה הצליחה
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // קרא את התגובה כ-json
        setTimes(data); // עדכן את המצב עם הנתונים שהתקבלו
      } catch (error) {
        setError(error.message); // שמור את השגיאה במצב
      }
    };

    fetchShabbatTimes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // הצג שגיאה אם יש
  }

  if (!times) {
    return <div>Loading...</div>; // הצג הודעה בזמן הטעינה
  }

  return (
    <div>
      <h1>Shabbat Times</h1>
      {/* הצג את זמני השבת, תלוי במבנה הנתונים שהתקבל */}
      <pre>{JSON.stringify(times, null, 2)}</pre>
    </div>
  );
};

export default ShabbatTimes;
