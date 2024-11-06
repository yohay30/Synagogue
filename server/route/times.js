const express = require("express");
const router = express.Router();
const connection = require("../config/configDB.js");
router.get("/", (req, res) => {
  res.send("I times");
});

connection.query("SELECT * FROM community_members2", (err, rows) => {
  if (err) throw err;
  console.log("Data received from Db:");
  console.log(rows);
});

router.get("/shabbat", (req, res) => {
  res.send("I shabbat");
});
module.exports = router;
