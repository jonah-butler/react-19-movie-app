import { useEffect, useState } from 'react';
import { type Movie } from '../services/movies.types';
import { MovieContext } from './MovieContext';

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const storedWatchList = localStorage.getItem('watchedMovies');

    if (!storedFavorites) return;

    setFavorites(JSON.parse(storedFavorites));

    if (!storedWatchList) return;

    setWatched(JSON.parse(storedWatchList));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watched));
  }, [watched]);

  const addToWatchList = (movie: Movie): void => {
    setWatched((prev) => [...prev, movie]);
  };

  const removeFromWatchList = (movieId: number): void => {
    setWatched((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isWatched = (movieId: number): boolean => {
    return watched.some((movie) => movie.id === movieId);
  };

  const addToFavorites = (movie: Movie): void => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number): void => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToWatchList,
    removeFromWatchList,
    isWatched,
    watched,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
