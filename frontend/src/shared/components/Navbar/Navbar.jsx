import { motion } from "framer-motion"
import { Menu, Search } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ThemeToggle from "../../ui/ThemeToggle"
import { setSearchQuery } from "../../../features/movies/redux/movieSlice"
import styles from "./Navbar.module.scss"

const Navbar = ({ onOpenMenu }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const searchQuery = useSelector((state) => state.movies.searchQuery)

  const onSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value))
    navigate("/explore")
  }

  return (
    <motion.div
      className={styles.navbar}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      <div className={styles.search}>

        <Search size={18} />

        <input
          type="text"
          placeholder="Search movies instantly..."
          value={searchQuery}
          onChange={onSearchChange}
        />

      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onOpenMenu}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <h3>Hi, {user ? user.name : "Guest"}</h3>
        <ThemeToggle />

      </div>

    </motion.div>
  )
}

export default Navbar