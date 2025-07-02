const POSTER_PATH_BASE = 'https://image.tmdb.org/t/p/';

export const buildImagePath = (path: string, reducedSize = true): string => {
  let url = POSTER_PATH_BASE;
  url += reducedSize ? 'original/' : 'w500/';
  return `${url}${path}`;
};
