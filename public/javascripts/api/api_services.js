import { apikey } from "../api/utils.js";
import { toWelcome } from "../elements/movie-model.js";

/**
 * @description Get the current language from the URL or default to English
 * @returns {string} - Language code (en-US or es-ES)
 */
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.includes("/es/") || path.includes("-es")) {
    return "es-ES";
  }
  return "en-US";
}

/**
 * @description Fetch movies from the TMDB API. This is the main function that fetches movies from the TMDB API.
 * @returns {Promise<Object>} - A promise that resolves to the fetched movies.
 */
const key = apikey;

export default async function fetchMovies() {
  const language = getCurrentLanguage();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=${language}&page=1`,
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

/**
 * @description Fetch movie details from the TMDB API, ie. title, release date, etc.
 * @param {number} movieId - The ID of the movie to fetch details for.
 */
export const fetchMovieDetails = async (movieId) => {
  const language = getCurrentLanguage();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=${language}`,
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

/**
 * @description Fetch movie genres from the TMDB API.
 * @param {number} movieId - The ID of the movie to fetch details for.
 */
export const fetchMovieGenres = async () => {
  const language = getCurrentLanguage();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=${language}`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    console.log("fetching movie genres...");
    return toWelcome(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

/**
 * @description Fetch saved movies from the TMDB API; Whatever movie the user saved, it should be displayed on the 'watchlist' section of the home page.
 * @param {number} movieId - The ID of the movie to fetch details for.
 */
export const fetchSavedMovies = async () => {
  const language = getCurrentLanguage();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/22066702/watchlist?api_key=${key}&language=${language}&page=1`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    console.log("fetching saved movies...");
    return toWelcome(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

/**
 * @description Fetch movies by genre from the TMDB API.
 * @param {number} genreId - The ID of the genre to fetch movies for.
 */
export { loadSavedMovies };

export const fetchMoviesByGenre = async (genreId) => {
  const language = getCurrentLanguage();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}&language=${language}&page=1`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    console.log("fetching movies by genre...");
    displayGenreMovies(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

function displayGenreMovies(data) {
  /**
   * @description ID that holds genre movies
   * @type {HTMLDivElement}
   */
  const genre_container = document.querySelector(".genre__images");
  const genre_section = document.querySelector(".genre__container");

  /**
   * Clear Previous Content
   */
  genre_container.innerHTML = "";

  if (!data.results || data.results.length === 0) {
    genre_section.style.display = "none";
    return;
  }

  // Show the genre section when movies are found
  genre_section.style.display = "block";
  genre_container.classList.add("has-movies");

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
        <button class="view-more">🔎 View More</button>
        <button class="save">💾 Save</button>
      </div>
    `;
    genre_container.appendChild(movieElement);
  });

  // Add event listeners for the new buttons
  const view_more_btns = genre_container.querySelectorAll(".view-more");
  view_more_btns.forEach((button, index) => {
    button.addEventListener("click", () => {
      const movie = data.results[index];
      window.location.href = `/movie/${movie.id}`;
    });
  });

  const save_buttons = genre_container.querySelectorAll(".save");
  save_buttons.forEach((button, index) => {
    // Check if user is logged in
    button.addEventListener("click", () => {
      const currentUser = localStorage.getItem("currentUser");

      if (!currentUser) {
        alert("Please sign in to save movies to your watchlist!");
        window.location.href = "/users/register";
        return;
      }

      const movie = data.results[index];

      // Get existing saved movies from localStorage
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

      // Check if movie is already saved
      const isAlreadySaved = savedMovies.some(
        (savedMovie) => savedMovie.id === movie.id,
      );

      if (isAlreadySaved) {
        alert("Movie is already in your watchlist!");
        return;
      }

      // Add movie to savedMovies array
      savedMovies.push(movie);

      // Save to localStorage
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

      // Create a new movie element for the watchlist
      const saved_movies = document.getElementById("watchlist");
      const savedMovieElement = document.createElement("div");
      savedMovieElement.classList.add("movie-card");
      savedMovieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-content"> 
          <div class="rating"> 
            <span class="star">★</span> ${movie.vote_average}
          </div>
        </div>
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <div class="btn-grp">
          <button class="view-more">🔎 View More</button>
          <button class="remove">🗑️ Remove</button>
        </div>
      `;

      saved_movies.appendChild(savedMovieElement);

      // Show watchlist section when movie is added
      const watchlist_section = document.querySelector(
        ".saved-movies__container",
      );
      watchlist_section.style.display = "block";

      // Add event listeners for watchlist buttons
      const newViewMoreBtn = savedMovieElement.querySelector(".view-more");
      newViewMoreBtn.addEventListener("click", () => {
        const language = getCurrentLanguage();
        if (language === "es-ES") {
          window.location.href = `/region/es/movie/${movie.id}`;
        } else {
          window.location.href = `/movie/${movie.id}`;
        }
      });

      const removeBtn = savedMovieElement.querySelector(".remove");
      removeBtn.addEventListener("click", () => {
        let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
        savedMovies = savedMovies.filter(
          (savedMovie) => savedMovie.id !== movie.id,
        );
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

        savedMovieElement.remove();

        // Hide watchlist section if no movies left
        const watchlist_section = document.querySelector(
          ".saved-movies__container",
        );
        if (saved_movies.children.length === 0) {
          watchlist_section.style.display = "none";
        }

        console.log("Movie removed from watchlist");
      });
    });
  });
}

function loadSavedMovies() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
  if (savedMovies.length === 0) return;

  const saved_movies = document.getElementById("watchlist");
  const watchlist_section = document.querySelector(".saved-movies__container");

  // Clear existing content
  saved_movies.innerHTML = "";

  // Show watchlist section
  watchlist_section.style.display = "block";

  savedMovies.forEach((movie) => {
    const savedMovieElement = document.createElement("div");
    savedMovieElement.classList.add("movie-card");
    savedMovieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-content"> 
        <div class="rating"> 
          <span class="star">★</span> ${movie.vote_average}
        </div>
      </div>
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date}</p>
      <div class="btn-grp">
        <button class="view-more">🔎 View More</button>
        <button class="remove">🗑️ Remove</button>
      </div>
    `;

    saved_movies.appendChild(savedMovieElement);

    // Add event listeners for the buttons
    const newViewMoreBtn = savedMovieElement.querySelector(".view-more");
    newViewMoreBtn.addEventListener("click", () => {
      const language = getCurrentLanguage();
      if (language === "es-ES") {
        window.location.href = `/region/es/movie/${movie.id}`;
      } else {
        window.location.href = `/movie/${movie.id}`;
      }
    });

    const removeBtn = savedMovieElement.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
      savedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.id !== movie.id,
      );
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

      savedMovieElement.remove();

      // Hide watchlist section if no movies left
      if (saved_movies.children.length === 0) {
        watchlist_section.style.display = "none";
      }

      console.log("Movie removed from watchlist");
    });
  });
}

function displayMovies(data) {
  /**
   * @description ID that holds latest movies
   * @type {HTMLDivElement}
   */
  const now_playing = document.getElementById("lastest-movies");

  /**
   * @description ID that holds upcoming movies
   * @type {HTMLDivElement}
   */
  const coming_soon = document.getElementById("unreleased-movies");

  /**
   * @description ID that holds saved movies
   * @type {HTMLDivElement}
   */
  const saved_movies = document.getElementById("watchlist");
  const watchlist_section = document.querySelector(".saved-movies__container");

  /**
   * Clear Previous Content
   */
  now_playing.innerHTML = "";
  saved_movies.innerHTML = "";

  // Hide watchlist section initially
  watchlist_section.style.display = "none";

  // Load saved movies if user is logged in
  loadSavedMovies();

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
        <button class="view-more">🔎 View More</button>
        <button class="save">💾 Save</button>
      </div>
    `;
    now_playing.appendChild(movieElement);
    console.log("displaying movies...");
  });

  const view_more_btn = document.querySelectorAll(".view-more");
  view_more_btn.forEach((button, index) => {
    button.addEventListener("click", () => {
      const movie = data.results[index];
      window.location.href = `/movie/${movie.id}`;
    });
  });

  const save_button = document.querySelectorAll(".save");
  save_button.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Check if user is logged in
      const currentUser = localStorage.getItem("currentUser");

      if (!currentUser) {
        alert("Please sign in to save movies to your watchlist!");
        window.location.href = "/users/register";
        return;
      }

      const movie = data.results[index];

      // Get existing saved movies from localStorage
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

      // Check if movie is already saved
      const isAlreadySaved = savedMovies.some(
        (savedMovie) => savedMovie.id === movie.id,
      );

      if (isAlreadySaved) {
        alert("Movie is already in your watchlist!");
        return;
      } else {
        console.log("Movie saved to watchlist");
      }

      // Add movie to savedMovies array
      savedMovies.push(movie);

      // Save to localStorage
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

      // Create a new movie element for the watchlist
      const savedMovieElement = document.createElement("div");
      savedMovieElement.classList.add("movie-card");
      savedMovieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-content"> 
          <div class="rating"> 
            <span class="star">★</span> ${movie.vote_average}
          </div>
        </div>
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <div class="btn-grp">
          <button class="view-more">🔎 View More</button>
          <button class="remove">🗑️ Remove</button>
        </div>
      `;

      saved_movies.appendChild(savedMovieElement);

      // Show watchlist section when movie is added
      const watchlist_section = document.querySelector(
        ".saved-movies__container",
      );
      watchlist_section.style.display = "block";

      // Add event listener for the new view more button
      const newViewMoreBtn = savedMovieElement.querySelector(".view-more");
      newViewMoreBtn.addEventListener("click", () => {
        const language = getCurrentLanguage();
        if (language === "es-ES") {
          window.location.href = `/region/es/movie/${movie.id}`;
        } else {
          window.location.href = `/movie/${movie.id}`;
        }
      });

      // Add event listener for the remove button
      const removeBtn = savedMovieElement.querySelector(".remove");
      removeBtn.addEventListener("click", () => {
        // Remove from localStorage
        let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
        savedMovies = savedMovies.filter(
          (savedMovie) => savedMovie.id !== movie.id,
        );
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

        savedMovieElement.remove();

        // Hide watchlist section if no movies left
        const watchlist_section = document.querySelector(
          ".saved-movies__container",
        );
        if (saved_movies.children.length === 0) {
          watchlist_section.style.display = "none";
        }

        console.log("Movie removed from watchlist");
      });
    });
  });
}
