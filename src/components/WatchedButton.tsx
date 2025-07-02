import type { MouseEvent } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/WatchedButton.css';
import { type Movie } from '../services/movies.types';

interface WatchedButtonProps {
  movie: Movie;
}

function WatchButton({ movie }: WatchedButtonProps) {
  const { isWatched, addToWatchList, removeFromWatchList } = useMovieContext();

  const watched = isWatched(movie.id);

  const onWatchedClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (watched) {
      removeFromWatchList(movie.id);
    } else {
      addToWatchList(movie);
    }
  };

  return (
    <button
      className={`watched-btn ${watched ? 'active' : ''}`}
      onClick={onWatchedClick}
    >
      {watched ? '👁️' : '👀'}
    </button>
  );
}

export default WatchButton;
