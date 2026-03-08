import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import styles from "./ThemeToggle.module.scss"

const ThemeToggle = () => {

  const [theme, setTheme] = useState(() => localStorage.getItem("movix_theme") || "dark")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("movix_theme", theme)
  }, [theme])

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export default ThemeToggle