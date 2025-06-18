/**
 * @description This is the API key for the TMDB API.
 * @type {string}
 */
const apikey = process.env.APIKEY; 

/**
 * @description This is the base URL for the TMDB API.
 * @type {string[]}
 */
const baseUrl = [
  "https://api.themoviedb.org/3/movie/now_playing",
  "https://api.themoviedb.org/3/account/22066702/watchlist",
];

export { apikey, baseUrl };
