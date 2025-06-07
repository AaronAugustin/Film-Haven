/**
 * @description Defines routes for the application.
 * @type {import('express').Router}
 */
var express = require('express');

/**
 * @description This module defines the main router for the application.
 * @module routes/index
 */
var router = express.Router();


/**
 * GET USERS LISTING
 * @name registration
 * @name login
 * @name signup
 */
router.get("/registration", function(req, res, next) {
    res.render("users/register", { 
        title: "Register - Film Haven"
    });
});

router.get("/login", function(req, res, next) {
    res.render("users/login", {
        title: "Login - Film Haven"
    });
});

router.get("/signup", function(req, res, next) {
    res.render("users/signup", {
        title: "Sign Up - Film Haven"
    });
});

module.exports = router;