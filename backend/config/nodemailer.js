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

const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: process.env.MAILTRAP_EMAIL || 'hello@demomailtrap.co',
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
    });
    console.log('Verification email sent to', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

export const sendResetPasswordMail = async (email, token) => {
  const resetLink = `${FRONTEND_BASE_URL}/reset-password/${token}`;

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: 'Reset your Password',
      html: `<p>Click the link below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>`,
    });
    console.log('Password reset email sent to', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
