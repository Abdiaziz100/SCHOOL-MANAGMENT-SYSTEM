import React, { useState } from 'react';
import { postJSON } from '../../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await postJSON('/login', form);
      if (result.user) {
        onLogin(result.user);
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-circle">
                <span className="logo-icon">🎓</span>
              </div>
            </div>
            <h1 className="login-title">SchoolFlow</h1>
            <p className="login-subtitle">Welcome back! Please sign in to continue</p>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          <form className="login-form" onSubmit={submit}>
            <div className="input-group">
              <div className="input-icon">👤</div>
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
                className="login-input"
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">🔒</div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                className="login-input"
              />
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="button-spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <div className="button-arrow">→</div>
                </>
              )}
            </button>
          </form>
          
          <div className="demo-credentials">
            <div className="demo-header">
              <span className="demo-icon">🔑</span>
              <strong>Demo Credentials</strong>
            </div>
            <div className="demo-info">
              <div className="credential-item">
                <span className="credential-label">Username:</span>
                <code>abdi2693</code>
              </div>
              <div className="credential-item">
                <span className="credential-label">Password:</span>
                <code>abdi2693</code>
              </div>
            </div>
          </div>
          
          <div className="login-footer">
            <p>© 2024 SchoolFlow Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}