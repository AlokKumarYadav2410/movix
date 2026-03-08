import { useMemo } from "react";
import { useSelector } from "react-redux";

const useMovies = () => {
  const state = useSelector((store) => store.movies);

  const allMovies = useMemo(() => {
    const combined = [
      ...state.trending,
      ...state.popular,
      ...state.popularTv,
      ...state.popularPeople,
      ...state.topRated,
      ...state.upcoming
    ];

    const unique = new Map();
    combined.forEach((movie) => {
      if (movie?.id && !unique.has(String(movie.id))) {
        unique.set(String(movie.id), movie);
      }
    });

    return [...unique.values()];
  }, [state.popular, state.popularPeople, state.popularTv, state.topRated, state.trending, state.upcoming]);

  return {
    ...state,
    allMovies
  };
};

export default useMovies;
