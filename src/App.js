import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

const [movies, setMovies] = useState([])
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null)


const fetchMoviesHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null)
  try {
  const response = await fetch('https://swapi.dev/api/films/')
  const data = await response.json();

    if (!response.ok) {
      throw new Error('Custom error message')
    }
    const transformedMovies = data.results.map(item => {
      return {
        id: item.episode_id,
        title: item.title,
        openingText: item.opening_crawl,
        releaseDate: item.release_date
      }
    })
    setMovies(transformedMovies);
  } catch(error) {
    setError(error.message);
  }
  setIsLoading(false);

}, []);

useEffect(() => {
  fetchMoviesHandler();
},[fetchMoviesHandler])

let content = <p>No movies found</p>

if( movies.length > 0) {
  content = <MoviesList movies={movies}/>
}

if(error) {
  content = <p>{error}</p>
}
if (isLoading) {
  content = <p>Loading....</p>
}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
