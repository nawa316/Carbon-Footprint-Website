import { sendVerificationMail } from './config/nodemailer.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Test send verification email
const testEmail = 'test@example.com';
const testToken = jwt.sign({ id: 'test123' }, process.env.JWT_SECRET || 'secret', {
  expiresIn: '1d',
});

console.log('Testing email send...');
console.log('Email:', testEmail);
console.log('Token:', testToken);
console.log('Mailgun Config:', {
  login: process.env.MAILGUN_SMTP_LOGIN,
  password: process.env.MAILGUN_SMTP_PASSWORD ? '***' : 'NOT SET',
  sender: process.env.MAILGUN_SENDER_EMAIL || process.env.MAILGUN_SMTP_LOGIN,
});

sendVerificationMail(testEmail, testToken)
  .then(() => {
    console.log('Email sent successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
