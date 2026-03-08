import HeroBanner from "../../components/HeroBanner/HeroBanner"
import MovieRow from "../../components/MovieRow/MovieRow"
import useMovies from "../../hooks/useMovies"

const Home = () => {

  const { trending, popular, loading } = useMovies()

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <HeroBanner movie={trending?.[0]} />

      <MovieRow
        title="Continue Watching"
        movies={trending}
      />

      <MovieRow
        title="You Might Like"
        movies={popular}
      />

    </div>
  )
}

export default Home