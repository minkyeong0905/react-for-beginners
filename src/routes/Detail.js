import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});
    const [genres, setGenres] = useState([]);
    const { id }= useParams();

    const getMovie = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        
        setDetail(json.data.movie);
        setGenres(json.data.movie.genres);
        setLoading(false);
    };

    useEffect(() => {getMovie();}, [id]);
    console.log(detail);
    
    return (
        <div className={styles.container} style={{backgroundImage: detail ? `url(${detail.background_image})` : 'none'}}>
            {
                loading ? (
                    <div className={styles.loader}>
                    <span>Loading...</span>
                    </div>
                ) :
                <div className={styles.movie}>
                    <div className={styles.movie__header}>
                        <img className={styles.movie__img} src={detail.medium_cover_image} alt={detail.title} />
                        <h1 style={{fontStyle: "italic", textAlign: "center"}}>{detail.title_long}</h1>
                    </div>
                    <div className={styles.movie__body}>
                        <h3>{`Language : ${detail.language}`}</h3>
                        <h3>{`Rating : ${detail.rating}`}</h3>
                        <h3>{`Runtime : ${detail.runtime} min`}</h3>
                        <h3>Genres</h3>
                        <ul className={styles.movie__genres}>
                            {
                                genres.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                        </ul>
                        <h3>{`Likes : ${detail.like_count}`}</h3>
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;