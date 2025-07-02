import { createContext, useContext } from 'react';
import { type Movie } from '../services/movies.types';

interface MovieContextDef {
  favorites: Movie[];
  watchList: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  addToWatchList: (movie: Movie) => void;
  removeFromWatchList: (movieId: number) => void;
  isWatched: (movieId: number) => boolean;
}

export const MovieContext = createContext<MovieContextDef | null>(null);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a provider');
  }

  return context;
};
