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
 * GET PROTOTYPE PAGE
 * @name index-proto
 */
router.get("/prototype", function (req, res, next) {
  res.render("prototype/index-proto", { title: "Prototype - Film Haven" });
});

/**
 * GET MOVIE DETAILS PAGE
 * @name movie-details
 */
router.get("/movie/:id", function (req, res, next) {
  const movieId = req.params.id;
  res.render("movie-details", {
    title: "Movie Details - Film Haven",
    movieId: movieId,
  });
});

/**
 * GET REGIONAL PAGES
 */
router.get("/region/es/", function (req, res, next) {
  res.render("region/index-es", { title: "Inicio - Film Haven" });
});

router.get("/region/es/movie/:id", function (req, res, next) {
  const movieId = req.params.id;
  res.render("region/movie-details-es", {
    title: "Detalles de la Película - Film Haven",
    movieId: movieId,
  });
});

module.exports = router;
