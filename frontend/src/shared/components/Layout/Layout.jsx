import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import ToastHost from "../../ui/ToastHost"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./Layout.module.scss"

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }, [location.pathname, location.search])

  return (
    <div className={styles.layout}>

      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className={styles.main}>

        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        <div className={styles.content}>
          <ToastHost />
          <Outlet />
          {
            location.pathname === "/admin" ? null : <Footer />
          }
        </div>

      </div>

    </div>
  )
}

export default Layout