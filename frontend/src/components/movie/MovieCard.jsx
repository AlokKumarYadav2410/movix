import { motion } from "framer-motion"
import { Play, Star } from "lucide-react"
import styles from "./MovieCard.module.scss"

const MovieCard = ({ movie }) => {

  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ duration: 0.25 }}
    >

      <img
        src={movie.poster}
        alt={movie.title}
      />

      {/* Hover Content */}

      <div className={styles.info}>

        <div className={styles.top}>

          <span className={styles.rating}>
            <Star size={14} />
            {movie.rating || "8.5"}
          </span>

          <button className={styles.play}>
            <Play size={16} />
          </button>

        </div>

        <h4>{movie.title}</h4>

        <div className={styles.genres}>

          {(movie.genres || ["Action","Drama"]).map((g, i) => (
            <span key={i}>{g}</span>
          ))}

        </div>

      </div>

    </motion.div>
  )
}

export default MovieCard