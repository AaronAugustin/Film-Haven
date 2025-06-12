/**
 * Adding this peice of code here
 * This is subject to change, BUT since REPL doesnt support .env files im forced to make my APIKEY public
 *
 * @description This is the API key for the TMDB API.
 * @type {string}
 */
// const apikey = process.env.APIKEY;

/**
 * @description This is the API key for the TMDB API.
 * @type {string}
 */
const apikey = "87cff27fedee57a2828f33c71296fc6d";

/**
 * @description This is the base URL for the TMDB API.
 * @type {string}
 */
const baseUrl = "https://api.themoviedb.org/3/movie/now_playing";

export { apikey, baseUrl };
