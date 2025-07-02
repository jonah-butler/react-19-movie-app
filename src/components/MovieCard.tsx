import type { MouseEvent } from 'react';
import '../css/MovieCard.css';
import { type Movie } from '../services/movies.types';
import { buildImagePath } from '../utilities/movies';
import FavoriteButton from './FavoriteButton';
import WatchedButton from './WatchedButton';

interface MovieCardProps {
  movie: Movie;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  function parseMovieDate(): number {
    return new Date(movie.release_date).getFullYear();
  }

  return (
    <div onClick={onClick} className="movie-card">
      <div className="movie-poster">
        {/* Movie Poster */}
        {movie.poster_path ? (
          <img src={buildImagePath(movie.poster_path)} alt={movie.title} />
        ) : (
          <div>
            No Movie Poster Found
            <div>☹️</div>
          </div>
        )}

        <div className="movie-overlay">
          {/* Favorite */}
          <div className="favorite-button-container">
            <FavoriteButton movie={movie} />
          </div>

          {/* Watched */}
          <div className="watched-button-container">
            <WatchedButton movie={movie} />
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? parseMovieDate() : 'No release date'}</p>
      </div>
    </div>
  );
}

export default MovieCard;
