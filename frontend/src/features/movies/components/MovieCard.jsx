import { Heart, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./MovieCard.module.scss";

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

const MovieCard = ({ movie, isFavourite, onToggleFavourite, onWatchTrailer }) => {
  const poster = movie?.poster || FALLBACK_POSTER;
  const description = movie?.description || "Description not available";
  const formattedRating = getFormattedRating(movie?.rating);
  const ratingToneClass = getRatingToneClass(movie?.rating, styles);
  const mediaType = movie?.mediaType || "movie";
  const isMovie = mediaType === "movie";
  const isTv = mediaType === "tv";
  const isPerson = mediaType === "person";
  const isPlayable = isMovie || isTv;
  const isNavigable = !isPerson;
  const detailsPath = isPlayable
    ? `/movies/${movie.id}?type=${encodeURIComponent(mediaType)}`
    : `/explore?type=${encodeURIComponent(mediaType)}`;
  const mediaTypeLabel = mediaType === "tv" ? "TV" : mediaType === "person" ? "Person" : "Movie";

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {isNavigable ? (
        <Link to={detailsPath} className={styles.posterWrap}>
          <img src={poster} alt={movie?.title || "Movie poster"} loading="lazy" />
          <div className={styles.gradient} />
          <span className={styles.mediaTypeTag}>{mediaTypeLabel}</span>
        </Link>
      ) : (
        <div className={clsx(styles.posterWrap, styles.posterStatic)}>
          <img src={poster} alt={movie?.title || "Movie poster"} loading="lazy" />
          <div className={styles.gradient} />
          <span className={styles.mediaTypeTag}>{mediaTypeLabel}</span>
        </div>
      )}

      <div className={styles.meta}>
        <p className={styles.title}>{movie?.title || "Untitled movie"}</p>
        <p className={styles.overview}>{description}</p>
        <div className={styles.row}>
          {!isPerson ? (
            <span className={clsx(styles.rating, ratingToneClass)}>
              <Star size={14} />
              {formattedRating}
            </span>
          ) : <span />}
          <div className={styles.actions}>
            {isPlayable ? (
              <>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => onWatchTrailer?.(movie)}
                  aria-label="Watch trailer"
                >
                  <Play size={14} />
                </button>
                <button
                  type="button"
                  className={clsx(styles.iconBtn, isFavourite && styles.favourite)}
                  onClick={() => onToggleFavourite?.(movie)}
                  aria-label="Toggle favourite"
                >
                  <Heart size={14} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default MovieCard;
