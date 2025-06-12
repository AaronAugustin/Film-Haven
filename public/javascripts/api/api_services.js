import { apikey } from "../api/utils.js";
import { toWelcome } from "../elements/movie-model.js";

const key = apikey;

export default async function fetchMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("fetching movies...");
    displayMovies(data);
    return toWelcome(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data;
    console.log("fetching movie details...");
    return toWelcome(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

function displayMovies(data) {
  const recommended_movies = document.getElementById("movie-recommendations");
  recommended_movies.innerHTML = ""; // Clear any existing content
  data.results.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-card");
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-content"> 
        <div class="rating"> 
          <span class="star">★</span> ${movie.vote_average}
        </div>
      </div>
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date}</p>
      <div class="btn-grp">
        <button class="btn">▶ Watch Trailer</button>
      </div>
    `;
    recommended_movies.appendChild(movieElement);
    console.log("displaying movies...");
  });
}
