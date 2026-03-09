import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi, logoutUserApi, registerUserApi } from "../api/auth.api";
import { getErrorMessage } from "../../../shared/api/client";

const USER_STORAGE_KEY = "movix_user";

const loadStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistUser = (user) => {
  if (!user) {
    localStorage.removeItem(USER_STORAGE_KEY);
    return;
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(payload);
      return data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Registration failed"));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(payload);
      return data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi();
      return true;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Logout failed"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadStoredUser(),
    isLoading: false,
    error: null
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    forceLogout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      persistUser(null);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        persistUser(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        persistUser(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
        persistUser(null);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAuthError, forceLogout } = authSlice.actions;
export default authSlice.reducer;
