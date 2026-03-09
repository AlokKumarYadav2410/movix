import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import TrailerModal from "../components/TrailerModal";
import useMovies from "../hooks/useMovies";
import useDebounce from "../../../shared/hooks/useDebounce";
import SkeletonLoader from "../../../shared/ui/SkeletonLoader";
import { fetchExploreMovies, fetchMovieById, searchMovies } from "../redux/movieSlice";
import { addFavourite, addHistory, fetchFavourites, removeFavourite } from "../../user/redux/userSlice";
import styles from "./Explore.module.scss";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sentinelRef = useRef(null);
  const canAutoLoadRef = useRef(true);

  const { allMovies, searchResults, searchQuery, exploreLoading, searchLoading, explorePage, exploreHasMore } = useMovies();
  const { favourites } = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => Boolean(state.auth.user));
  const debouncedSearch = useDebounce(searchQuery, 450);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isLoadingMorePage, setIsLoadingMorePage] = useState(false);
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    if (allMovies.length === 0) {
      dispatch(fetchExploreMovies(1));
    }
  }, [allMovies.length, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavourites());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      return;
    }
    dispatch(searchMovies(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const favouriteIds = useMemo(() => {
    return new Set(favourites.map((item) => String(item.movieId)));
  }, [favourites]);

  const filteredAndSorted = useMemo(() => {
    const source = debouncedSearch.trim() ? searchResults : allMovies;

    const filtered = source.filter((movie) => {
      const ratingOk = Number(movie?.rating || 0) >= Number(minRating);
      const year = movie?.releaseDate ? String(movie.releaseDate).slice(0, 4) : "";
      const yearOk = yearFilter ? year === yearFilter : true;
      const mediaType = movie?.mediaType || "movie";
      const typeOk = mediaTypeFilter === "all" ? true : mediaType === mediaTypeFilter;
      return ratingOk && yearOk && typeOk;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "rating") {
        return Number(b?.rating || 0) - Number(a?.rating || 0);
      }
      if (sortBy === "newest") {
        return new Date(b?.releaseDate || 0) - new Date(a?.releaseDate || 0);
      }
      if (sortBy === "title") {
        return String(a?.title || "").localeCompare(String(b?.title || ""));
      }
      return 0;
    });

    return sorted;
  }, [allMovies, debouncedSearch, mediaTypeFilter, minRating, searchResults, sortBy, yearFilter]);

  const renderedList = useMemo(() => {
    return filteredAndSorted;
  }, [filteredAndSorted]);

  const isLoading = exploreLoading || (debouncedSearch.trim() && searchLoading);

  useEffect(() => {
    setIsFetchingMore(false);
    setIsLoadingMorePage(false);
    isLoadingMoreRef.current = false;
    canAutoLoadRef.current = true;
  }, [debouncedSearch, mediaTypeFilter, minRating, sortBy, yearFilter]);

  const loadMoreMovies = useCallback(() => {
    if (debouncedSearch.trim()) {
      return;
    }

    if (isFetchingMore || isLoading || isLoadingMoreRef.current || !exploreHasMore) {
      return;
    }

    setIsFetchingMore(true);
    setIsLoadingMorePage(true);
    isLoadingMoreRef.current = true;

    dispatch(fetchExploreMovies((explorePage || 1) + 1))
      .finally(() => {
        setIsFetchingMore(false);
        setIsLoadingMorePage(false);
        isLoadingMoreRef.current = false;
      });
  }, [debouncedSearch, dispatch, exploreHasMore, explorePage, isFetchingMore, isLoading]);

  useEffect(() => {
    if (!exploreHasMore || debouncedSearch.trim()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          canAutoLoadRef.current = true;
          return;
        }

        if (!canAutoLoadRef.current) {
          return;
        }

        canAutoLoadRef.current = false;
        loadMoreMovies();
      },
      { threshold: 0.25 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [debouncedSearch, exploreHasMore, loadMoreMovies]);

  const toggleFavourite = (movie) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const movieId = String(movie.id);
    if (favouriteIds.has(movieId)) {
      dispatch(removeFavourite(movieId));
    } else {
      dispatch(addFavourite(movieId));
    }
  };

  const openTrailer = async (movie) => {
    try {
      const payload = await dispatch(fetchMovieById({ id: movie.id, mediaType: movie?.mediaType || "movie" })).unwrap();
      setTrailerKey(payload?.trailer?.key || "");
      setTrailerTitle(movie.title || "Movie trailer");
      setIsTrailerOpen(true);

      if (isAuthenticated) {
        dispatch(addHistory(String(movie.id)));
      }
    } catch {
      setTrailerKey("");
      setTrailerTitle(movie.title || "Movie trailer");
      setIsTrailerOpen(true);
    }
  };

  return (
    <section className={styles.explore}>
      <header className={styles.header}>
        <h1>{debouncedSearch.trim() ? `Search: ${debouncedSearch}` : "Explore Movies"}</h1>
        <p>Live search + infinite scroll with smooth transitions.</p>
      </header>

      <div className={styles.filters}>
        <label>
          Type
          <select value={mediaTypeFilter} onChange={(event) => setMediaTypeFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
            <option value="person">People</option>
          </select>
        </label>

        <label>
          Min Rating
          <select value={minRating} onChange={(event) => setMinRating(event.target.value)}>
            <option value="0">All</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </select>
        </label>

        <label>
          Release Year
          <input
            type="number"
            min="1900"
            max="2099"
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
            placeholder="e.g. 2024"
          />
        </label>

        <label>
          Sort By
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <SkeletonLoader count={12} />
      ) : (
        <div className={styles.grid}>
          {renderedList.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavourite={favouriteIds.has(String(movie.id))}
              onToggleFavourite={toggleFavourite}
              onWatchTrailer={openTrailer}
            />
          ))}
        </div>
      )}

      {isLoadingMorePage ? (
        <div className={styles.loadMoreWrap}>
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
        </div>
      ) : null}

      {!debouncedSearch.trim() && exploreHasMore ? <div ref={sentinelRef} className={styles.sentinel} /> : null}

      <TrailerModal
        isOpen={isTrailerOpen}
        trailerKey={trailerKey}
        title={trailerTitle}
        onClose={() => setIsTrailerOpen(false)}
      />
    </section>
  );
};

export default Explore;
