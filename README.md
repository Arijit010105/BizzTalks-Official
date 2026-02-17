# BizzTalks Official Backend

This is the Node.js/Express backend for the BizzTalks official website.

## 🚀 Features
- **Triple-Layer Message Storage:**
  1.  **Local Backup:** Saves to `data/messages.json` (Fail-safe).
  2.  **MongoDB:** Saves to Atlas Database.
  3.  **Email:** Sends notification via Gmail (Nodemailer).
- **CORS Enabled:** Supports frontend connections from different origins.

## 🛠️ Setup
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file with your credentials:
    ```env
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    MONGO_URI=your-mongodb-uri
    ```
4.  Run the server:
    ```bash
    npm start
    ```

## ⚠️ Vercel Deployment Warning
**IMPORTANT:** This project is configured for Vercel, BUT:
1.  **Local File Storage (`data/messages.json`) WILL NOT WORK on Vercel.** Vercel file systems are ephemeral (temporary). You will lose messages saved this way.
2.  **You MUST fix the MongoDB Connection** for production usage.
    *   Ensure your MongoDB Atlas Network Access whitelist allows traffic (0.0.0.0/0).
3.  **Email Sending** requires a valid Google App Password.

## API Endpoints
- `POST /api/contact`: Submits a contact form message.
