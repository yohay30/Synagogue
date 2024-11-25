import express from "express";
import { check, validationResult } from "express-validator";
import connection from "../config/configDB.js"; // ודא שזו הדרך הנכונה

const router = express.Router();


// קבלת רשימת הודעות
router.get("/", (req, res) => {
    const sql = "SELECT * FROM synagogue.messages";
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching messages" });
        }
        res.send(results);
    });
});



// תיקוף המידע שמגיע מהלקוח
router.post(
  "/add",
  [
    check("title").notEmpty().withMessage("Title cannot be empty"),
    check("message").notEmpty().withMessage("Message cannot be empty"),
    check("type").isIn(["כללי", "מנהלי"]).withMessage("Type must be either 'כללי' or 'מנהלי'"),
    check("sender").notEmpty().withMessage("Sender cannot be empty"),
  ],
  async (req, res) => {
    // טיפול בשגיאות תיקוף
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, message, type, sender } = req.body;

    // יצירת תאריך היצירה באופן אוטומטי ב-MySQL
    const sql = `
      INSERT INTO synagogue.messages (title, message, type, sender, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, [title, message, type, sender], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      
      // החזרת תגובה עם המידע שנשמר
      res.status(201).json({
        id: result.insertId,
        title,
        message,
        type,
        sender,
        created_at: new Date().toLocaleString("he-IL"),  // או ניתן להשאיר את התאריך כפי שהוא מה-DB
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding message", details: err.message });
    }
  }
);


// עדכון ועריכת המידע
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, message, type, sender } = req.body;

  const sql = `
    UPDATE synagogue.messages
    SET title = ?, message = ?, type = ?, sender = ?
    WHERE id = ?
  `;

  connection.query(sql, [title, message, type, sender, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating message" });
    }
    res.status(200).json({ message: "Message updated successfully" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM synagogue.messages WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting message" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  });
});

export default router;