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
 
  
 const fetchMoviesHandler = useCallback(async()=> {
  setIsLoading(true)
  setError(null)
  try{ const response = await fetch("https://reactmovies-88d8d-default-rtdb.firebaseio.com/movies.json");
  if(!response.ok){
    throw new Error('something went wrong!')
  }
  const data = await response.json();
  const loadedMovies=[]
  for(const key in data){
    loadedMovies.push({
      id:key,
      title:data[key].title,
      openingText:data[key].openingText,
      releaseDate:data[key].releaseDate,
    })
  }
   

  setMovies(loadedMovies);
  
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

  const onDeleteHandler=()=>{
    fetchMoviesHandler()
  }

  async function AddMovieHandler(movie){
   const response= await fetch('https://reactmovies-88d8d-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json',
    }
    
   })
   const data= await response.json()
   console.log(data)
  }
 

  let content= <p>Found No Movies</p>
  if(movies.length>0){
   content= <MoviesList movies={movies} onDelete={onDeleteHandler} />
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
        <AddMovie onAddMovie={onDeleteHandler}/>
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
