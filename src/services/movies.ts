import { API_KEY, BASE_URL } from './api';
import { MOVIE_SERVICE_ERRORS, MovieServiceError } from './movies.error';
import { type Movie, type MovieResponse } from './movies.types';

export const getMovies = async (
  page = 1,
  sort: string,
): Promise<MovieResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&include_adult=false&language=en-US&with_original_language=en&sort_by=${sort}`,
    );
    const data = await response.json();

    return data as MovieResponse;
  } catch {
    throw new MovieServiceError({
      name: 'GET_POPULAR_MOVIES',
      message: MOVIE_SERVICE_ERRORS.GET_POPULAR_MOVIES,
    });
  }
};

export const searchMovies = async (
  query: string,
  page: number,
): Promise<MovieResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    );
    const data = await response.json();

    return data as MovieResponse;
  } catch {
    throw new MovieServiceError({
      name: 'SEARCH_MOVIES',
      message: MOVIE_SERVICE_ERRORS.SEARCH_MOVIES,
    });
  }
};

export const getMovieById = async (movieId: string): Promise<Movie> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${encodeURIComponent(movieId)}?api_key=${API_KEY}`,
    );
    const data = await response.json();

    return data as Movie;
  } catch {
    throw new MovieServiceError({
      name: 'GET_MOVIE_BY_ID',
      message: MOVIE_SERVICE_ERRORS.GET_MOVIE_BY_ID,
    });
  }
};

export const getRecommendations = async (
  movieId: string,
): Promise<MovieResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${encodeURIComponent(movieId)}/recommendations?api_key=${API_KEY}`,
    );
    const data = await response.json();

    return data as MovieResponse;
  } catch {
    throw new MovieServiceError({
      name: 'GET_MOVIE_BY_ID',
      message: MOVIE_SERVICE_ERRORS.GET_MOVIE_BY_ID,
    });
  }
};
