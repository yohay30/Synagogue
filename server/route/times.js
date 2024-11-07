const express = require("express");
const router = express.Router();
const connection = require("../config/configDB.js");


router.get("/", (req, res) => {
  res.send("I times");
});
module.exports = router;
