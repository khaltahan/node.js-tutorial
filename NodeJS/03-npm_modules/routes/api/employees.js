const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
// Import data from jspn file
data.employees = require("../../data/employees.json");

// We used route("/") because the get, post and put request all require "/". So we did that to chain them and save space
router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

// Takes a parameter as id
// Notice how it is req.params and not req.body
router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
