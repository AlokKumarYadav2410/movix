import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFullMovieApi,
  getPopularMoviesApi,
  getPopularPeopleApi,
  getPopularTvShowsApi,
  getTopRatedMoviesApi,
  getTrendingMoviesApi,
  getUpcomingMoviesApi,
  searchMoviesApi
} from "../api/movie.api";
import { getErrorMessage } from "../../../shared/api/client";

export const fetchHomeMovies = createAsyncThunk(
  "movies/fetchHomeMovies",
  async (_, { rejectWithValue, getState }) => {
    try {
      const isAuthenticated = Boolean(getState()?.auth?.user);

      const [trending, popular, popularTv, popularPeople, topRated] = await Promise.all([
        getTrendingMoviesApi(),
        getPopularMoviesApi(),
        getPopularTvShowsApi(),
        getPopularPeopleApi(),
        isAuthenticated ? getTopRatedMoviesApi() : Promise.resolve({ movies: [] })
      ]);

      return {
        trending: trending?.movies || [],
        popular: popular?.movies || [],
        popularTv: popularTv?.shows || [],
        popularPeople: popularPeople?.people || [],
        topRated: topRated?.movies || []
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch home movies"));
    }
  }
);

export const fetchExploreMovies = createAsyncThunk(
  "movies/fetchExploreMovies",
  async (page = 1, { rejectWithValue, getState }) => {
    try {
      const isAuthenticated = Boolean(getState()?.auth?.user)

      const calls = [
        getTrendingMoviesApi(page),
        getPopularMoviesApi(page),
        getPopularTvShowsApi(page),
        getPopularPeopleApi(page),
        isAuthenticated ? getTopRatedMoviesApi(page) : Promise.resolve({ movies: [] }),
        isAuthenticated ? getUpcomingMoviesApi(page) : Promise.resolve({ movies: [] })
      ]

      const [trending, popular, popularTv, popularPeople, topRated, upcoming] = await Promise.allSettled(calls);

      const toList = (item) => (item.status === "fulfilled" ? item.value?.movies || [] : []);
      const toShows = (item) => (item.status === "fulfilled" ? item.value?.shows || [] : []);
      const toPeople = (item) => (item.status === "fulfilled" ? item.value?.people || [] : []);

      return {
        page,
        trending: toList(trending),
        popular: toList(popular),
        popularTv: toShows(popularTv),
        popularPeople: toPeople(popularPeople),
        topRated: toList(topRated),
        upcoming: toList(upcoming),
        hasMore: [toList(trending), toList(popular), toShows(popularTv), toPeople(popularPeople), toList(topRated), toList(upcoming)].some((list) => list.length > 0)
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch explore movies"));
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const data = await getFullMovieApi(movieId);
      return {
        movie: data?.movie || null,
        trailer: data?.trailer || null,
        cast: data?.cast || [],
        mediaImages: data?.mediaImages || [],
        similar: data?.similar || []
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load movie details"));
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      if (!query.trim()) {
        return [];
      }
      const data = await searchMoviesApi(query.trim());
      return data?.movies || [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Search failed"));
    }
  }
);

const dedupeById = (movies = []) => {
  const map = new Map();
  movies.forEach((movie) => {
    if (movie?.id && !map.has(String(movie.id))) {
      map.set(String(movie.id), movie);
    }
  });
  return [...map.values()];
};

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    popular: [],
    popularTv: [],
    popularPeople: [],
    topRated: [],
    upcoming: [],
    searchResults: [],
    currentMovie: null,
    currentTrailer: null,
    currentCast: [],
    currentMediaImages: [],
    currentSimilar: [],
    searchQuery: "",
    homeLoading: true,
    exploreLoading: false,
    explorePage: 1,
    exploreHasMore: true,
    searchLoading: false,
    detailsLoading: false,
    error: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMovieError: (state) => {
      state.error = null;
    },
    clearMovieDetails: (state) => {
      state.currentMovie = null;
      state.currentTrailer = null;
      state.currentCast = [];
      state.currentMediaImages = [];
      state.currentSimilar = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeMovies.pending, (state) => {
        state.homeLoading = true;
        state.error = null;
      })
      .addCase(fetchHomeMovies.fulfilled, (state, action) => {
        state.homeLoading = false;
        state.trending = action.payload.trending;
        state.popular = action.payload.popular;
        state.popularTv = action.payload.popularTv;
        state.popularPeople = action.payload.popularPeople;
        state.topRated = action.payload.topRated;
      })
      .addCase(fetchHomeMovies.rejected, (state, action) => {
        state.homeLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchExploreMovies.pending, (state, action) => {
        const page = action.meta.arg || 1;
        if (page === 1) {
          state.exploreLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchExploreMovies.fulfilled, (state, action) => {
        state.exploreLoading = false;
        const { page, trending, popular, popularTv, popularPeople, topRated, upcoming, hasMore } = action.payload;

        state.explorePage = page;
        state.exploreHasMore = hasMore;

        if (page === 1) {
          state.trending = trending;
          state.popular = popular;
          state.popularTv = popularTv;
          state.popularPeople = popularPeople;
          state.topRated = topRated;
          state.upcoming = upcoming;
          return;
        }

        state.trending = dedupeById([...state.trending, ...trending]);
        state.popular = dedupeById([...state.popular, ...popular]);
        state.popularTv = dedupeById([...state.popularTv, ...popularTv]);
        state.popularPeople = dedupeById([...state.popularPeople, ...popularPeople]);
        state.topRated = dedupeById([...state.topRated, ...topRated]);
        state.upcoming = dedupeById([...state.upcoming, ...upcoming]);
      })
      .addCase(fetchExploreMovies.rejected, (state, action) => {
        state.exploreLoading = false;
        state.error = action.payload;
      })
      .addCase(searchMovies.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = dedupeById(action.payload);
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.currentMovie = action.payload.movie;
        state.currentTrailer = action.payload.trailer;
        state.currentCast = action.payload.cast;
        state.currentMediaImages = action.payload.mediaImages;
        state.currentSimilar = action.payload.similar;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearchQuery, clearMovieError, clearMovieDetails } = movieSlice.actions;
export default movieSlice.reducer;
