document.addEventListener('DOMContentLoaded', function() {
    /**
     * Initialize the TMDb client with your API key. This is necessary to make API requests.
     * Replace 'YOUR_API_KEY' with your actual API key.
     */
    const api_data = {
        apiKey: 'YOUR_API_KEY',
    };

    /**
    * Update the genre list dynamically using the fetched genres.
    */
    let genre_list = document.querySelector('datalist');

    /**
    *  Fetch movie genres and update the genre list dynamically.
    */
    let genre_input = document.querySelector("input[name='genre-list']");

    /**
    *  Add event listener to the genre input field.
    */
    let submit_button = document.querySelector('#submit_button');

    /**
     * Fetch movie genres and update the genre list dynamically.
     * - Use AJAX to fetch data from the API endpoint.
     * - Display the fetched genres in the genre list.
     */
    submit_button.onclick = function(e) {
        e.preventDefault();

        let genre = genre_input.value;

        if (!genre) {
            alert('Please enter a movie genre.');
            return;
        } else {
            console.log(`Selected genre: ${genre}`);
        }

        const genre_map = {
            "Action": 28,
            "Adventure": 12,
            "Animation": 16,
            "Comedy": 35,
            "Crime": 80,
            "Documentary": 99,
            "Drama": 18,
            "Family": 10751,
            "Fantasy": 14,
            "History": 36,
            "Horror": 27,
            "Music": 10402,
            "Mystery": 9648,
            "Romance": 10749,
            "Science Fiction": 878,
            "TV Movie": 10770,
            "Thriller": 53,
            "War": 10752,
            "Western": 37
        };

        genre = genre_map[genre] || genre;

        /**
         * Use AJAX to fetch data from the API endpoint.
         * - Display fetched movies based on the selected genre.
         */
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState === 4 && this.status === 200) 
            {
                let movieData = JSON.parse(xhttp.responseText);
                let movies = movieData.results;

                /**
                 * TODO:
                 * - Fix issue where you have to refresh the site to get different movies
                 * - Fix Carousel effect for displaying movie recommendations
                 * - Implement pagination for displaying a limited number of movies per page
                 */

                // Create a container to hold the movie recommendations
                let carouselWrapper = document.createElement('div');
                carouselWrapper.id = 'carousel-container';

                let header = document.createElement('h1');
                header.textContent = 'Your Recommendations';
                header.style.textAlign = 'center';
                carouselWrapper.appendChild(header);

                let movieContainer = document.createElement('div');
                movieContainer.id = 'movie-recommendations';

                let oldContainer = document.querySelector('#movie-recommendations');
                if (oldContainer) {
                    oldContainer.remove(); // Remove old movie list before adding new one
                }

                movies.forEach(movie => {
                  let movieCard = document.createElement('div');
                  movieCard.classList.add('movie-card');
                  movieCard.innerHTML = `
                    <h2>${movie.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">`;
                  movies_container.appendChild(movieCard);
                });

                // Add the movie container to the carousel wrapper
                carouselWrapper.appendChild(movieContainer);

                // Append the carousel wrapper to the document body
                document.body.appendChild(carouselWrapper);
            }
        };

        xhttp.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${api_data.apiKey}&with_genres=${genre}`, true);
        xhttp.send();
    };
});