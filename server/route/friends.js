import express from "express";
import connection from "../config/configDB.js";

const router = express.Router();

// קבלת רשימת חברים
router.get("/", (req, res) => {
  const sql = "SELECT * FROM synagogue.community_members2";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching members" });
    }
    res.send(results);
  });
});




// הוספת חבר קהילה

router.post("/add/admin", (req, res) => {
  console.log("req.body -",req.body);
  
  const { first_name, last_name, phone, email, address, password, is_admin , id_number } = req.body;

  // בדיקה האם כל השדות הנדרשים קיימים
  if (!first_name || !last_name || !phone || !email || !id_number) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO community_members2 
    (first_name, last_name, phone, email, address, password, id_number, is_admin) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    first_name,
    last_name,
    phone,
    email,
    address || null, // אם אין כתובת, יש להכניס null
    password,
    id_number,
    is_admin ? 1 : 0, // ודא שהשדה is_admin הוא 0 או 1
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error adding member" });
    }

    console.log("Member added successfully:", result);
    res.status(201).json({
      id: result.insertId,
      first_name,
      last_name,
      message: "Member added successfully",
    });
  });
});




// עדכון הרשאת משתמש
router.put("/:id/admin", (req, res) => {
  const { id } = req.params;
  const { is_admin } = req.body;

  // בדוק אם למשתמש הנוכחי יש הרשאות מנהל
  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // נקה את קלט המשתמש לפני שימוש בשאילתת SQL
  const sql = "UPDATE community_members2 SET is_admin = ? WHERE id = ?";
  const values = [is_admin, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating admin status" });
    }

    res.status(200).json({ message: "Admin status updated successfully" });
  });
});




// מחיקת חבר קהילה לפי מזהה
router.delete("/:id", (req, res) => {
  const { id } = req.params; // מזהה החבר למחיקה
  const sql = "DELETE FROM community_members2 WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting member" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully" });
  });
});


// עדכון חבר בקהילה
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, email, address, is_admin } = req.body;

  const sql = `UPDATE community_members2 SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ?, is_admin = ? WHERE id = ?`;
  const values = [first_name, last_name, phone, email, address, is_admin, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Error updating user information" });
    }
    res.status(200).json({ message: "User information updated successfully" });
  });
});

export default router;