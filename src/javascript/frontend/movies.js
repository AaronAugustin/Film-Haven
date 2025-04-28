document.addEventListener('DOMContentLoaded', function() {
    /**
     * Initialize the TMDb client with your API key. This is necessary to make API requests.
     * Replace 'YOUR_API_KEY' with your actual API key.
     */
    let api_key = '';

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
                let movie_data = JSON.parse(xhttp.responseText);
                let movies = movie_data.results;

                if (!movies || movies.length === 0) {
                    alert('No movies found for the selected genre.');
                    return;
                }

                /**
                 * Create a container to hold movie recommendations
                 * - ~~Append the movie cards to the container~~
                 * - ~~Display the fetched movies in the HTML page~~
                 * - ~~Implement a carousel effect for displaying movie recommendations~~
                 * - ~~Implement pagination for displaying a limited number of movies per page~~
                 */

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
                movie_container.id ='movie-recommendations';

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

                // Log the fetched movies for debugging purposes
                console.log('Movies:', movies);
            }
        };

        // If you're logged in, fetch movie recommendations
        if (localStorage.getItem('currentUser')) {
            xhttp.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre}`, true);
            xhttp.send();
        } else {
            alert('Please log in to access movie recommendations.');
        }
    };
});