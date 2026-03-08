import { createBrowserRouter } from "react-router-dom"

import Layout from "../shared/components/Layout/Layout"
import Home from "../features/movies/pages/Home"
import Explore from "../features/movies/pages/Explore"
import MovieDetails from "../features/movies/pages/MovieDetails"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Favourites from "../features/user/pages/Favourites"
import History from "../features/user/pages/History"
import RequireAuth from "../shared/components/RequireAuth"
import GuestOnly from "../shared/components/GuestOnly"
import RequireAdmin from "../shared/components/RequireAdmin"
import AdminDashboard from "../features/admin/pages/AdminDashboard"
import NotFoundPage from "../shared/components/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "movies/:movieId", element: <MovieDetails /> },
      {
        path: "favourites",
        element: (
          <RequireAuth>
            <Favourites />
          </RequireAuth>
        )
      },
      {
        path: "history",
        element: (
          <RequireAuth>
            <History />
          </RequireAuth>
        )
      },
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        )
      },
      {
        path: "login",
        element: (
          <GuestOnly>
            <Login />
          </GuestOnly>
        )
      },
      {
        path: "register",
        element: (
          <GuestOnly>
            <Register />
          </GuestOnly>
        )
      },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
])