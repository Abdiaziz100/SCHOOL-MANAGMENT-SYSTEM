import React, { useState } from 'react';
import { postJSON } from '../../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const result = await postJSON('/login', form);
      if (result.user) {
        onLogin(result.user);
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🎓</div>
          <h2 className="login-title">School Management System</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={submit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        

        <div className="demo-info">
          <strong>Demo Credentials:</strong><br />
          Username: abdi2693 | Password: abdi2693
        </div>
      </div>
    </div>
  );
}