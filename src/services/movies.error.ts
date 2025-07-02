import { ServiceError } from './api.error';

export const MOVIE_SERVICE_ERRORS = {
  GET_POPULAR_MOVIES: 'failed to get popular movies',
  SEARCH_MOVIES: 'failed to search movies',
  GET_MOVIE_BY_ID: 'failed to get movie by ID',
};

type MovieErrors = keyof typeof MOVIE_SERVICE_ERRORS;
export class MovieServiceError extends ServiceError<MovieErrors> {}
