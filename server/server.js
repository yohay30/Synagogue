// ייבוא המודולים הדרושים
import express from "express";
import cors from "cors";
import friendsRouter from "./route/friends.js";
import prayersRouter from "./route/prayers.js";
import lessonsRouter from "./route/lessons.js";
import memorialsRouter from "./route/memorials.js";
import massagesRouter from "./route/messages.js";
import eventsRouter from "./route/events.js";
import connection  from "../server/config/configDB.js";

// יצירת מופע של האפליקציה
const app = express();
const PORT = process.env.PORT || 5000;

// אפשר CORS
app.use(cors());
app.use(express.json());

// חיבור למסד הנתונים

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

app.use("/friends-manager", friendsRouter);
app.use("/prayers-manager", prayersRouter);
app.use("/lessons-manager", lessonsRouter);
app.use("/memorials-manager", memorialsRouter);
app.use("/massages-manager", massagesRouter);
app.use("/events-manager",eventsRouter);
// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
