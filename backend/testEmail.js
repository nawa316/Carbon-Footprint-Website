import { sendVerificationMail } from './config/nodemailer.js';
import jwt from 'jsonwebtoken';

// Test send verification email
const testEmail = 'test@example.com';
const testToken = jwt.sign({ id: 'test123' }, process.env.JWT_SECRET || 'secret', {
  expiresIn: '1d',
});

console.log('Testing email send...');
console.log('Email:', testEmail);
console.log('Token:', testToken);
console.log('Mailtrap Config:', {
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  user: process.env.MAILTRAP_USER ? '***' : 'NOT SET',
  password: process.env.MAILTRAP_PASSWORD ? '***' : 'NOT SET',
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
