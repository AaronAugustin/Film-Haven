import { fetchMoviesByGenre } from "../api/api_services.js";

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Get the genre input and submit button elements
   */
  const genre_input = document.querySelector("input[name='genre-list']");
  const submit_button = document.getElementById("select");

  /**
   * Add event listener to the submit button
   */
  submit_button.onclick = function (e) {
    e.preventDefault();

    let genre = genre_input.value;

    if (!genre) {
      alert("Please select a genre from the list.");
      return;
    }

    // Handle Clear option
    if (genre === "Clear") {
      const genre_container = document.querySelector(".genre__images");

      genre_container.innerHTML = "";
      genre_container.classList.remove("has-movies");
      genre_input.value = "";
      console.log("Genre selection cleared");
      return;
    }

    console.log(`Selected genre: ${genre}`);

    /**
     * Map genre names to their corresponding IDs (supports both English and Spanish)
     */
    const genre_map = {
      // English genres
      Action: 28,
      Adventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      Romance: 10749,
      "Science Fiction": 878,
      "TV Movie": 10770,
      Thriller: 53,
      War: 10752,
      Western: 37,
      // Spanish genres
      Acción: 28,
      Aventura: 12,
      Animación: 16,
      Comedia: 35,
      Crimen: 80,
      Documental: 99,
      Drama: 18,
      Familia: 10751,
      Fantasía: 14,
      Historia: 36,
      Terror: 27,
      Música: 10402,
      Misterio: 9648,
      Romance: 10749,
      "Ciencia ficción": 878,
      "Película de TV": 10770,
      Suspense: 53,
      Bélica: 10752,
      Western: 37,
    };

    const genreId = genre_map[genre];

    if (!genreId) {
      alert("Please select a valid genre from the list.");
      return;
    }

    fetchMoviesByGenre(genreId);
  };
});
