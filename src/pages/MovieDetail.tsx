import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import MovieCard from '../components/MovieCard';
import WatchedButton from '../components/WatchedButton';
import '../css/MovieDetail.css';
import { getMovieById, getRecommendations } from '../services/movies';
import { MovieServiceError } from '../services/movies.error';
import { type Movie } from '../services/movies.types';
import { buildImagePath } from '../utilities/movies';

function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * - EFFECT -
   * - load movie by ID and recommendations -
   * - respond to changes on movideID to retrigger movie loading -
   */
  useEffect(() => {
    if (!movieId) return;

    scrollToTop();

    const loadMovieById = async (): Promise<void> => {
      try {
        const response = await getMovieById(movieId);

        setMovie(response);
      } catch (err) {
        if (err instanceof MovieServiceError) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const loadMovieRecommendations = async (): Promise<void> => {
      try {
        const { results } = await getRecommendations(movieId);
        setRecommendations(results);
      } catch (err) {
        if (err instanceof MovieServiceError) {
          setError(err.message);
        }
      }
    };

    loadMovieById();
    loadMovieRecommendations();
  }, [movieId]);

  const navigateToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div>
          {/* Movie Backdrop */}
          <div className="movie-backdrop-wrapper">
            <section className="movie-backdrop">
              {movie.backdrop_path ? (
                <img src={buildImagePath(movie.backdrop_path)} />
              ) : (
                <p>No backdrop image available ☹️</p>
              )}
              <div className="movie-backdrop-overlay"></div>
            </section>

            {/* Movie Details */}
            <div className="movie-details-container">
              {/* Left Column Poster */}
              <section className="movie-poster-column1">
                {movie.poster_path ? (
                  <img src={buildImagePath(movie.poster_path)} alt="" />
                ) : (
                  <div className="movie-poster-placeholder"></div>
                )}
              </section>

              {/* Right Column Details */}
              <section className="movie-details-column2">
                <h1>{movie.title}</h1>
                <div className="movie-details-row">
                  <FavoriteButton movie={movie} />
                  <WatchedButton movie={movie} />
                  <span className="movie-date">
                    {new Date(movie.release_date).getFullYear() ||
                      'No date available'}
                  </span>
                </div>
                <p className="movie-tagline">{movie.tagline || ''}</p>
                <p className="movie-overview">{movie.overview || ''}</p>
              </section>
            </div>

            {/* Recommendations List */}
            {recommendations.length > 0 && (
              <section className="movie-recommendations-container">
                <div>
                  <h2>You May Also Like</h2>
                  <hr />
                </div>
                <div className="movies-grid">
                  {recommendations.map((recommendation) => (
                    <MovieCard
                      onClick={() => navigateToMovie(recommendation.id)}
                      key={recommendation.id}
                      movie={recommendation}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
