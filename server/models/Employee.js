const moongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'must provide username'],
      maxlength: [20, 'name can not be more than 20 characters'],
      minlength: [4, 'name can not be less than 4 characters'],
    },
    email: {
      type: String,
      require: [true, 'must provide email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    department: {
      type: String,
      require: [true, 'must provide department name'],
    },
    position: {
      type: String,
      require: [true, 'must provide position'],
    },
    salary: {
      type: String,
      require: [true, 'must salary'],
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model('Employee', employeeSchema);
