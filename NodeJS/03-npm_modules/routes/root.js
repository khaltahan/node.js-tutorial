const express = require("express");
const router = express.Router();
const path = require("path");

// ^/$ means this begin with a slash ir it must end with a slash
// | means or
// (.html)? means it is not mandatory but could be used
router.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
