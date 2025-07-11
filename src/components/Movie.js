import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, genres, summary }) {
    return (
      <div className={styles.movie}>
        <img className={styles.movie__img} src={coverImg} alt={title} />
        <div>
          <h2 className={styles.movie__title}>
            <Link to={`/movie/${id}`}>{title}</Link>
          </h2>
          <hr />
          <h3 className={styles.movie__year}>{year}</h3>
          <ul className={styles.movie__genres}>
            {genres.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <p className={styles.movie__summary}>{summary.length > 235 ? `${summary.slice(0, 235)}…` : summary}</p>
        </div>
      </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired
   ,coverImg: PropTypes.string.isRequired
   ,title: PropTypes.string.isRequired
   ,genres: PropTypes.arrayOf(PropTypes.string).isRequired
   ,summary: PropTypes.string.isRequired
};

export default Movie;