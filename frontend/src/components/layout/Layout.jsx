import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

import styles from "./Layout.module.scss"

const Layout = () => {
  return (
    <div className={styles.layout}>

      <Sidebar />

      <div className={styles.content}>

        <Navbar />

        <main className={styles.main}>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default Layout