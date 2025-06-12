/**
 * @description Defines routes for the application.
 * @type {import('express').Router}
 */
var express = require("express");

/**
 * @description This module defines the main router for the application.
 * @module routes/index
 */
var router = express.Router();

/**
 * GET HOME PAGE
 * @name index
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home - Film Haven" });
});

/**
 * GET SPAN HOME PAGE
 * @name index-es
 */
router.get("/region/es", function (req, res, next) {
  res.render("region/index-es", { title: "Inicio - Film Haven" });
});

module.exports = router;
