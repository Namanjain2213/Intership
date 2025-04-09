import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dummyapi.online/api/movies";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response =>{
         console.log(response.data);
        setMovies(response.data)
        })
      .catch(error => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
