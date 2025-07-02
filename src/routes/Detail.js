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