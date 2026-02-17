const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const contactApi = require('./api/contact.js');
const connectDB = require('./config/db.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
// connectDB(); // Removed for Vercel safety - API route connects on demand

// Middleware
app.use(cors()); // Enable All CORS Requests
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

// API Route
app.post('/api/contact', async (req, res) => {
    await contactApi(req, res);
});

// 404 handler for API (Optional, just to be clean)
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;
