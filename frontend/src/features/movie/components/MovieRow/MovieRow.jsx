import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "../MovieCard/MovieCard"
import Skeleton from "react-loading-skeleton"
import styles from "./MovieRow.module.scss"

const MovieRow = ({ title, movies, loading }) => {

  const viewportRef = useRef(null)
  const sliderRef = useRef(null)

  const [dragWidth, setDragWidth] = useState(0)

  useEffect(() => {
    if (viewportRef.current && sliderRef.current) {
      const width =
        sliderRef.current.scrollWidth - viewportRef.current.offsetWidth
      setDragWidth(width > 0 ? width : 0)
    }
  }, [movies])

  const scrollLeft = () => {
    viewportRef.current.scrollBy({
      left: -400,
      behavior: "smooth"
    })
  }

  const scrollRight = () => {
    viewportRef.current.scrollBy({
      left: 400,
      behavior: "smooth"
    })
  }

  const handleWheel = (e) => {
    e.preventDefault()
    viewportRef.current.scrollLeft += e.deltaY
  }

  return (
    <div className={styles.row}>

      <div className={styles.header}>

        <h2>{title}</h2>

        <div className={styles.controls}>
          <button onClick={scrollLeft}>
            <ChevronLeft size={18}/>
          </button>

          <button onClick={scrollRight}>
            <ChevronRight size={18}/>
          </button>
        </div>

      </div>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onWheel={handleWheel}
      >

        <motion.div
          ref={sliderRef}
          className={styles.slider}
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >

          {loading
            ? Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} height={250} width={180}/>
              ))
            : movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))
          }

        </motion.div>

      </div>

    </div>
  )
}

export default MovieRow