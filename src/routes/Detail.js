import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [genres, setGenres] = useState([]);
    const { id }= useParams();

    const getMovie = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        
        setDetail(json.data.movie);
        setGenres(json.data.movie.genres);
        setLoading(false);
    };

    useEffect(() => {getMovie();}, []);

    return <div>
        {
            loading ? <h1>Loading...</h1> :
            <div>
                <h1>{detail.title_long}</h1>
                <img src={detail.medium_cover_image} alt={detail.title} />
                <h3>{`Language : ${detail.language}`}</h3>
                <h3>{`Rating : ${detail.rating}`}</h3>
                <h3>{`Runtime : ${detail.runtime} min`}</h3>
                <h3>Genres</h3>
                <ul>
                    {
                        genres.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
                <h3>{`Likes : ${detail.like_count}`}</h3>
            </div>
        }
    </div>;
}

export default Detail;