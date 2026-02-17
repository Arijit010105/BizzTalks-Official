const nodemailer = require('nodemailer');
require('dotenv').config();

async function verifyTransport() {
    console.log('Testing with user:', process.env.EMAIL_USER);
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : ''
            }
        });

        await transporter.verify();
        console.log('SUCCESS: Server is ready to take our messages');
    } catch (error) {
        console.error('FAILURE: Error verifying transport:', error.message);
    }
}

verifyTransport();
