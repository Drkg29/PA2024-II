import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Auth = ({ authenticateUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        authenticateUser(data.role);
        navigate(data.role === 'admin' ? '/admin/dashboard' : '/');
      } else {
        setError(data.message || 'Error en el login');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado. Ahora puedes iniciar sesión.');
        setIsLogin(true);
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setError(null);
    if (isLogin) {
      loginUser();
    } else {
      registerUser();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Registro'}</h2>
        <form onSubmit={handleAuth} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Cargando...' : (isLogin ? 'Login' : 'Registro')}
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}

        <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
          {isLogin ? 'Ir a Registro' : 'Ir a Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
