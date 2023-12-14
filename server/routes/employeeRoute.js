const express = require('express');
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// register and getting employee route
router.route('/').post(createEmployee).get(getEmployees);

// updaring and deleting employee route
router.route('/:id').put(updateEmployee).delete(deleteEmployee);

module.exports = router;
