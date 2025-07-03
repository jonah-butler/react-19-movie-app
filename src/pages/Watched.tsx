import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/Favorites.css';

function Favorites() {
  const navigate = useNavigate();
  const { watched } = useMovieContext();

  const navigateToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  if (watched.length) {
    return (
      <div className="favorites-wrapper">
        <h2 className="favorites">Watched</h2>
        <div className="movies-grid">
          {watched.map((movie) => (
            <MovieCard
              onClick={() => navigateToMovie(movie.id)}
              movie={movie}
              key={movie.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No watched movies yet</h2>
      <p>Start adding movies to your watch list and they will appear here</p>
    </div>
  );
}

export default Favorites;
