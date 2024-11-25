import express from "express";
import connection from "../config/configDB.js";

const router = express.Router();

// קבלת רשימת אזכרות
router.get("/", (req, res) => {
    const sql = "SELECT * FROM synagogue.memorials_hebrew; ";
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching memorials" });
        }
        res.send(results);
    });
});

// הוספת אזכרה חדשה
router.post("/add", (req, res) => {
    const { deceased_name, hebrew_date, date, notes } = req.body;
    const sql = "INSERT INTO synagogue.memorials_hebrew (deceased_name, hebrew_date, date, notes) VALUES (?, ?, ?, ?)";
    connection.query(sql, [deceased_name, hebrew_date, date, notes], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error adding memorial" });
        }
        res.status(201).json({
            id: result.insertId,
            deceased_name,
            hebrew_date,
            date,
            notes,
        });
    });
});

// עדכון אזכרה
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { deceased_name, hebrew_date, date, notes } = req.body;
    const sql = "UPDATE synagogue.memorials_hebrew SET deceased_name = ?, hebrew_date = ?, date = ?, notes = ? WHERE id = ?";
    connection.query(sql, [deceased_name, hebrew_date, date, notes, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error updating memorial" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Memorial not found" });
        }
        res.status(200).json({
            id,
            deceased_name,
            hebrew_date,
            date,
            notes,
        });
    });
});

// מחיקת אזכרה
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM synagogue.memorials_hebrew WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting memorial" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Memorial not found" });
        }
        res.status(200).json({ message: "Memorial deleted successfully" });
    });
});

export default router;
