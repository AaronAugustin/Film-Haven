/**
 * @description Initialize the TMDb Client with the API key. This is needed to fetch movie data from TMDb themselves.
 * 
 * @see https://developers.themoviedb.org/3/getting-started/introduction
 * 
 * @type {string}
 */
const api_key = '180cf8155823e469febc419634ffd71d';

document.addEventListener('DOMContentLoaded', function(evt) {
    evt.preventDefault();

    /**
     * @description This is used to fetch movie data from TMDb API.
     * @type {XMLHttpRequest}
     */
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            /**
             * @description Fetch movie data and display it in the carosel.
             * @type {Object}
             */
            let movie_data = JSON.parse(this.responseText);

            /**
             * @description This is used to store the movie data.
             * @type {Array}
             */
            let movies = movie_data.results;
            if (!movies || movies.length === 0) {
                console.error('No movies found in the response.');
                return;
            }

            /**
             * @description This is used to store the HTML for the movie carousel.
             * @type {string}
             */
            let movie_conveyor_container = document.getElementById('movie-conveyor-container');
            if (!movie_conveyor_container) {
                movie_conveyor_container = document.createElement('div');
                movie_conveyor_container.classList.add('movie-conveyor-container');
                document.body.appendChild(movie_conveyor_container);
            }
            movie_conveyor_container.innerHTML = '';

            
        }
        else if (this.readyState == 4)
        {
            console.error('Error fetching movie data: ', this.status, this.statusText);
        }
    }
});