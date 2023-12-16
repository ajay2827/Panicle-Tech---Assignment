import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand href="#home">Panicle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addEmployee">Add Employee</Nav.Link>
            <Nav.Link href="/employees">Employees</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
