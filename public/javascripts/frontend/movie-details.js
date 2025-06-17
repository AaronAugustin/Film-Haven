
import { fetchMovieDetails } from "../api/api_services.js";

document.addEventListener("DOMContentLoaded", async function() {
  const movieId = window.movieId;
  
  if (!movieId) {
    document.getElementById("movie-details-container").innerHTML = 
      "<h2>Movie not found</h2><p>Please go back and try again.</p>";
    return;
  }

  try {
    const movie = await fetchMovieDetails(movieId);
    
    if (!movie) {
      document.getElementById("movie-details-container").innerHTML = 
        "<h2>Movie not found</h2><p>Please go back and try again.</p>";
      return;
    }

    displayMovieDetails(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    document.getElementById("movie-details-container").innerHTML = 
      "<h2>Error loading movie</h2><p>Please try again later.</p>";
  }
});

function displayMovieDetails(movie) {
  const container = document.getElementById("movie-details-container");
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown";
  const runtime = movie.runtime ? `${movie.runtime} minutes` : "Unknown";
  const genres = movie.genres ? movie.genres.map(genre => genre.name).join(", ") : "Unknown";
  
  container.innerHTML = `
    <div class="movie-details">
      <div class="movie-poster">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </div>
      <div class="movie-info">
        <h1>${movie.title} (${releaseYear})</h1>
        <div class="movie-meta">
          <div class="rating">
            <span class="star">★</span> ${movie.vote_average}/10
          </div>
          <p><strong>Runtime:</strong> ${runtime}</p>
          <p><strong>Genres:</strong> ${genres}</p>
          <p><strong>Release Date:</strong> ${movie.release_date || "Unknown"}</p>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>${movie.overview || "No overview available."}</p>
        </div>
        <div class="movie-actions">
          <button class="save-movie" data-movie='${JSON.stringify(movie)}'>💾 Save to Watchlist</button>
          <button class="back-button" onclick="window.history.back()">← Back</button>
        </div>
      </div>
    </div>
  `;

  // Add save functionality
  const saveButton = container.querySelector(".save-movie");
  saveButton.addEventListener("click", () => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      alert("Please sign in to save movies to your watchlist!");
      window.location.href = "/users/register";
      return;
    }

    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const isAlreadySaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);

    if (isAlreadySaved) {
      alert("Movie is already in your watchlist!");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    alert("Movie saved to your watchlist!");
  });
}
