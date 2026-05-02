import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const BACKEND_BASE_URL = (
    process.env.BACKEND_BASE_URL || `http://localhost:${process.env.PORT || 5000}`
).replace(/\/$/, "");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


export const sendVerificationMail = async (email, token) => {
    const verificationLink = `${BACKEND_BASE_URL}/api/auth/verify-email/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your Email",
        html: `<p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>`
    };

    await transporter.sendMail(mailOptions);
};

export const sendResetPasswordMail = async (email, token) => { 
    const resetLink = `${BACKEND_BASE_URL}/api/auth/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your Password",
        html: `<p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>`
    };

    await transporter.sendMail(mailOptions);
}

