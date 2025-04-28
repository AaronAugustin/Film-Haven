const {TmdbClient} = require('./node_modules/tmdb-js-wrapper/src/tmdb-js/tmdb-js');

export async function doStuff(authentication) {
    /**
    * Replace 'YOUR_EMAIL' and 'YOUR_USERNAME' with your actual email address and username.
    */
    let email = authentication.username + '@example.com';  // Replace with your actual email address.
    let username = authentication.username;
    let password = authentication.password;
 
    /**
    *  Create a new instance of the TMBD client.
    */
    let client = new TmdbClient(api_key);
 
     try {
        // Fetch the current user's account details.
        let account = await client.account.accountDetails({username: username, password: password});
        console.log(account);
    } catch (error) {
        console.error('Error fetching account details:', error);
    }
 
    /**
    * Example usage of the TMDB API:
    * - Fetch the top-rated movies.
    * - Fetch movie details.
    * - Fetch the genres.
    */
    let topRatedMovies = await client.movie.popularMovies();
    let movieDetails = await client.movie.movieDetails({id: topRatedMovies.results[0].id});
    let genres = await client.genre.movieList();
    console.log('Top-rated movies:', topRatedMovies.results);
    console.log('Movie details:', movieDetails);
    console.log('Genres:', genres);
 
    /**
    * Example usage of the TMDb API:
    * - Session ID management.
    */
    let sessionId = await client.authentication.createSession({username: username, password: password});
    console.log('Session ID:', sessionId);
    await client.authentication.destroySession({id: sessionId});
    console.log('Session destroyed.');
 
    /**
    * Example usage of the TMBb API:
    * - api key validation.
    */
    let isValid = await client.authentication.validateApiKey(api_key);
    console.log('API key is valid:', isValid);
    client.authentication.setApiKey(api_key); // Reset the API key for subsequent requests.
    console.log('API key reset.');
     
    /**
     * Close client when done.
     */ 
    client.close(); 
};