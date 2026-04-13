import axios from 'axios';
import config from '../../../config.json';

/**
 * Initialize API from TMDB
 * For more info: https://developers.themoviedb.org/
 */
export const API_KEY = config.API_KEY;

/**
 * Get API URLS from TMDB.
 * For more info: https://developers.themoviedb.org/ (watchlists)
 * For more info: https://developers.themoviedb.org/ (now playing)
 */
export const API_URL = await Promise.all([
     axios.get(`https://api.themoviedb.org/3/account/22066702/watchlist`),
     axios.get(`https://api.themoviedb.org/3/movie/now_playing`),
]);
