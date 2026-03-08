import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import MovieCard from "./MovieCard";
import styles from "./MovieRow.module.scss";

const MovieRow = ({
  title,
  movies,
  favouriteIds = new Set(),
  onToggleFavourite,
  onWatchTrailer
}) => {
  const viewportRef = useRef(null);

  const scrollBy = (distance) => {
    viewportRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className={styles.row}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.controls}>
          <button type="button" onClick={() => scrollBy(-360)} aria-label="Scroll left">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => scrollBy(360)} aria-label="Scroll right">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.item}>
              <MovieCard
                movie={movie}
                isFavourite={favouriteIds.has(String(movie.id))}
                onToggleFavourite={onToggleFavourite}
                onWatchTrailer={onWatchTrailer}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
