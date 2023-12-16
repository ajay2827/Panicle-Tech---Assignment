import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { AddEmployee, Employees, Home } from './Pages/index';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Home Page route */}
        <Route path="/" element={<Home />} />
        {/* add employee route */}
        <Route path="/addEmployee" element={<AddEmployee />} />
        {/* Employees route */}
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;
