import fetchMovies, { fetchMovieDetails } from "../api/api_services.js";

document.addEventListener("DOMContentLoaded", function (e) {
  fetchMovies();
  fetchMovieDetails();
  e.preventDefault();
  console.log("Home page loaded");
});
