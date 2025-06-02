document.addEventListener('DOMContentLoaded', function() {
    /**
     * @description Handles whether the user is logged in or not using localStorage.
     * @type {string|null}
     * @returns {boolean} true if the user is logged in, false otherwise
     */
    const is_logged_in = localStorage.getItem('currentUser');

    /**
     * @description Basic login button that redirects you the the registration page
     * @type {HTMLButtonElement}
     */
    const login_btn = document.querySelector('.login-btn');

    /**
     * @description Basic logout button that clears localStorage, and refreshes the home page.
     * @type {HTMLButtonElement}
     */
    const logout_btn = document.querySelector('.logout-btn');

    login_btn.onClick = function() {
        location.href = 'users/registration.html';
        console.log('click');
    };

    logout_btn.onClick = function() {
        localStorage.removeItem('currentUser');
        location.reload();
    };

    if (is_logged_in) {
       document.querySelector('.login-btn').style.display = 'none';
       document.querySelector('.logout-btn').style.display = 'block';
    } else {
       document.querySelector('.login-btn').style.display = 'block';
       document.querySelector('.logout-btn').style.display = 'none';
    }
});