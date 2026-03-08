import { motion } from "framer-motion"
import { Play, Plus } from "lucide-react"
import styles from "./HeroBanner.module.scss"

const HeroBanner = () => {

  return (
    <section className={styles.hero}>

      {/* Background Image */}
      <div
        className={styles.background}
        style={{
          backgroundImage:
            "url(https://image.tmdb.org/t/p/original/9zcbqSxdsRMZWHYtyCd1nXPr2xq.jpg)"
        }}
      />

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <span className={styles.badge}>Trending</span>

        <h1 className={styles.title}>
          Spider-Man <br /> Across the Spider-Verse
        </h1>

        <div className={styles.genres}>
          <span>Animation</span>
          <span>Action</span>
          <span>Adventure</span>
        </div>

        <p className={styles.description}>
          Miles Morales catapults across the Multiverse, where he encounters a
          team of Spider-People charged with protecting its very existence.
        </p>

        <div className={styles.buttons}>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className={styles.play}
          >
            <Play size={18} />
            Watch Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className={styles.secondary}
          >
            <Plus size={18} />
            My List
          </motion.button>

        </div>

      </motion.div>

    </section>
  )
}

export default HeroBanner