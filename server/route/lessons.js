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
export default router;