import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock8, Heart, PlayCircle, Star } from "lucide-react";
import TrailerModal from "../components/TrailerModal";
import SkeletonLoader from "../../../shared/ui/SkeletonLoader";
import { clearMovieDetails, fetchMovieById } from "../redux/movieSlice";
import { addFavourite, addHistory, fetchFavourites, removeFavourite } from "../../user/redux/userSlice";
import styles from "./MovieDetails.module.scss";

const FALLBACK_POSTER = "https://placehold.co/500x750/1f2937/e5e7eb?text=No+Poster";

const getFormattedRating = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "N/A";
  }
  return numeric.toFixed(1);
};

const getRatingToneClass = (value, stylesObj) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  if (numeric >= 7) {
    return stylesObj.ratingHigh;
  }
  if (numeric >= 5) {
    return stylesObj.ratingMedium;
  }
  return stylesObj.ratingLow;
};

const getFormattedReleaseDate = (value) => {
  if (!value) {
    return "Release date unavailable";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Release date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
};

const MovieDetails = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentMovie, currentTrailer, currentCast, currentMediaImages, currentSimilar, detailsLoading } = useSelector((state) => state.movies);
  const { favourites } = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => Boolean(state.auth.user));

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(fetchMovieById(movieId));
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, movieId, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(fetchFavourites());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (currentMovie && isAuthenticated) {
      dispatch(addHistory(String(currentMovie.id)));
    }
  }, [currentMovie, dispatch, isAuthenticated]);

  const favouriteIds = useMemo(() => {
    return new Set(favourites.map((item) => String(item.movieId)));
  }, [favourites]);

  if (detailsLoading) {
    return <SkeletonLoader count={1} height="420px" />;
  }

  if (!currentMovie) {
    return <p className={styles.empty}>Movie not found.</p>;
  }

  const isFav = favouriteIds.has(String(currentMovie.id));
  const formattedRating = getFormattedRating(currentMovie.rating);
  const ratingToneClass = getRatingToneClass(currentMovie.rating, styles);
  const formattedReleaseDate = getFormattedReleaseDate(currentMovie.releaseDate);

  const toggleFavourite = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isFav) {
      dispatch(removeFavourite(String(currentMovie.id)));
      return;
    }

    dispatch(addFavourite(String(currentMovie.id)));
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <article className={styles.details}>
      <section className={styles.heroBackdropWrap}>
        <button type="button" className={styles.backBtn} onClick={goBack}>
          <ArrowLeft size={16} /> Back
        </button>

        <img
          className={styles.backdropImage}
          src={currentMovie.backdrop || currentMovie.poster || FALLBACK_POSTER}
          alt={`${currentMovie.title || "Movie"} backdrop`}
        />
        <div className={styles.backdropOverlay} />

        <div className={styles.hero}>
          <img src={currentMovie.poster || FALLBACK_POSTER} alt={currentMovie.title || "Movie"} />

          <div className={styles.info}>
            <h1>{currentMovie.title || "Untitled movie"}</h1>
            <p>{currentMovie.description || "Description not available"}</p>

            {currentMovie.genres?.length ? (
              <div className={styles.genres}>
                {currentMovie.genres.map((genre) => (
                  <span key={genre} className={styles.genreBadge}>
                    {genre}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.stats}>
              <span className={ratingToneClass}><Star size={14} /> {formattedRating}</span>
              <span><CalendarDays size={14} /> {formattedReleaseDate}</span>
              <span><Clock8 size={14} /> {currentMovie.runtime || "Runtime unavailable"}</span>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.trailer} onClick={() => setIsTrailerOpen(true)}>
                <PlayCircle size={16} /> Watch Trailer
              </button>
              <button type="button" className={styles.fav} onClick={toggleFavourite}>
                <Heart size={16} /> {isFav ? "Remove Favourite" : "Add Favourite"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.castSection}>
        <h2>Top Cast</h2>
        <div className={styles.castGrid}>
          {currentCast.length ? (
            currentCast.map((actor) => (
              <div key={actor.id} className={styles.castCard}>
                <img
                  src={actor.profile || "https://placehold.co/200x280/374151/e5e7eb?text=No+Image"}
                  alt={actor.name || "Actor"}
                  loading="lazy"
                />
                <p>{actor.name || "Unknown"}</p>
                <small>{actor.character || "Character unavailable"}</small>
              </div>
            ))
          ) : (
            <p className={styles.empty}>Cast not available.</p>
          )}
        </div>
      </section>

      <section className={styles.mediaSection}>
        <h2>Images & Media</h2>
        <div className={styles.mediaGrid}>
          {currentMediaImages.length ? (
            currentMediaImages.map((image, index) => (
              <a
                key={`${image}-${index}`}
                href={image}
                target="_blank"
                rel="noreferrer"
                className={styles.mediaCard}
              >
                <img src={image} alt={`${currentMovie.title || "Movie"} media ${index + 1}`} loading="lazy" />
              </a>
            ))
          ) : (
            <p className={styles.empty}>Media not available.</p>
          )}
        </div>
      </section>

      <section className={styles.moreSection}>
        <h2>More Like This</h2>
        <div className={styles.moreGrid}>
          {currentSimilar.length ? (
            currentSimilar.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`} className={styles.moreCard}>
                <img src={movie.poster || FALLBACK_POSTER} alt={movie.title || "Movie"} loading="lazy" />
                <p>{movie.title || "Untitled movie"}</p>
              </Link>
            ))
          ) : (
            <p className={styles.empty}>No similar movies available.</p>
          )}
        </div>
      </section>

      <TrailerModal
        isOpen={isTrailerOpen}
        trailerKey={currentTrailer?.key || ""}
        title={currentMovie.title}
        onClose={() => setIsTrailerOpen(false)}
      />
    </article>
  );
};

export default MovieDetails;
