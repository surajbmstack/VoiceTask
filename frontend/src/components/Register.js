import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://voicetaskbackend.onrender.com/api/auth/register', { username, password });
     const res= await axios.post('https://voicetaskbackend.onrender.com/api/auth/login', { username, password });
      setUser(res.data);
      localStorage.setItem("token", res.data.token);
      navigate('/tasks')
      alert("welcome")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
