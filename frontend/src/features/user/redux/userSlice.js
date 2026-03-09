import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteApi,
  addHistoryApi,
  clearHistoryApi,
  getFavouritesApi,
  getHistoryApi,
  removeFavouriteApi,
  removeHistoryItemApi
} from "../api/user.api";
import { getErrorMessage } from "../../../shared/api/client";

const dedupeHistoryByMovieId = (history = []) => {
  const seen = new Set();
  return history.filter((item) => {
    const key = String(item?.movieId || "");
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const fetchFavourites = createAsyncThunk(
  "user/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavouritesApi();
      return data?.favourites || [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch favourites"));
    }
  }
);

export const addFavourite = createAsyncThunk(
  "user/addFavourite",
  async (movieId, { rejectWithValue }) => {
    try {
      await addFavouriteApi(movieId);
      return String(movieId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to add favourite"));
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "user/removeFavourite",
  async (movieId, { rejectWithValue }) => {
    try {
      await removeFavouriteApi(movieId);
      return String(movieId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to remove favourite"));
    }
  }
);

export const fetchHistory = createAsyncThunk(
  "user/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getHistoryApi();
      return data?.history || [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch history"));
    }
  }
);

export const addHistory = createAsyncThunk(
  "user/addHistory",
  async (movieId, { rejectWithValue }) => {
    try {
      const data = await addHistoryApi(movieId);
      return data?.history;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to save history"));
    }
  }
);

export const clearHistory = createAsyncThunk(
  "user/clearHistory",
  async (_, { rejectWithValue }) => {
    try {
      await clearHistoryApi();
      return true;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to clear history"));
    }
  }
);

export const removeHistoryItem = createAsyncThunk(
  "user/removeHistoryItem",
  async (movieId, { rejectWithValue }) => {
    try {
      await removeHistoryItemApi(movieId);
      return String(movieId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to remove history item"));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    favourites: [],
    history: [],
    loading: false,
    error: null
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        const exists = state.favourites.some((item) => item.movieId === action.payload);
        if (!exists) {
          state.favourites.unshift({ movieId: action.payload });
        }
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter((item) => item.movieId !== action.payload);
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = dedupeHistoryByMovieId(action.payload);
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.history = dedupeHistoryByMovieId([action.payload, ...state.history]).slice(0, 20);
      })
      .addCase(clearHistory.fulfilled, (state) => {
        state.history = [];
      })
      .addCase(removeHistoryItem.fulfilled, (state, action) => {
        state.history = state.history.filter((item) => String(item.movieId) !== action.payload);
      })
      .addMatcher(
        (action) => action.type.startsWith("user/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  }
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
