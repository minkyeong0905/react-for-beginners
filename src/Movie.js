import PropTypes from "prop-types";

function Movie({coverImg, title, genres, summary}) {
    return <div>
        <img src={coverImg} alt={title} />
        <h2>{title}</h2>
        <ul>
          {genres.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p>{summary}</p>
      </div>;
}

Movie.propTypes = {
    coverImg: PropTypes.string.isRequired
   ,title: PropTypes.string.isRequired
   ,genres: PropTypes.arrayOf(PropTypes.string).isRequired
   ,summary: PropTypes.string.isRequired
};

export default Movie;