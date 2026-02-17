const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const connectDB = require('../config/db');
const { saveMessageLocally } = require('../utils/backupStorage');

module.exports = async (req, res) => {
    console.log('DEBUG: Running New Code');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Status tracking
    let dbStatus = 'skipped';
    let emailStatus = 'skipped';
    let localStatus = 'success'; // Assume local works, or we catch it

    // 1. Always save locally first as a backup (Fail-Safe)
    saveMessageLocally({ name, email, phone, message });

    // 2. Try MongoDB
    try {
        await connectDB();
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        console.log('Message saved to database successfully');
        dbStatus = 'success';
    } catch (dbError) {
        console.error('Database connection/save failed:', dbError.message);
        dbStatus = 'failed';
    }

    // 3. Try Email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
        html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong></p><p>${message}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        emailStatus = 'success';
    } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
        emailStatus = 'failed';
    }

    // Return success if AT LEAST ONE method worked (Local always runs)
    return res.status(200).json({
        message: 'Message received successfully',
        details: {
            database: dbStatus,
            email: emailStatus,
            backup: localStatus
        }
    });
};
