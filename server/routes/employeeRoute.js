const express = require('express');
const router = express.Router();

const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// register employee route
router.route('/').post(createEmployee);

// updaring employee route
router.route('/:id').put(updateEmployee).delete(deleteEmployee);

module.exports = router;
