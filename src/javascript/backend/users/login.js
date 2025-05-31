document.getElementById('login_submit').addEventListener('click', function(e) {
    e.preventDefault();

    /**
     * Basic login logic
     * Assuming user data is validated and stored securely.
     * This is a placeholder and does not handle user data securely.
     */
    location.href = '../home.html';
    console.log('User logged in');
});

document.getElementById('signup_submit').addEventListener('click', function(e) {
    e.preventDefault();

    /**
     * Basic signup logic 
     * Assuming user data is validated and stored securely.
     * This is a placeholder and does not handle user data securely.
     */
    location.href = '../home.html';
    console.log('User signed up');
});