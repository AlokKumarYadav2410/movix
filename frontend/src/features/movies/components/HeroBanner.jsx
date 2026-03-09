import { motion } from "framer-motion";
import { Flame, PlayCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./HeroBanner.module.scss";

const FALLBACK_BACKDROP = "https://placehold.co/1280x720/111827/f9fafb?text=Movie+Backdrop";

const HeroBanner = ({ movie, onWatchTrailer }) => {
  if (!movie) {
    return null;
  }

  const rating = Number(movie?.rating);
  const formattedRating = Number.isFinite(rating) ? rating.toFixed(1) : "N/A";
  const mediaType = movie?.mediaType === "tv" ? "tv" : "movie";

  return (
    <motion.section
      className={styles.banner}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <img src={movie.backdrop || FALLBACK_BACKDROP} alt={movie.title || "Featured movie"} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.badge}>
          <Flame size={14} /> Trending Now
        </span>
        <span className={styles.ratingBadge}>
          <Star size={14} /> {formattedRating}
        </span>
        <h1>{movie.title || "Untitled movie"}</h1>
        <p>{movie.description || "Description not available"}</p>
        <div className={styles.actions}>
          <Link className={styles.primary} to={`/movies/${movie.id}?type=${encodeURIComponent(mediaType)}`}>
            View Details
          </Link>
          <button type="button" className={styles.ghost} onClick={() => onWatchTrailer?.(movie)}>
            <PlayCircle size={16} /> Trailer
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
