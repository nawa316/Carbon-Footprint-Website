import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoginSignup.css';
import { apiUrl } from '../../config/api';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please fill all fields!' });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Passwords do not match!' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/auth/reset-password/${token}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({ icon: 'success', title: 'Reset Successful', text: data.message }).then(() => {
          navigate('/auth');
        });
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
          <form action="#" onSubmit={handleResetSubmit}>
            <h1>Reset Password</h1>
            <span>Enter your new password</span>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;