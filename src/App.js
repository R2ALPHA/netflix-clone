import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';
import { useState } from 'react';
import movieTrailer from 'movie-trailer';

const MOVIES_ROW = [
  {
    title: "NETFLIX ORIGINALS",
    fetchUrl: requests.fetchNetflixOriginals,
    isLargeRow: true,
    key: 1
  },
  {
    title: "Trending Now",
    fetchUrl: requests.fetchTrending,
    isLargeRow: false,
    key: 2
  },
  {
    title: "Top Rated",
    fetchUrl: requests.fetchTopRated,
    isLargeRow: false,
    key: 3
  },
  {
    title: "Action Movies",
    fetchUrl: requests.fetchActionMovies,
    isLargeRow: false,
    key: 4
  },
  {
    title: "Comedy Movies",
    fetchUrl: requests.fetchComedyMovies,
    isLargeRow: false,
    key: 5
  },
  {
    title: "Horror Movies",
    fetchUrl: requests.fetchHorrorMovies,
    isLargeRow: false,
    key: 6
  },
  {
    title: "Romance Movies",
    fetchUrl: requests.fetchRomanceMovies,
    isLargeRow: false,
    key: 7
  },
  {
    title: "Documentaries",
    fetchUrl: requests.fetchDocumantaries,
    isLargeRow: false,
    key: 8
  }
];

function App() {

  const [trailerUrl, setTrailerUrl] = useState('');
  const [currentRow, setCurrentRow] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const trailerUrlHandler = (movie, key) => {

    if (movie.id === selectedMovieId) {
      setTrailerUrl('');
      setCurrentRow(key);
      setSelectedMovieId(movie.id);
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
          setCurrentRow(key);
          setSelectedMovieId(movie.id);
        }).catch(error => console.log(error));
    }
  }

  return (
    <div className='app'>
      <Nav />
      <Banner />
      {
        MOVIES_ROW.map(row =>
          <Row
            key={row.key}
            id={row.key}
            title={row.title}
            fetchUrl={row.fetchUrl}
            trailerUrl={trailerUrl}
            handleTrailer={trailerUrlHandler}
            isLargeRow={row.isLargeRow}
            currentRow={currentRow}
          />)
      }
    </div>
  );
}

export default App;

