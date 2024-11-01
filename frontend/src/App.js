import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [user,setUser]=useState(null);
  return (
    <Router>
      <div className="App">
      <Navbar user={user} setUser={setUser} />
        <Routes>
        <Route
            path="/tasks"
            element={user ?
                <div className='container'>
                  <TaskManager /> 
                  </div>
               
               : <Navigate to="/register" />}
          />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser}/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
