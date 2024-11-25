import express from "express";
import connection from "../config/configDB.js";

const router = express.Router();

// קבלת רשימת שיעורים
router.get("/", (req, res) => {
    const sql = "SELECT * FROM synagogue.lessons";
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching lessons" });
        }
        res.send(results);
    });
});

// הוספת שיעור חדש
router.post("/add", (req, res) => {
    const { rabbi_name, topic, day_of_week, lesson_time, location } = req.body;
    const sql = "INSERT INTO synagogue.lessons (rabbi_name, topic, day_of_week, lesson_time, location) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [rabbi_name, topic, day_of_week, lesson_time, location], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error adding lesson" });
        }
        res.status(201).json({
            id: result.insertId,
            rabbi_name,
            topic,
            day_of_week,
            lesson_time,
            location,
        });
    });
});

// עדכון שיעור
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { rabbi_name, topic, day_of_week, lesson_time, location } = req.body;
    const sql = "UPDATE synagogue.lessons SET rabbi_name = ?, topic = ?, day_of_week = ?, lesson_time = ?, location = ? WHERE id = ?";
    connection.query(sql, [rabbi_name, topic, day_of_week, lesson_time, location, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error updating lesson" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.status(200).json({
            id,
            rabbi_name,
            topic,
            day_of_week,
            lesson_time,
            location,
        });
    });
});

// מחיקת שיעור
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM synagogue.lessons WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting lesson" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.status(200).json({ message: "Lesson deleted successfully" });
    });
});

export default router;
