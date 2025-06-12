/**
 * Basic login / logout system for node.js
 * Due to Film Haven being a prototype, this code is not complete and doesnt' handle user sessions or any sort of encryption.
 */

document.addEventListener("DOMContentLoaded", function () {
    /**
     * @description Checks if the user is logged in by checking localStorage
     * @type {boolean}
     */
    const is_logged_in = localStorage.getItem("currentUser");

    /**
     * @description Basic login button that redirects you to the login page
     * @type {HTMLButtonElement}
     */
    const login_btn = document.getElementById("login-btn");

    /**
     * @description Basic logout button that clears localStorage, and redirects to the home page.
     * @type {HTMLButtonElement}
     */
    const logout_btn = document.getElementById("logout-btn");

    login_btn.addEventListener("click", function () {
        location.href = "/users/register";
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                username: "example_user",
                password: "example_password",
            }),
        );
        console.log("User logged in");
    });

    logout_btn.addEventListener("click", function () {
        location.reload();
        localStorage.removeItem("currentUser");
        console.log("User logged out");
        is_logged_in = false;
    });

    if (is_logged_in) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
    } else {
        document.getElementById("logout-btn").style.display = "none";
        document.getElementById("login-btn").style.display = "block";
    }

    document
        .getElementById("login_submit")
        .addEventListener("click", function (e) {
            e.preventDefault();
            location.href = "../index.ejs";
            console.log("User logged in");
            is_logged_in = true;
        });

    console.log(is_logged_in ? "User is logged in" : "User is not logged in");
});
