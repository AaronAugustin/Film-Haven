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

            /**
             * @description The main container to store movies in the carousel.
             * @type {HTMLElement}
             */
            let movie_wrapper = document.createElement('div');
            movie_wrapper.id = 'movie-recommendations';

            /**
             * @description if the carousel container is not present, create it.
             * @type {HTMLElement}
             */
            let old_movie_wrapper = document.getElementById('movie-recommendations');
            if (old_movie_wrapper) {
                old_movie_wrapper.remove();
            }

            /**
             * @description The main container for the carousel.
             * @type {HTMLElement}
             */
            let carousel_wrapper = document.getElementById('carousel-container');
            if (!carousel_wrapper) {
                carousel_wrapper = document.createElement('div');
                carousel_wrapper.classList.add('carousel-wrapper');
                document.body.appendChild(carousel_wrapper);
            }
            carousel_wrapper.innerHTML = '';

            movies.array.forEach(movie => 
            {
                /**
                 * @description for every movie, create a movie card.
                 * @type {HTMLElement}
                 */
                let movie_card = document.createElement('div');

                movie_card.classList.add('movie-card');
                movie_card.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                `;
                movie_wrapper.appendChild(movie_card);
            });

            carousel_wrapper.appendChild(movie_wrapper);
            document.body.appendChild(carousel_wrapper);
        }
        else if (this.readyState == 4)
        {
            console.error('Error fetching movie data: ', this.status, this.statusText);
        }

        xhttp.open('GET', `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`, true);
        xhttp.send();
    }
});