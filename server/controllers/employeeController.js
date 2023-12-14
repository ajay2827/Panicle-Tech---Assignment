const Employee = require('../models/Employee');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// register new Employee
exports.createEmployee = asyncWrapper(async (req, res, next) => {
  let { name, email, department, position, salary } = req.body;

  // checks
  if (!name || !email || !department || !position || !salary) {
    return next(createCustomError(`Provide necessary credentials`, 404));
  }

  // exiting employee
  const exitingEmployee = await Employee.findOne({ email });

  if (exitingEmployee) {
    return next(createCustomError(`Employee already exit`, 404));
  }

  const newEmployee = await Employee.create({
    name,
    email,
    department,
    position,
    salary,
  });

  res.status(200).json({ newEmployee, message: 'Employee added successfully' });
});

// updating the exiting Employee
exports.updateEmployee = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  // checking exiting employee
  const employee = await Employee.findById(id);
  if (!employee) {
    return next(createCustomError(`Employee not found`, 404));
  }

  Object.assign(employee, updateFields);
  await employee.save();

  res.status(200).json({ employee, message: 'Employee updated successfully' });
});

// deleting the exiting Employee
exports.deleteEmployee = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  // checking exiting employee
  const employee = await Employee.findById(id);
  if (!employee) {
    return next(createCustomError(`Employee not found`, 404));
  }
  await Employee.findByIdAndDelete(id);
  res.status(200).json({ employee, message: 'Employee deleted successfully' });
});
