document.addEventListener("DOMContentLoaded", function () {
    // Check if editing an employee
    const editEmployeeId = localStorage.getItem("editEmployeeId");
    if (editEmployeeId) {
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const employee = employees.find((emp) => emp.id === parseInt(editEmployeeId));

        if (employee) {
            document.getElementById("name").value = employee.name;
            document.getElementById("email").value = employee.email;
            document.getElementById("mobile").value = employee.mobile;
            document.getElementById("designation").value = employee.designation;

            document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;

            const courses = employee.courses.split(", ");
            courses.forEach((course) => {
                const checkbox = document.querySelector(`input[name="course"][value="${course}"]`);
                if (checkbox) checkbox.checked = true;
            });

            document.getElementById("submit").textContent = "Update Employee";
        }
    }

    document.getElementById("employeeForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile").value;
        const designation = document.getElementById("designation").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const courses = Array.from(
            document.querySelectorAll('input[name="course"]:checked')
        ).map((course) => course.value);

        const imageFile = document.getElementById("image").files[0];
        let imageBase64 = "";

        if (imageFile) {
            imageBase64 = await toBase64(imageFile); // Convert image to Base64
        }

        // Retrieve existing employees
        const employees = JSON.parse(localStorage.getItem("employees")) || [];

        if (editEmployeeId) {
            // Update existing employee
            const index = employees.findIndex((emp) => emp.id === parseInt(editEmployeeId));
            if (index !== -1) {
                employees[index] = {
                    ...employees[index],
                    name,
                    email,
                    mobile,
                    designation,
                    gender,
                    courses: courses.join(", "),
                    image: imageBase64 || employees[index].image,
                };
            }
            localStorage.removeItem("editEmployeeId");
        } else {
            // Create a new employee
            const employee = {
                id: Date.now(),
                name,
                email,
                mobile,
                designation,
                gender,
                courses: courses.join(", "),
                image: imageBase64,
                createdDate: new Date().toLocaleDateString(),
            };
            employees.push(employee);
        }

        localStorage.setItem("employees", JSON.stringify(employees));
        window.location.href = "employee list.html";
    });
});

// Helper function to convert file to Base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
