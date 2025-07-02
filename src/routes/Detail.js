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
                        <div style={{marginBottom: "15px"}}>
                            <span style={{fontWeight: "bold", fontSize: "19px", marginRight: "10px"}}>{`Rating : ${detail.rating}`}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" />
                            </svg>
                        </div>
                        <div>
                            <span style={{fontWeight: "bold", fontSize: "19px", marginRight: "10px"}}>{`Runtime : ${detail.runtime}`}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
                                    <path d="M12 7v5l3 3" />
                                </g>
                            </svg>
                        </div>
                        <h3>Genres</h3>
                        <ul className={styles.movie__genres}>
                            {
                                genres.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                        </ul>
                        <div style={{marginTop: "15px"}}>
                            <span style={{fontWeight: "bold", fontSize: "19px", marginRight: "10px"}}>{`Likes : ${detail.like_count}`}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z" />
                            </svg>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;