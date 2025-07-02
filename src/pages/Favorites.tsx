import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/Favorites.css';

function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useMovieContext();

  const navigateToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  if (favorites.length) {
    return (
      <div className="favorites-wrapper">
        <h2 className="favorites">Your Favorites</h2>
        <div className="movies-grid-container">
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard
                onClick={() => navigateToMovie(movie.id)}
                movie={movie}
                key={movie.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No favorite movies yet</h2>
      <p>Start adding movies to your favorites and they will appear here</p>
    </div>
  );
}

export default Favorites;
