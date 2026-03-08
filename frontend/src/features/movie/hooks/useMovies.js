import { useEffect, useState } from "react"
import { getTrendingMovies, getPopularMovies } from "../api/movie.api"

const useMovies = () => {

  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchMovies = async () => {
      try {

        const trendingData = await getTrendingMovies()
        const popularData = await getPopularMovies()

        setTrending(trendingData.movies)
        setPopular(popularData.movies)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()

  }, [])

  return { trending, popular, loading }
}

export default useMovies