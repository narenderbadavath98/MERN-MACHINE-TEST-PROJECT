function handleLogin() {
    // Fetch user input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate a login check (in a real application, check with a database)
    if (username === 'user@123' && password === '1234567') {
        // Redirect to another page
        window.location.href = "dashbord.html";
    } else {
        alert("Incorrect username or password.");
    }
    return false; // Prevent form submission
}