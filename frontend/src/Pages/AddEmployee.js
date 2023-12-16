import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormFilled = Object.values(formData).every((field) => field !== '');
    if (!isFormFilled) {
      toast.error('Please fill in all fields.');
      return;
    }

    const response = await axios.post(
      'http://localhost:5500/api/v1/employee',
      formData
    );
    console.log(response);
    if (response.status !== 200) {
      toast.error(response.data.message);
      return;
    }

    toast.success('Employee added successfully');
    setFormData({
      name: '',
      email: '',
      department: '',
      position: '',
      salary: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-content-center">
      <Form
        onSubmit={handleSubmit}
        className="p-4 rounded-4 shadow-sm w-75 bg-white"
      >
        <h2 className=" mx-auto w-100">Employee Form</h2>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPosition">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddEmployee;
