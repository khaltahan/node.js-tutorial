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

router.get("/new-page(.html)?", (req, res) => {
  // A 200 OK message is automatically sent
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  // By default, a 302 message is sent, so that is why we include the 301 message
  res.redirect(301, "/new-page.html");
});

module.exports = router;
