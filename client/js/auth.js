// Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginButton = document.getElementById('login-button'); // Assuming you have a button with this ID

    // Input validation
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Disable the button and show loading state
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.error || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert("An error occurred while logging in. Please try again.");
    } finally {
        // Re-enable the button and reset text
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }
});

// Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const signupButton = document.getElementById('signup-button'); // Assuming you have a button with this ID

    // Input validation
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Disable the button and show loading state
    signupButton.disabled = true;
    signupButton.textContent = "Signing up...";

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Clear input fields
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            window.location.href = 'login.html';
        } else {
            alert(data.error || "Signup failed. Please try again.");
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert("An error occurred while signing up. Please try again.");
    } finally {
        // Re-enable the button and reset text
        signupButton.disabled = false;
        signupButton.textContent = "Sign Up";
    }
});