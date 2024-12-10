const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL, // Ensure this is set in your .env file
});

module.exports = admin;