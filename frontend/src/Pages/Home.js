import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:5500/api/v1/employee')
      .then((response) => {
        const result = response.data.employees;
        setEmployeeData(result);
        console.log(employeeData);

        const totalEmp = employeeData.length;
        setTotalEmployees(totalEmp);

        const totalSalary = employeeData.reduce(
          (acc, emp) => acc + parseInt(emp.salary, 10),
          0
        );
        const avgSalary = totalSalary / totalEmp;
        console.log(avgSalary);
        setAverageSalary(avgSalary);

        createDashboardChart(totalEmp, avgSalary);
        createPieChart(employeeData);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [employeeData]);

  const createDashboardChart = (totalEmp, avgSalary) => {
    const ctx = document.getElementById('dashboardChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Employees', 'Average Salary'],
        datasets: [
          {
            label: 'Key Metrics',
            data: [totalEmp, avgSalary.toFixed(2)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const createPieChart = (employees) => {
    const departments = {};
    employees.forEach((emp) => {
      if (departments[emp.department]) {
        departments[emp.department]++;
      } else {
        departments[emp.department] = 1;
      }
    });

    const departmentLabels = Object.keys(departments);
    const departmentData = Object.values(departments);

    const ctx = document.getElementById('departmentPieChart');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: departmentLabels,
        datasets: [
          {
            label: 'Employee Distribution by Department',
            data: departmentData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              // Add more colors as needed for additional departments
            ],
          },
        ],
      },
      options: {
        // Chart.js options here
        // Example: legend, tooltips, etc.
      },
    });
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = employeeData.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(searchQuery) ||
        emp.department.toLowerCase().includes(searchQuery) ||
        emp.position.toLowerCase().includes(searchQuery)
        // Add more fields for filtering as needed
      );
    });
    setFilteredEmployees(filtered);
  };

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-6 gap-3 d-flex flex-column justify-content-end">
          <input
            type="text"
            placeholder="Search employees..."
            className="form-control search-input"
            onChange={handleSearch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="filtered-employees p-3 rounded shadow-sm bg-white">
                <h3>Filtered Employees</h3>
                <ul>
                  {filteredEmployees.map((emp) => (
                    <li key={emp.id}>
                      {emp.name} - {emp.department} - {emp.position}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 p-5">
          <h3>Dashboard</h3>
          <canvas id="dashboardChart" width="100" height="50"></canvas>
        </div>
        <div className="col-md-6 p-5">
          <h3>Employee Distribution by Department</h3>
          <canvas id="departmentPieChart" width="100" height="100"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
