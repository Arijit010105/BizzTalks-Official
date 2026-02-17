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
connectDB();

// Middleware
app.use(cors()); // Enable All CORS Requests
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files

// API Route
app.post('/api/contact', async (req, res) => {
    await contactApi(req, res);
});

// Fallback for SPA or static site
app.get(/^(.*)$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;
