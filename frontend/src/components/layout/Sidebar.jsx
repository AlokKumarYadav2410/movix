import { motion } from "framer-motion"
import { Home, Compass, Heart, Settings } from "lucide-react"
import styles from "./Sidebar.module.scss"

const Sidebar = () => {

  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <h1 className={styles.logo}>Movix</h1>

      <nav className={styles.nav}>

        <a className={styles.item}>
          <Home size={20} />
          Home
        </a>

        <a className={styles.item}>
          <Compass size={20} />
          Explore
        </a>

        <a className={styles.item}>
          <Heart size={20} />
          Favourites
        </a>

      </nav>

      <div className={styles.bottom}>
        <Settings size={20} />
        Settings
      </div>

    </motion.aside>
  )
}

export default Sidebar