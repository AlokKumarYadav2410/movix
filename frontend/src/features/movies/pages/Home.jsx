import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import TrailerModal from "../components/TrailerModal";
import SkeletonLoader from "../../../shared/ui/SkeletonLoader";
import { fetchMovieById, fetchHomeMovies } from "../redux/movieSlice";
import { addFavourite, addHistory, fetchFavourites, removeFavourite } from "../../user/redux/userSlice";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trending, popular, popularTv, popularPeople, topRated, homeLoading } = useSelector((state) => state.movies);
  const { favourites } = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => Boolean(state.auth.user));

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");

  useEffect(() => {
    dispatch(fetchHomeMovies());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavourites());
    }
  }, [dispatch, isAuthenticated]);

  const favouriteIds = useMemo(() => {
    return new Set(favourites.map((item) => String(item.movieId)));
  }, [favourites]);

  const toggleFavourite = (movie) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const movieId = String(movie.id);
    if (favouriteIds.has(movieId)) {
      dispatch(removeFavourite(movieId));
      return;
    }
    dispatch(addFavourite(movieId));
  };

  const openTrailer = async (movie) => {
    try {
      const payload = await dispatch(fetchMovieById(movie.id)).unwrap();
      setTrailerKey(payload?.trailer?.key || "");
      setTrailerTitle(movie.title || "Movie trailer");
      setIsTrailerOpen(true);

      if (isAuthenticated) {
        dispatch(addHistory(String(movie.id)));
      }
    } catch {
      setTrailerKey("");
      setTrailerTitle(movie.title || "Movie trailer");
      setIsTrailerOpen(true);
    }
  };

  return (
    <div className={styles.home}>
      <HeroBanner movie={trending[0]} onWatchTrailer={openTrailer} />

      {homeLoading ? (
        <SkeletonLoader count={10} />
      ) : (
        <>
          <MovieRow
            title="Trending"
            movies={trending}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
            onWatchTrailer={openTrailer}
          />
          <MovieRow
            title="Popular Picks"
            movies={popular}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
            onWatchTrailer={openTrailer}
          />
          <MovieRow
            title="Top Rated"
            movies={topRated}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
            onWatchTrailer={openTrailer}
          />
          <MovieRow
            title="Popular TV Shows"
            movies={popularTv}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
            onWatchTrailer={openTrailer}
          />
          <MovieRow
            title="Popular People"
            movies={popularPeople}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
            onWatchTrailer={openTrailer}
          />
        </>
      )}

      <TrailerModal
        isOpen={isTrailerOpen}
        trailerKey={trailerKey}
        title={trailerTitle}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
};

export default Home;
