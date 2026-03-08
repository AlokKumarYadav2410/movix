import { createBrowserRouter } from "react-router-dom"

import Layout from "../components/layout/Layout"
import Home from "../pages/Home/Home"
// import Explore from "../pages/Explore/Explore"
// import MovieDetails from "../pages/MovieDetails/MovieDetails"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
    //   {
    //     path: "explore",
    //     element: <Explore />
    //   },
    //   {
    //     path: "movie/:id",
    //     element: <MovieDetails />
    //   }
    ]
  }
])