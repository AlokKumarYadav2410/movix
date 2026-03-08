import HeroBanner from "../../components/movie/HeroBanner"
import MovieRow from "../../components/movie/MovieRow"

const movies = [
  {
    id: 1,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg"
  },
  {
    id: 2,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 3,
    title: "Joker",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    id: 4,
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
  },
  {
    id: 1,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg",
    rating: 8.7,
    genres: ["Sci-Fi","Adventure"]
  },
  {
    id: 2,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 8.8,
    genres: ["Action","Sci-Fi"]
  }
]

const Home = () => {

  return (
    <div>

      <HeroBanner />

      <MovieRow
        title="Trending Now"
        movies={movies}
      />

      <MovieRow
        title="Recommended"
        movies={movies}
      />

    </div>
  )
}

export default Home