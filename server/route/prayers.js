import express from "express";
import connection from "../config/configDB.js";

const router = express.Router();

// קבלת רשימת תפילות
router.get("/", (req, res) => {
  const sql = "SELECT * FROM prayers";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching prayers" });
    }
    res.send(results);
  });
});

router.post("/add", (req, res) => {
  const { Prayer_Type, Time, Day_Type, Prayer_Date, Location, Hebrew_Date, Description } = req.body;
  
  const sql = `INSERT INTO prayers 
    (Prayer_Type, Time, Day_Type, Prayer_Date, Hebrew_Date, Location, Description) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [Prayer_Type, Time, Day_Type, Prayer_Date, Hebrew_Date, Location, Description];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error adding prayer" });
    }
    res.status(201).json({ id: result.insertId, Prayer_Type, Time });
  });
});


// עדכון תפילה
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Prayer_Type, Time, Prayer_Date, Location, Hebrew_Date, Description } = req.body;

  const sql = "UPDATE prayers SET Prayer_Type = ?, Time = ?, Prayer_Date = ?, Location = ?, Hebrew_Date = ?, Description = ? WHERE id = ?";
  const values = [Prayer_Type, Time, Prayer_Date, Location, Hebrew_Date, Description, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating prayer" });
    }
    res.status(200).json({ message: "Prayer updated successfully" });
  });
});

// מחיקת תפילה לפי מזהה
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM prayers WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting prayer" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Prayer not found" });
    }
    res.status(200).json({ message: "Prayer deleted successfully" });
  });
});

export default router;
