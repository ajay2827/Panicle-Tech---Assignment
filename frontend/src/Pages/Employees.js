import React, { useState, useEffect } from 'react';
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import axios from 'axios';

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5500/api/v1/employee')
      .then((response) => {
        const result = response.data.employees;
        setEmployeeData(result);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const sortData = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
    const sortedEmployees = [...employeeData].sort((a, b) => {
      const comparison = a[field].localeCompare(b[field]);
      return isAsc ? comparison : -comparison;
    });
    setEmployeeData(sortedEmployees);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employeeData.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const handleEdit = (employee) => {
    // Open a modal or form to edit employee details
    // You can implement a separate EditEmployee component or a modal for editing here
    console.log('Editing employee:', employee);
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`http://localhost:5500/api/v1/employee/${employeeId}`)
      .then((response) => {
        setEmployeeData((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? <BsArrowUp /> : <BsArrowDown />;
    }
    return null;
  };

  const handleNameClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h1>Employee List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => sortData('name')}>
              Name {getSortIndicator('name')}
            </th>
            <th onClick={() => sortData('department')}>
              Department {getSortIndicator('department')}
            </th>
            <th onClick={() => sortData('position')}>
              Position {getSortIndicator('position')}
            </th>
            <th onClick={() => sortData('salary')}>
              Salary {getSortIndicator('salary')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Button
                  variant="light"
                  style={{
                    border: 'none',
                    backgroundColor: '#DCDCDC',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    color: 'black',
                  }}
                  onClick={() => handleNameClick(employee)}
                >
                  {employee.name}
                </Button>
              </td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({
          length: Math.ceil(employeeData.length / employeesPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEmployee?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Department: {selectedEmployee?.department}</p>
          <p>Position: {selectedEmployee?.position}</p>
          <p>Salary: {selectedEmployee?.salary}</p>
          {/* Add buttons for editing or deleting here */}
          <div>
            <Button
              variant="primary"
              onClick={() => handleEdit(selectedEmployee)}
            >
              Edit
            </Button>{' '}
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedEmployee.id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employees;
