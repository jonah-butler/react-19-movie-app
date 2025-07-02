import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SelectInput, { type SortOptions } from '../components/SelectInput';
import '../css/Home.css';
import { getMovies, searchMovies } from '../services/movies';
import { MovieServiceError } from '../services/movies.error';
import { type Movie } from '../services/movies.types';

function Home() {
  // Setup
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get('sort') || 'popularity.desc';
  const query = searchParams.get('query') || '';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState(initialSort);

  // Refs
  const totalPages = useRef(currentPage);
  const endOfGridRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Static Props Data
  const sortOptions: SortOptions[] = [
    { label: 'Popularity ⬆️', value: 'popularity.asc' },
    { label: 'Popularity ⬇️', value: 'popularity.desc' },
    { label: 'Revenue ⬆️', value: 'revenue.asc' },
    { label: 'Revenue ⬇️', value: 'revenue.desc' },
    { label: 'Primary Release Date ⬆️', value: 'primary_release_date.asc' },
    { label: 'Primary Release Date ⬇️', value: 'primary_release_date.desc' },
    { label: 'Title ⬆️', value: 'title.asc' },
    { label: 'Title ⬇️', value: 'title.desc' },
    { label: 'Vote Average ⬆️', value: 'vote_average.asc' },
    { label: 'Vote Average ⬇️', value: 'vote_average.desc' },
    { label: 'Vote Count ⬆️', value: 'vote_count.asc' },
    { label: 'Vote Count ⬇️', value: 'vote_count.desc' },
  ];
  /**
   * - EFFECT -
   * - load more movies function: only updates if values internally get updated -
   */
  const loadMoreMovies = useCallback(async (): Promise<void> => {
    if (loading || currentPage > totalPages.current || currentPage === 1)
      return;
    setLoading(true);

    try {
      if (!query) {
        const { results, page, total_pages } = await getMovies(
          currentPage,
          selectedSort,
        );
        totalPages.current = total_pages;
        setPage(page + 1);

        setMovies((prev) => [...prev, ...results]);
      } else {
        const { results, page, total_pages } = await searchMovies(
          query,
          currentPage,
        );

        totalPages.current = total_pages;
        setPage(page + 1);

        setMovies((prev) => [...prev, ...results]);
      }
    } catch (err) {
      if (err instanceof MovieServiceError) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, currentPage, selectedSort, query]);

  const loadMoreMoviesRef = useRef(loadMoreMovies);

  /**
   * - EFFECT-
   * Always points to latest loadMoreMovies so observer never goes stale.
   */
  useEffect(() => {
    loadMoreMoviesRef.current = loadMoreMovies;
  }, [loadMoreMovies]);

  /**
   * - EFFECT -
   * Initialize observer once
   */
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMoviesRef.current();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    );

    const currentEndRef = endOfGridRef.current;
    const currentObserver = observer.current;
    if (currentEndRef) observer.current.observe(currentEndRef);

    return () => {
      if (currentEndRef && currentObserver)
        currentObserver.unobserve(currentEndRef);
    };
  }, []);

  /**
   * - EFFECT -
   * Keep URL updated with selectedSort
   *
   */
  useEffect(() => {
    if (query) return;

    const currentSort = searchParams.get('sort');
    if (currentSort !== selectedSort) {
      searchParams.set('sort', selectedSort);
      setSearchParams(searchParams);
    }
  }, [selectedSort, searchParams, setSearchParams, query]);

  /**
   * - EFFECT -
   * Load movies on page load or when query/sort changes
   *
   */
  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);
      try {
        if (!query) {
          const { results, page, total_pages } = await getMovies(
            1,
            selectedSort,
          );
          totalPages.current = total_pages;
          setMovies(results);
          setPage(page + 1);
        } else {
          const { results, page, total_pages } = await searchMovies(query, 1);
          totalPages.current = total_pages;

          setMovies(results);
          setPage(page + 1);
        }
      } catch (err) {
        if (err instanceof MovieServiceError) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadInitialMovies();
  }, [query, selectedSort]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim() || loading) return;

    searchParams.delete('sort');
    setSearchParams(searchParams);

    navigate(`?query=${encodeURIComponent(searchQuery)}`);
  };

  const navigateToMovie = (movieId: number): void => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="home">
      {/* Search Movie Input */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Sort By Select Filters */}
      {!query && (
        <section className="home-sort-by-wrapper">
          <label>Sort By</label>
          <SelectInput
            options={sortOptions}
            currentValue={selectedSort}
            onChange={setSelectedSort}
          />
        </section>
      )}

      {/* Error Messaging */}
      {error && <div className="error-message">{error}</div>}

      {/* Movie Grid */}
      <div className="movies-grid-container">
        <div className="movies-grid">
          {movies.map((movie, i) => (
            <MovieCard
              onClick={() => navigateToMovie(movie.id)}
              key={i}
              movie={movie}
            />
          ))}
        </div>
      </div>

      {/*  Bottom Observer Grid for Infinite Scroll */}
      <div ref={endOfGridRef} className="movie-grid-end"></div>

      {/* Loading */}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default Home;
