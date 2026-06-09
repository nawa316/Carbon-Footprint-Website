import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';
dotenv.config();

const BACKEND_BASE_URL = (
  process.env.BACKEND_BASE_URL || `http://localhost:${process.env.PORT || 5000}`
).replace(/\/$/, '');

const FRONTEND_BASE_URL = (process.env.FRONTEND_BASE_URL || `http://localhost:3000`).replace(
  /\/$/,
  ''
);

const TOKEN = process.env.MAILTRAP_TOKEN || 'a9a3bba22934bdca2227d8dbcc4cbb45'; // fallback token for testing if env not set

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: 'hello@demomailtrap.co',
  name: 'Carbon Footprint App',
};

export const sendVerificationMail = async (email, token) => {
  const verificationLink = `${BACKEND_BASE_URL}/api/auth/verify-email/${token}`;

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: 'Verify your Email',
      html: `<p>Click the link below to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>`,
      category: 'Email Verification',
    });
    console.log('Verification email sent to', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export const sendResetPasswordMail = async (email, token) => {
  const resetLink = `${FRONTEND_BASE_URL}/reset-password/${token}`; // Note: Redirects to frontend

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: 'Reset your Password',
      html: `<p>Click the link below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>`,
      category: 'Password Reset',
    });
    console.log('Password reset email sent to', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
