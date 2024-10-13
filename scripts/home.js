const showRecBtn = document.getElementById('showRecBtn');
const movieGrid = document.getElementById('movie-grid');

showRecBtn.addEventListener('click', () => {
  const selectedMovie = document.getElementById('movies').value;

  fetch('./assets/movies.json')
    .then(response => response.json())
    .then(data => {
      // Access the correct movie list based on the selected movie
      // Change this according to the backend
      const recommendations = data[selectedMovie] || [];

      movieGrid.innerHTML = '';

      recommendations.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
          <img src="./assets/${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;

        movieGrid.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error fetching recommendations:', error);
    });
});
