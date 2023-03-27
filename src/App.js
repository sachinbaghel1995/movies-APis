import React, { useState,useEffect,useCallback } from "react";

import MoviesList from "./components/MovieList";
import "./App.css";
import AddMovie from "./components/AddMovie";
// let timeOut;
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading ,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  // const [isRetrying,setIsRetrying]=useState(false)
  const AddMovieHandler=(movie)=>{
console.log(movie)
  }
  
 const fetchMoviesHandler = useCallback(async()=> {
  setIsLoading(true)
  setError(null)
  try{ const response = await fetch("https://swapi.dev/api/films");
  if(!response.ok){
    throw new Error('something went wrong!')
  }
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
  
}
catch(error){
setError(error.message)
// setIsRetrying(true)
// timeOut=setTimeout(()=>{
//   fetchMoviesHandler()
// },5000)
}
setIsLoading(false)
  },[])

  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  let content= <p>Found No Movies</p>
  if(movies.length>0){
   content= <MoviesList movies={movies} />
      }
  if(isLoading){
    content= <p>Loading...</p>
  }
  if(error){
    content= <p>{error}</p>
  }
  // const retryingHandler=()=>{
  //   clearTimeout(timeOut)
  //   setIsRetrying(false)
  //   setError(null)
  // }
 

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler}/>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {/* {isRetrying && <button onClick={retryingHandler}>Stop Retrying</button>} */}
      </section>
      <section>
      {content}
      </section>
    </React.Fragment>
  );
}

export default App;
