/**
 * Basic login / logout system for node.js
 * Due to Film Haven being a prototype, this code is not complete and doesnt' handle user sessions or any sort of encryption.
 */

document.addEventListener('DOMContentLoaded', function() {
    const is_logged_in = localStorage.getItem('currentUser');

    const login_btn = document.querySelector('.login-btn');
    const logout_btn = document.querySelector('.logout-btn');
    const signup_btn = document.querySelector('.signup-btn');

    login_btn.addEventListener('click', function() {
        // Handle login logic here
        // Example: Redirect to a login page or show a modal with login form
        // Example: Store user's credentials in local storage or session storage
        // Example: Update the UI to reflect a logged-in user
        location.href = 'accounts/login.html';
        localStorage.setItem('currentUser', JSON.stringify({ username: 'example_user', password: 'example_password' }));
        console.log('User logged in');
        is_logged_in = true;
    });

    signup_btn.addEventListener('click', function() {
        // Handle signup logic here
        // Example: Redirect to a signup page or show a modal with signup form
        // Example: Store new user's credentials in local storage or session storage
        // Example: Update the UI to reflect a new user
        location.href = 'accounts/signup.html';
        localStorage.setItem('currentUser', JSON.stringify({ username: 'example_user', email: 'example_email@example.com', password: 'example_password' }));
        console.log('User signed up');
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
        document.querySelector('.login-btn').style.display = 'none';
        document.querySelector('.signup-btn').style.display = 'none';
        document.querySelector('.logout-btn').style.display = 'block';
    } else {
        document.querySelector('.logout-btn').style.display = 'none';
        document.querySelector('.signup-btn').style.display = 'block';
        document.querySelector('.login-btn').style.display = 'block';
    }
});

