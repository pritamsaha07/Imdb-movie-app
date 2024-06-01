// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import React, { useState, useEffect } from 'react';

const authStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000', 
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'black', // Changed to black
    color: 'darkgoldenrod', // Changed to dark yellow
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  buttonHover: {
    backgroundColor: 'darkgoldenrod', 
  },
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');

      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setIsLoggedIn(true);
      }
    }, []);

    const handleLogin = (e) => {
      e.preventDefault();

      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
    
      if (email === storedEmail && password === storedPassword) {
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
        navigate('/home');
      } else {
        alert('Invalid email or password');
      }
    };

    const handleSignup = () => {
      navigate('/signup');
    };

    return (
      <div style={authStyles.container}>
        <form style={authStyles.form} onSubmit={handleLogin}>
          <h2>Login</h2>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Email:</label>
            <input type="email" required style={authStyles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Password:</label>
            <input type="password" required style={authStyles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={authStyles.button}>Login</button>
          <p style={{ textAlign: 'center' }}>Not signed up yet? <button type="button" onClick={handleSignup} style={{ ...authStyles.button, marginTop: '0.5rem' }}>Sign Up</button></p>
        </form>
      </div>
    );
  };

  const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
      e.preventDefault();
    
      if (password === confirmPassword) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful signup
        navigate('/home');
      } else {
        alert('Passwords do not match');
      }
    };

    return (
      <div style={authStyles.container}>
        <form style={authStyles.form} onSubmit={handleSignup}>
          <h2>Signup</h2>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Email:</label>
            <input type="email" required style={authStyles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Password:</label>
            <input type="password" required style={authStyles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label}>Confirm Password:</label>
            <input type="password" required style={authStyles.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" style={authStyles.button}>Signup</button>
          <p style={{ textAlign: 'center' }}>Already signed up? <button type="button" onClick={() => navigate('/')} style={{ ...authStyles.button, marginTop: '0.5rem' }}>Login</button></p>
        </form>
      </div>
    );
  };

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
