import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import "../src/css/global.css"
import Signup from './components/SignUp/Signup';
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

export default App;

