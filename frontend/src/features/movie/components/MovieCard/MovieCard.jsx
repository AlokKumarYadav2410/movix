import { motion } from "framer-motion"
import { Play, Star } from "lucide-react"
import styles from "./MovieCard.module.scss"

const MovieCard = ({ movie }) => {

  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.08, y: -6 }}
      transition={{ duration: 0.25 }}
    >

      <img src={movie.poster} alt={movie.title} />

      <div className={styles.info}>

        <div className={styles.top}>

          <span className={styles.rating}>
            <Star size={14}/>
            {movie.rating}
          </span>

          <button className={styles.play}>
            <Play size={16}/>
          </button>

        </div>

        <h4>{movie.title}</h4>

      </div>

    </motion.div>
  )
}

export default MovieCard