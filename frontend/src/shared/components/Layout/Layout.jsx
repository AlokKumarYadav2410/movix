import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./Layout.module.scss"

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <div className={styles.layout}>

      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className={styles.main}>

        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        <div className={styles.content}>
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