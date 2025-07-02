import type { MouseEvent } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/FavoriteButton.css';
import { type Movie } from '../services/movies.types';

interface FavoriteButtonProps {
  movie: Movie;
}

function WatchButton({ movie }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <button className="favorite-btn" onClick={onFavoriteClick}>
      {favorite ? '❤️' : '🤍'}
    </button>
  );
}

export default WatchButton;
