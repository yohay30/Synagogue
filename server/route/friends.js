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

export default router;
