import React, { useState } from "react";

import MoviesList from "./components/MovieList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoading ,setIsLoading]=useState(false)
  async function fetchMoviesHandler() {
    setIsLoading(true)
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
     
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {!isLoading && Movies.length>0 && <MoviesList movies={Movies} />}
      {!isLoading && Movies.length===0 &&<p>no movies found</p>}
      {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
