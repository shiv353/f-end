import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../src/css/global.css"
import Login from './components/AccessManagement/Login';
import Signup from './components/AccessManagement/Signup';
import Home from './components/Home/Home';
import DashBoard from './components/DashBoard/DashBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path='/signup/*' element={<Signup />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export const server = "http://localhost:5000/api/v1"

export default App;

