import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';
import { useState } from 'react';
import movieTrailer from 'movie-trailer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

    if (key === -1 || movie.id === selectedMovieId) {
      setTrailerUrl('');
      setCurrentRow(key);
      setSelectedMovieId(key);
    } else {

      const movieTitle = movie?.title || movie?.name || movie?.original_name || "";
      movieTrailer(movieTitle)
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
          setCurrentRow(key);
          setSelectedMovieId(movie.id);
        }).catch(error => {
          MySwal.fire({
            icon: 'error',
            title: 'Please try different movie',
            text: `No trailer found for the movie ${movieTitle}`,
            footer: '<a href="https://www.themoviedb.org/">Why do I have this issue?</a>'
          })
        });
    }
  }

  return (
    <div className='app'>
      <Nav />
      <Banner
        id={0}
        trailerUrl={trailerUrl}
        handleTrailer={trailerUrlHandler}
        currentRow={currentRow}
      />
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

