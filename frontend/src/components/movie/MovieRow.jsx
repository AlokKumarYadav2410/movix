import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import MovieCard from "./MovieCard"
import styles from "./MovieRow.module.scss"

const MovieRow = ({ title, movies }) => {

  const rowRef = useRef()

  const scroll = (direction) => {

    const { current } = rowRef

    const scrollAmount = 300

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }

  }

  return (
    <section className={styles.row}>

      <div className={styles.header}>
        <h2>{title}</h2>

        <div className={styles.controls}>

          <button onClick={() => scroll("left")}>
            <ChevronLeft size={20} />
          </button>

          <button onClick={() => scroll("right")}>
            <ChevronRight size={20} />
          </button>

        </div>
      </div>

      <div
        ref={rowRef}
        className={styles.movies}
      >

        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}

      </div>

    </section>
  )
}

export default MovieRow