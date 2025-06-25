import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    // const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
    // const json = await response.json();
    const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=10&sort_by=year")).json();
    
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {getMovies();}, []);
  
  return <div>
    {loading ? <h1>Loading...</h1> : <div>{movies.map((movie) => (
      <div key={movie.id}>
        <img src={movie.medium_cover_image} />
        <h2>{movie.title}</h2>
        <ul>
          {movie.genres.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p>{movie.summary}</p>
      </div>
    ))}</div>}
  </div>;
}

export default App;