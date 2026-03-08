import { motion } from "framer-motion"
import { Play, Download } from "lucide-react"
import styles from "./HeroBanner.module.scss"

const HeroBanner = ({ movie }) => {

  return (
    <motion.div
      className={styles.banner}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >

      <img src={movie?.backdrop} alt={movie?.title} />

      <div className={styles.overlay} />

      <div className={styles.content}>

        <motion.span
          className={styles.badge}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          🔥 Now Trending
        </motion.span>

        <h1>{movie?.title}</h1>

        <p>{movie?.overview}</p>

        <div className={styles.actions}>

          <button className={styles.watch}>
            <Play size={18} />
            Watch Now
          </button>

          <button className={styles.download}>
            <Download size={18} />
            Download
          </button>

        </div>

      </div>

    </motion.div>
  )
}

export default HeroBanner