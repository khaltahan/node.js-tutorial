// const data = {};
// data.employees = require("../model/employees.json");
const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  let newID = Object.keys(data).length + 1;
  // Create the new employee
  const newEmployee = {
    // id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    id: newID,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  // Make sure they have a first and last name
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ message: "First and last names are required." });
  }

  // Add new employee
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  // Find the employee with the inputted id
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  // If an employee with that id is not found
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  // If the employee has a first name, make his new firstname, the same one as the user entered
  if (req.body.firstname) employee.firstname = req.body.firstname;
  // If the employee has a last name, make his new lastname, the same one as the user entered
  if (req.body.lastname) employee.lastname = req.body.lastname;
  // Filter the JSON and remove the employee with the same id the user entered
  const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  // Add the new employee to replace the removed one
  const unsortedArray = [...filteredArray, employee];
  // Sort employees by id number
  data.setEmployees(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  // Find the employee with the inputted id
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  // If an employee with that id is not found
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  // Filter the JSON and remove the employee with the same id the user entered
  const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  // Make the new JSON file only consist of the array without the deleted employee
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  // Find the employee with the inputted id
  const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id));
  // If an employee with that id is not found
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
