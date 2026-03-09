import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../movies/components/MovieCard";
import TrailerModal from "../../movies/components/TrailerModal";
import SkeletonLoader from "../../../shared/ui/SkeletonLoader";
import { fetchMovieById } from "../../movies/redux/movieSlice";
import { getMovieDetailsApi } from "../../movies/api/movie.api";
import { clearHistory, fetchHistory, removeHistoryItem } from "../redux/userSlice";
import styles from "./UserPages.module.scss";

const History = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.user);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useEffect(() => {
    const loadHistoryMovies = async () => {
      setLoading(true);
      try {
        const ids = history.map((item) => item.movieId);
        const responses = await Promise.allSettled(ids.map((id) => getMovieDetailsApi(id)));
        const mapped = responses
          .filter((item) => item.status === "fulfilled")
          .map((item) => item.value?.movie)
          .filter(Boolean);
        setMovies(mapped);
      } finally {
        setLoading(false);
      }
    };

    loadHistoryMovies();
  }, [history]);

  const openTrailer = async (movie) => {
    try {
      const payload = await dispatch(fetchMovieById(movie.id)).unwrap();
      setTrailerKey(payload?.trailer?.key || "");
    } catch {
      setTrailerKey("");
    } finally {
      setTrailerTitle(movie.title || "Movie trailer");
      setIsTrailerOpen(true);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Recent Watch History</h1>
        <button type="button" onClick={() => dispatch(clearHistory())}>Clear History</button>
      </div>

      {loading ? (
        <SkeletonLoader count={10} />
      ) : movies.length ? (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.historyItem}>
              <MovieCard
                movie={movie}
                isFavourite={false}
                onToggleFavourite={() => {}}
                onWatchTrailer={openTrailer}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => dispatch(removeHistoryItem(String(movie.id)))}
              >
                Remove from history
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No watch history yet.</p>
      )}

      <TrailerModal
        isOpen={isTrailerOpen}
        trailerKey={trailerKey}
        title={trailerTitle}
        onClose={() => setIsTrailerOpen(false)}
      />
    </section>
  );
};

export default History;
