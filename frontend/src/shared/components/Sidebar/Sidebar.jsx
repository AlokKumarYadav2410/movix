import { NavLink } from "react-router-dom"
import { Clapperboard, Compass, Heart, History, Home, LogIn, LogOut, Shield, Tv, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../../features/auth/redux/authSlice"
import styles from "./Sidebar.module.scss"

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const menuItems = [
    { name: "Home", icon: <Home />, path: "/" },
    { name: "Explore", icon: <Compass />, path: "/explore" },
    { name: "Favourites", icon: <Heart />, path: "/favourites" },
    { name: "History", icon: <History />, path: "/history" }
  ]

  if (user?.role === "admin") {
    menuItems.push({ name: "Admin", icon: <Shield />, path: "/admin" })
  }

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate("/login")
    onClose?.()
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        aria-label="Close menu"
        onClick={onClose}
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >

        <div className={styles.head}>
          <NavLink to="/" onClick={onClose} className={styles.logo}>
           <Clapperboard size={32} color="#ff0000" />
            <span>Movix</span>
          </NavLink>

          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className={styles.menu}>

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>

        <div className={styles.authActions}>
          {user ? (
            <>
              <p className={styles.userName}>Hi, {user.name}</p>
              <button type="button" className={styles.actionBtn} onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={onClose} className={styles.actionBtn}>
              <LogIn size={16} />
              Login
            </NavLink>
          )}
        </div>

      </aside>
    </>
  )
}

export default Sidebar