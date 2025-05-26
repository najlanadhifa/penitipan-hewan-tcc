import React, { useState } from 'react';
import '../css/login.css';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [Password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', { Username, Password });
    navigate('/'); // Redirect ke login setelah register
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>Daftar</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="masukkan username"
            required
          />

          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="masukkan password"
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="form-footer">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
