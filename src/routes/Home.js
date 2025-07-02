import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const minimunRating = 10;

  const getMovies = async() => {
    // const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
    // const json = await response.json();
    const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${minimunRating}&sort_by=like_count`)).json();
    
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {getMovies();}, []);
  
  return (
    <div className={styles.container}>
      {
      loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) :
      <div>
        <div className={styles.header__title}>
          <h1>{`Movie List - Minimum Rating ${minimunRating}`}</h1>
        </div>

        <hr />

        <div className={styles.movies}>
          {
            movies.map((movie) => (
              <Movie key={movie.id} id={movie.id} coverImg={movie.medium_cover_image} title={movie.title} year={movie.year} genres={movie.genres} summary={movie.summary} />
            ))
          }
        </div>
      </div>
      }
    </div>
  );
}

export default Home;