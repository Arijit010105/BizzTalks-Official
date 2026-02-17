const fs = require('fs');
const path = require('path');

// On Vercel, we might not be able to write to this path.
// We use /tmp if available, or just fail silently without crashing the app.
const dataDir = path.join(__dirname, '../data');
const messagesFile = path.join(dataDir, 'messages.json');

const saveMessageLocally = (messageData) => {
    try {
        // Ensure data directory exists (ONLY when saving, not on startup)
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Ensure messages file exists
        if (!fs.existsSync(messagesFile)) {
            fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
        }

        const fileContent = fs.readFileSync(messagesFile, 'utf-8');
        const messages = JSON.parse(fileContent);

        const newMessage = {
            ...messageData,
            id: Date.now().toString(),
            savedAt: new Date().toISOString()
        };

        messages.push(newMessage);

        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
        console.log('Message saved locally to data/messages.json');
        return true;
    } catch (error) {
        // Log potential Vercel/Permissions error but DO NOT CRASH
        console.warn('Backup storage skipped (Expected on Vercel):', error.message);
        return false;
    }
};

module.exports = { saveMessageLocally };
