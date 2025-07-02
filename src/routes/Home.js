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
          <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24">
            <g>
              <rect width="2" height="5" x="11" y="1" fill="currentColor" opacity="0.14" />
              <rect width="2" height="5" x="11" y="1" fill="currentColor" opacity="0.29" transform="rotate(30 12 12)" />
              <rect width="2" height="5" x="11" y="1" fill="currentColor" opacity="0.43" transform="rotate(60 12 12)" />
              <rect width="2" height="5" x="11" y="1" fill="currentColor" opacity="0.57" transform="rotate(90 12 12)" />
              <rect width="2" height="5" x="11" y="1" fill="currentColor" opacity="0.71" transform="rotate(120 12 12)" />
              <rect width="2" height="5" x="11" y="1" fill="currentColor" opacity="0.86" transform="rotate(150 12 12)" />
              <rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" />
              <animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" />
            </g>
          </svg>
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