/**
 *  This is a simple example of a Node.js server with a signup and login functionality.
 *  It doesn't handle user sessions or encryption, and is only meant for demonstration purposes.
 *  This is subject to change.
 */

// Mock user database
const users = [];

// Signup function
function signup(username, password) {
    if (users.find(user => user.username === username)) {
        return { success: false, message: 'Username already exists' };
    }
    users.push({ username, password });
    return { success: true, message: 'Signup successful' };
}

// Login function
function login(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        window.location.href = 'home.html';
        return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid username or password' };
}

// Example usage
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const result = signup(username, password);
    alert(result.message);
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const result = login(username, password);
    alert(result.message);
});

document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value;
    const movies = await searchMovies(query);
    console.log('Search results:', movies);
});