import axios from './axios';
import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';

import "./Row.css";

const opts = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1
    },
};

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ id, title, fetchUrl, isLargeRow, handleTrailer, trailerUrl, currentRow }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img key={movie.id} onClick={() => handleTrailer(movie, id)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {currentRow === id && trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div >
    )
}

export default Row