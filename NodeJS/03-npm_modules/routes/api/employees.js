const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");

// We used route("/") because the get, post and put request all require "/". So we did that to chain them and save space
router.route("/").get(employeesController.getAllEmployees).post(employeesController.createNewEmployee).put(employeesController.updateEmployee).delete(employeesController.deleteEmployee);

// Takes a parameter as id
// Notice how it is req.params and not req.body
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
