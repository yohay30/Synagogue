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

export default router;