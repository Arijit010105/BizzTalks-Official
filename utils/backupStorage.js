const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const messagesFile = path.join(dataDir, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure messages file exists
if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
}

const saveMessageLocally = (messageData) => {
    try {
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
        console.error('Failed to save message locally:', error);
        return false;
    }
};

module.exports = { saveMessageLocally };
