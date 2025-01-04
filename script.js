let apiKey= "180cf8155823e469febc419634ffd71d"
let genreList = document.querySelector("datalist")
let genreInput = document.querySelector("input[name='genre-list']") 
let submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener('click', function() {
  let genre = genreInput.value; 

  if (genre === "Action") {
    genre = 28;
  } 

  if (genre === "Adventure"){
    genre = 12;
  }

  if (genre === "Animation"){
    genre = 16;
  }

  if (genre === "Comedy"){
    genre = 35;
  }

  if (genre === "Crime"){
    genre = 80;
  }

  if (genre === "Documentary"){
    genre = 99;
  }

  if (genre === "Drama"){
    genre = 18;
  }

  if (genre === "Family"){
    genre = 10751;
  }

  if (genre === "Fantasy"){
    genre = 14;
  }

  if (genre === "History"){
    genre = 36;
  }
  if (genre === "Horror"){
    genre = 27;
  }

  if (genre === "Music"){
    genre = 10402;
  }

  if (genre === "Mystery"){
    genre = 9648;
  }

  if (genre === "Romance"){
    genre = 10749;
  }

  if (genre === "Science Fiction"){
    genre = 878;
  }

  if (genre === "TV Movie"){
    genre = 10770;
  }

  if (genre === "Thriller"){
    genre = 53;
  }

  if (genre === "War"){
    genre = 10752;
  }

  if (genre === "Western"){
    genre = 37;
  }
  
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let movieData = JSON.parse(xhttp.responseText);
      let movies = movieData.results; // Assuming the API response structure has a "results" array for movies
      // Create a container to hold the movie recommendations
      let movieContainer = document.createElement('div'); 
      movieContainer.id = 'movie-recommendations'; 
      movies.forEach(movie => {
        let movieCard = document.createElement('div'); // Create a card for each movie
        movieCard.classList.add('movie-card'); // Add a class for styling
        // Add movie title, poster, etc. to the movie card
        movieCard.innerHTML = `
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
        `;
        movieContainer.appendChild(movieCard); // Append the card to the container
      });
      document.body.appendChild(movieContainer); // Add the container to the page
    }
  };
  xhttp.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`, true);
  xhttp.send();
});
