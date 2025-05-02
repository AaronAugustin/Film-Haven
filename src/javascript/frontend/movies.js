/**
 * Initialize the TMDb client with your API key. This is necessary to make API requests.
 * 
 * API you see below is a placeholder and is used for testing purposes.
 * Replace it with your actual API key.
 */
const api_key = '180cf8155823e469febc419634ffd71d';

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Check if the user is logged in
     * 
     * They start off as not logged in, and only gain access to the website if they are logged in.
     */
    const is_logged_in = localStorage.getItem('currentUser');

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
        * Fetch movie data based on the selected genre and display it in a carousel.
        * - Make API request to the TMDb API to fetch movies based on the selected genre.
        */
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let movie_data = JSON.parse(xhttp.responseText);
                let movies = movie_data.results;

                if (!movies || movies.length === 0) {
                    alert('No movies found for the selected genre.');
                    return;
                }

                let pagination_container = document.createElement('div');
                if (!pagination_container) {
                    pagination_container = document.createElement('div');
                    pagination_container.classList.add('pagination-container');
                    document.body.appendChild(pagination_container);
                }
                let total_pages = Math.ceil(movies.length / 20);
                for (let i = 1; i <= total_pages; i++) {
                    let page_link = document.createElement('a');
                    page_link.textContent = i;
                    page_link.href = '#';
                    pagination_container.appendChild(page_link);
                    if (i === 1) {
                        page_link.classList.add('active');
                    }
                }

                let carousel_wrapper = document.querySelector('#carousel-container');
                if (!carousel_wrapper) {
                    carousel_wrapper = document.createElement('div');
                    carousel_wrapper.classList.add('carousel-wrapper');
                    document.body.appendChild(carousel_wrapper);
                }
                carousel_wrapper.innerHTML = ''; // Clear previous carousel content

                let header = document.createElement('h1');
                header.textContent = 'Your Recommendations';
                header.style.textAlign = 'center';
                carousel_wrapper.appendChild(header);
                header.innerHTML += `<div id="carousel-container"></div>`;

                let movie_container = document.createElement('div');
                movie_container.id = 'movie-recommendations';

                let old_container = document.querySelector('#movie-recommendations');
                if (old_container) {
                    old_container.remove();
                }

                movies.forEach(movie => {
                    let movie_card = document.createElement('div');
                    movie_card.classList.add('movie-card');
                    movie_card.innerHTML = `
                        <h2>${movie.title}</h2>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                    `;
                    movie_container.appendChild(movie_card);
                });

                // Add pagination links
                let pagination_links = pagination_container.querySelectorAll('a');
                pagination_links.forEach((link, index) => {
                    link.addEventListener('click', function() {
                        pagination_links.forEach(link => link.classList.remove('active'));
                        link.classList.add('active');
                        let startIndex = (index - 1) * 20;
                        let endIndex = startIndex + 20;
                        movie_container.innerHTML = '';
                        movies.slice(startIndex, endIndex).forEach(movie => {
                            let movie_card = document.createElement('div');
                            movie_card.classList.add('movie-card');
                            movie_card.innerHTML = `
                                <h2>${movie.title}</h2>
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                            `;
                            movie_container.appendChild(movie_card);
                        });
                    });
                });

                // Add the movie container to the pagination container
                pagination_container.appendChild(movie_container);

                // Add the movie container to the carousel wrapper
                carousel_wrapper.appendChild(movie_container);

                // Append the carousel wrapper to the document body
                document.body.appendChild(carousel_wrapper);

                /**
                 * Log all the movie data bullshit in the console.
                 * - Movie title
                 * - Movie poster
                 * - Movie overview
                 * - Movie release date
                 * - Movie genre
                 */
                console.log('Movies : ', movies);
                console.log('Other Movie Data Bulls***: ', movie_data);
            }
        };

        /**
         * I deeply apologize for all these if conditons, but here me out.
         *
         * - If Logged in, make a `console.log()` msg to fetch movie data based on the selected genre. (to know if its working lmao)
         * Otherwise, display an alert message and stop further execution.
         * 
         * - If the API key is not provided, display an alert message and stop further execution. (to both inform the user, and to prevent the API from breaking)
         * Otherwise, display the API key in the console.
         *
         * - If the user is not logged in, display an alert message and stop further execution.
         * Otherwise, display the user's username in the console.
         *
         * - If the selected genre is not valid, display an alert message and stop further execution.
         * Otherwise, display the selected genre in the console.
         *
         */
        if (is_logged_in) {
            console.log(`Fetching movie data based on the selected genre: ${genre}`);

            xhttp.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre}`, true);
            xhttp.send();

            if (!api_key) {
                alert('Looks like you haven\'t set up your API token yet.\nPlease visit https://developers.themoviedb.org/3/getting-started\nto get your API key, and try again.');
                console.error('API key is not provided.')
                return;
            } else {
                console.log(`API key provided: ${api_key}`);
            }

            console.log(`User is logged in: ${is_logged_in}`);
            is_logged_in = true;
            return;
        } else {
            alert('Please log in to view movie recommendations.');
            console.error('User is not logged in.');
            is_logged_in = false;
            return;
        }
    };
});