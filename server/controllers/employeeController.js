const admin = require('../config/firebaseConfig');
const Employee = require('../models/employeeModel');

exports.addEmployee = async (req, res) => {
  const { name, email, role, description } = req.body;

  try {
    const newEmployee = new Employee(name, email, role, description);
    const employeeRef = admin.database().ref('employees').push();
    await employeeRef.set(newEmployee);

    res.status(201).json({ message: 'Employee added successfully', employeeId: employeeRef.key });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const snapshot = await admin.database().ref('employees').once('value');
    const employees = snapshot.val() || {};
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, description } = req.body;

  try {
    await admin.database().ref(`employees/${id}`).update({ name, email, role, description });
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await admin.database().ref(`employees/${id}`).remove();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};