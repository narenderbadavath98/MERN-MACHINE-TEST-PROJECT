function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    renderEmployees(employees);
}

function renderEmployees(employees) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Clear existing rows

    employees.forEach((employee) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td><img src="${employee.image}" alt="Avatar" width="50"></td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.mobile}</td>
            <td>${employee.designation}</td>
            <td>${employee.gender}</td>
            <td>${employee.courses}</td>
            <td>${employee.createdDate}</td>
            <td>
                <a href="#" onclick="editEmployee(${employee.id})">Edit</a> - 
                <a href="#" onclick="deleteEmployee(${employee.id})">Delete</a>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function editEmployee(id) {
    localStorage.setItem("editEmployeeId", id);
    window.location.href = "Create employee.html";
}

function deleteEmployee(id) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    loadEmployees();
}

function openCreateEmployeePage() {
    localStorage.removeItem("editEmployeeId");
    window.location.href = "Create employee.html";
}

// Search functionality
function searchEmployees() {
    const searchValue = document.querySelector(".search-input").value.toLowerCase();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchValue)
    );
    renderEmployees(filteredEmployees);
}

// Attach event listener for search
document.querySelector(".search-input").addEventListener("input", searchEmployees);

// Load employees when the page loads
document.addEventListener("DOMContentLoaded", loadEmployees);
