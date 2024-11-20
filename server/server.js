// ייבוא המודולים הדרושים
import express from "express";
import cors from "cors";
import friendsRouter from "./route/friends.js";
import prayersRouter from "./route/prayers.js";
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

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
