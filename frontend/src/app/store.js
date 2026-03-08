import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/redux/authSlice"
import movieReducer from "../features/movies/redux/movieSlice"
import userReducer from "../features/user/redux/userSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		movies: movieReducer,
		user: userReducer
	}
})