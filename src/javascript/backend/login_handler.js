/**
 * Basic login / logout system for node.js
 * Due to Film Haven being a prototype, this code is not complete and doesnt' handle user sessions or any sort of encryption.
 */

document.addEventListener('DOMContentLoaded', function() {
    const is_logged_in = localStorage.getItem('currentUser');
    const login_btn = document.getElementById('login-btn');
    const logout_btn = document.getElementById('logout-btn');

    login_btn.addEventListener('click', function() {
        // Handle login logic here
        // Example: Redirect to a login page or show a modal with login form
        // Example: Store user's credentials in local storage or session storage
        // Example: Update the UI to reflect a logged-in user
        location.href = 'login.html';
        localStorage.setItem('currentUser', JSON.stringify({ username: 'example_user', password: 'example_password' }));
        console.log('User logged in');
        is_logged_in = true;
    });

    logout_btn.addEventListener('click', function() {
        // Handle logout logic here
        // Example: Clear user's credentials from local storage or session storage
        // Example: Update the UI to reflect a logged-out user
        location.href = 'home.html';
        localStorage.removeItem('currentUser');
        console.log('User logged out');
        is_logged_in = false;
    });

    if (is_logged_in) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block';
    } else {
        document.getElementById('logout-btn').style.display = 'none';
        document.getElementById('login-btn').style.display = 'block';
    }
});

