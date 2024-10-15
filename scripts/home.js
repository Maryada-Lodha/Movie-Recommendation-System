// Define the URL of the CSV file containing movie titles
const csvUrl = './movies.csv';

const showRecBtn = document.getElementById('showRecBtn');
const movieGrid = document.getElementById('movie-grid');
const movieSearchInput = document.getElementById('movie-search');
const movieSuggestionsList = document.getElementById('movie-suggestions');
let movieTitles = [];

// Function to fetch and populate movie titles
function populateMovies() {
  console.log('Fetching CSV data...');

  Papa.parse(csvUrl, {
    download: true,
    header: true,  // Treat the first row as headers
    complete: function(results) {
      const movies = results.data;
      movieTitles = movies.map(movie => movie.title).filter(title => title); // Ensure valid titles
    },
    error: function(error) {
      console.error('Error loading or parsing CSV:', error);
    }
  });
}

// Call the function to fetch movie titles on page load
populateMovies();

// Function to filter movies based on search input
function filterMovies(query) {
  const lowerCaseQuery = query.toLowerCase();
  return movieTitles.filter(title => title.toLowerCase().includes(lowerCaseQuery));
}

// Event listener for search input
movieSearchInput.addEventListener('input', () => {
  const searchValue = movieSearchInput.value;
  const matchedMovies = filterMovies(searchValue);

  // Clear previous suggestions
  movieSuggestionsList.innerHTML = '';

  // Display matched movie titles in suggestions list
  matchedMovies.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.textContent = movie;
    listItem.addEventListener('click', () => {
      movieSearchInput.value = movie; // Set the clicked movie as input value
      movieSuggestionsList.innerHTML = ''; // Clear suggestions after selection
    });
    movieSuggestionsList.appendChild(listItem);
  });

  // If no matches, show a message
  if (matchedMovies.length === 0 && searchValue) {
    const noResultItem = document.createElement('li');
    noResultItem.textContent = 'No matching movies found';
    movieSuggestionsList.appendChild(noResultItem);
  }
});

// Event listener for the recommendation button
showRecBtn.addEventListener('click', () => {
  const selectedMovie = movieSearchInput.value;

  if (!selectedMovie) {
    alert('Please select or type a movie.');
    return;
  }

  // Send request to FastAPI backend
  fetch(`http://13.127.54.199/api/recommend_movie/?movie_name=${encodeURIComponent(selectedMovie)}`, {
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
      // Clear previous movie recommendations
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
