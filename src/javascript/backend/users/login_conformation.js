/**
* @file login.js
* @description Handles the login and signup forms on the home page
*/

import {is_logged_in} from 'login.js';

document.addEventListener('DOMContentLoaded', function() {
    /**
     * @description Handles the conformation of the users signup form
     * @type {HTMLButtonElement}
     */
    const signup_submit = document.querySelector('.signup_submit');

    /**
     * @description Handles the conformation of the user login form
     * @type {HTMLButtonElement}
     */
    const login_submit = document.querySelector('.login_submut');

    login_submit.onClick = function() {
        location.href = '../home.html';
        console.log('user logged in');
        is_logged_in = localStorage.setItem('currentUser', JSON.stringify({
            username: document.querySelector('.login_username').value,
            email: document.querySelector('.login_email').value
        }));
    };

    signup_submit.onClick = function() {
        location.href = '../home.html';
        console.log('user logged in');
         is_logged_in = localStorage.setItem('currentUser', JSON.stringify({
            username: document.querySelector('.signup_username').value,
            email: document.querySelector('.signup_email').value
        }));
    };
});