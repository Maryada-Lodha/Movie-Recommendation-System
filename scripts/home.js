const showRecBtn = document.getElementById('showRecBtn');
const movieGrid = document.getElementById('movie-grid');

showRecBtn.addEventListener('click', () => {
  const selectedMovie = document.getElementById('movies').value;

  // Send request to FastAPI backend
  fetch(`http://127.0.0.1:8000/api/recommend_movie/?movie_name=${encodeURIComponent(selectedMovie)}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      return response.json();
    })
    .then(data => {
      // Clear the previous movie recommendations
      movieGrid.innerHTML = '';

      // Loop through the recommended movies in the response
      for (const movie in data) {
        const movieDetails = data[movie];
        
        // Create a new movie card for each recommendation
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Create the inner content for the movie card
        const moviePoster = movieDetails.poster_path ? movieDetails.poster_path : './assets/spiderman.jpeg';
        movieCard.innerHTML = `
          <img src="${moviePoster}" alt="${movieDetails.title}">
          <h3>${movieDetails.title}</h3>
          <p>${movieDetails.tagline}</p>
        `;

        // Append the movie card to the movie grid
        movieGrid.appendChild(movieCard);
      }
    })
    .catch(error => {
      console.error('Error fetching recommendations:', error);
    });
});
