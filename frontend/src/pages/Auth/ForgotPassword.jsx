import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoginSignup.css';
import { apiUrl } from '../../config/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please enter your email!' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/auth/forgot-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({ icon: 'success', title: 'Sent!', text: data.message });
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: data.message || 'Something went wrong' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Server connection error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container active" id="container">
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleForgotSubmit}>
            <h1>Forgot Password</h1>
            <span>Enter your email to receive a reset link</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <p
              style={{ marginTop: '20px', cursor: 'pointer', color: '#5E8C61' }}
              onClick={() => navigate('/auth')}
            >
              Back to Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
