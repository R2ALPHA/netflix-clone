import React, { useState, useEffect, Fragment } from 'react'
import axios from './axios';
import requests from './requests';
import "./Banner.css";
import YouTube from 'react-youtube';

const base_url = "https://image.tmdb.org/t/p/original";

const opts = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1
    },
};

function Banner({ id, handleTrailer, trailerUrl, currentRow }) {

    const [movie, setMovie] = useState(null);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        }

        fetchData();
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <Fragment>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${base_url}/${movie?.backdrop_path})`,
                    backgroundPosition: "center center"
                }}
            >
                <div className="banner__contents">
                    <h1 className='banner__title'>
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <div className="banner__buttons">
                        {currentRow !== id && <button className="banner__button" onClick={() => handleTrailer(movie, id)}>Play</button>}
                        {trailerUrl && currentRow === id && <button className="banner__button" onClick={() => handleTrailer(movie, -1)}>Stop</button>}
                        <button className="banner__button">My List</button>
                    </div>

                    <h1 className="banner__description">
                        {truncate(movie?.overview, 500)}
                    </h1>
                </div>

                <div className="banner--fadeBottom" />
            </header>
            {trailerUrl && currentRow === id && <YouTube videoId={trailerUrl} opts={opts} />}
        </Fragment>
    )
}

export default Banner;