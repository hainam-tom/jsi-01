const admin = require('../config/firebaseConfig');
const User = require('../models/userModel');

exports.registerUser  = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userRecord = await admin.auth().createUser ({
      email,
      password,
    });

    await admin.database().ref(`users/${userRecord.uid}`).set({ email, role });

    res.status(201).json({ message: 'User  created successfully', userId: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Implement password verification logic here (e.g., using bcrypt)
    res.status(200).json({ message: 'Login successful', userId: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await admin.auth().sendPasswordResetEmail(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};