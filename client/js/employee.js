import { ref, set, get, remove, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { database } from "./firebase.js";

document.addEventListener("DOMContentLoaded", fetchEmployees);

async function fetchEmployees() {
    try {
        const employeesRef = ref(database, "employees");
        const snapshot = await get(employeesRef);

        const employeeTable = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
        employeeTable.innerHTML = ""; // Clear existing rows

        if (snapshot.exists()) {
            const employees = snapshot.val();
            for (const id in employees) {
                const employee = employees[id];
                const row = employeeTable.insertRow();
                row.innerHTML = `
                    <td>${id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.role}</td>
                    <td>${employee.description}</td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditEmployeeModal('${id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEmployee('${id}')">Delete</button>
                    </td>
                `;
            }
        } else {
            console.log("No employees found");
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

document.getElementById('add-employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEmployee = {
        name: document.getElementById('employee-name').value,
        email: document.getElementById('employee-email').value,
        role: document.getElementById('employee-role').value,
        description: document.getElementById('employee-description').value,
    };

    try {
        const newEmployeeRef = ref(database, `employees/${Date.now()}`);
        await set(newEmployeeRef, newEmployee);
        fetchEmployees(); // Refresh employee list
        closeModal('#addEmployeeModal');
    } catch (error) {
        console.error("Error adding employee:", error);
    }
});

async function deleteEmployee(id) {
    try {
        const employeeRef = ref(database, `employees/${id}`);
        await remove(employeeRef);
        fetchEmployees(); // Refresh employee list
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
}

async function openEditEmployeeModal(id) {
    try {
        const employeeRef = ref(database, `employees/${id}`);
        const snapshot = await get(employeeRef);

        if (snapshot.exists()) {
            const employee = snapshot.val();
            document.getElementById('employee-name').value = employee.name;
            document.getElementById('employee-email').value = employee.email;
            document.getElementById('employee-role').value = employee.role;
            document.getElementById('employee-description').value = employee.description;

            const addEmployeeForm = document.getElementById('add-employee-form');
            addEmployeeForm.onsubmit = async (e) => {
                e.preventDefault();
                const updatedEmployee = {
                    name: document.getElementById('employee-name').value,
                    email: document.getElementById('employee-email').value,
                    role: document.getElementById('employee-role').value,
                    description: document.getElementById('employee-description').value,
                };

                try {
                    await update(employeeRef, updatedEmployee);
                    fetchEmployees(); // Refresh employee list
                    closeModal('#addEmployeeModal');
                } catch (error) {
                    console.error("Error updating employee:", error);
                }
            };

            $('#addEmployeeModal').modal('show');
        } else {
            console.log("Employee not found");
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
    }
}

function closeModal(modalId) {
    $(modalId).modal('hide');
}