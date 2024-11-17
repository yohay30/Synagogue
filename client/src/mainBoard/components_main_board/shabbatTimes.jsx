import React, { useEffect, useState } from "react";
 import '../../assets/styles/styleMainBord/styleMainBoardComponnets/shabbatTimes.css';

const ShabbatTimes = () => {
  const [times, setTimes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShabbatTimes = async () => {
      try {
        const response = await fetch(
          "https://www.hebcal.com/shabbat?cfg=json&geonameid=281184&ue=off&M=on&lg=s&tgt=_top"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setTimes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShabbatTimes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!times) {
    return <div>Loading...</div>;
  }

  // מציאת זמני כניסת שבת, פרשה והבדלה
  const candleLighting = times.items.find(
    (item) => item.category === "candles"
  );
  const havdalah = times.items.find((item) => item.category === "havdalah");
  const parashat = times.items.find((item) => item.category === "parashat");

  return (
    <div className="shabbat-times"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        textAlign: "center",
      }}
    >
      {parashat && <h1>  {parashat.hebrew}</h1>}
        <h1>
          כניסת שבת:{" "}
          {new Date(candleLighting.date).toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>
        <h1>
          יציאת שבת:{" "}
          {new Date(havdalah.date).toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>      
    </div>
  );
};

export default ShabbatTimes;
