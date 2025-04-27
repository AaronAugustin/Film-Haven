const {TmdbClient} = require('node_modules/tmdb-js-wrapper/src/tmdb-js/tmdb-js');

/**
 * This is a basic example of how to use the TMDb API in a Node.js application.
 */

doStuff = async function(authentication) {
    /**
    * The authentication object should contain the following properties:
    * apiKey: String,
    * username: String,
    * password: String,  // This should be hashed and stored securely.
    */
    let api_key = authentication.apiKey;
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
    
    client.close(); // Close the client when done.
};