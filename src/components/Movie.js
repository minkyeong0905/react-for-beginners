import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, genres, summary }) {
    return <div>
        <img src={coverImg} alt={title} />
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <ul>
          {genres.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}…` : summary}</p>
      </div>;
}

Movie.propTypes = {
    id: PropTypes.number.isRequired
   ,coverImg: PropTypes.string.isRequired
   ,title: PropTypes.string.isRequired
   ,genres: PropTypes.arrayOf(PropTypes.string).isRequired
   ,summary: PropTypes.string.isRequired
};

export default Movie;