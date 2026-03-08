import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../movies/components/MovieCard";
import TrailerModal from "../../movies/components/TrailerModal";
import SkeletonLoader from "../../../shared/ui/SkeletonLoader";
import { fetchMovieById } from "../../movies/redux/movieSlice";
import { getMovieDetailsApi } from "../../movies/api/movie.api";
import { fetchFavourites, removeFavourite } from "../redux/userSlice";
import styles from "./UserPages.module.scss";

const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.user);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  useEffect(() => {
    const loadFavouriteMovies = async () => {
      setLoading(true);
      try {
        const ids = favourites.map((item) => item.movieId);
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

    loadFavouriteMovies();
  }, [favourites]);

  const favIds = useMemo(() => new Set(favourites.map((item) => String(item.movieId))), [favourites]);

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
      <h1>Your Favourites</h1>
      {loading ? (
        <SkeletonLoader count={10} />
      ) : movies.length ? (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavourite={favIds.has(String(movie.id))}
              onToggleFavourite={(item) => dispatch(removeFavourite(String(item.id)))}
              onWatchTrailer={openTrailer}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No favourites yet. Start exploring movies.</p>
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

export default Favourites;
