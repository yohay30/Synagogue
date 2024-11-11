import express from "express";
import connection from "../config/configDB.js";

const router = express.Router();

//  לקבלת רשימת חברים
router.get("/", (req, res) => {
  const sql = "SELECT * FROM synagogue.community_members2";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching members" });
    }
    res.send(results);
  });
});

// עדכון הרשאת משתמש
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { is_admin } = req.body;
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
    // ביצוע השאילתה עם מזהה החבר
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
