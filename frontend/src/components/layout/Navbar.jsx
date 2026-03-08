import { motion } from "framer-motion"
import { Search, Bell } from "lucide-react"
import styles from "./Navbar.module.scss"

const Navbar = () => {

  return (
    <motion.header
      className={styles.navbar}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      <div className={styles.searchBox}>

        <Search size={18} />

        <input
          type="text"
          placeholder="Search movies, actors..."
        />

      </div>

      <div className={styles.actions}>

        <Bell size={20} />

        <img
          src="https://i.pravatar.cc/40"
          alt="user"
        />

      </div>

    </motion.header>
  )
}

export default Navbar