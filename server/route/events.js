import express from "express";
import connection from "../config/configDB.js";

const router = express.Router();

// קבלת רשימת אירועים
router.get("/", (req, res) => {
  const sql = "SELECT * FROM synagogue.events";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching events" });
    }
    res.send(results);
  });
});

// הוספת אירוע חדש
router.post("/add", (req, res) => {
  const { event_name, event_date, event_time, location, description } = req.body;
  const sql = "INSERT INTO synagogue.events (event_name, event_date, event_time, location, description) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [event_name, event_date, event_time, location, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error adding event" });
    }
    res.json({ id: result.insertId, event_name, event_date, event_time, location, description });
  });
});

// עדכון אירוע
router.put("/:id", (req, res) => {
  const { event_name, event_date, event_time, location, description } = req.body;
  const sql = "UPDATE synagogue.events SET event_name = ?, event_date = ?, event_time = ?, location = ?, description = ? WHERE id = ?";
  connection.query(
    sql,
    [event_name, event_date, event_time, location, description, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error updating event" });
      }
      res.send("Event updated");
    }
  );
});

// מחיקת אירוע
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM synagogue.events WHERE id = ?";
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting event" });
    }
    res.send("Event deleted");
  });
});

export default router;
