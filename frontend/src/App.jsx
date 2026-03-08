import { RouterProvider } from "react-router-dom"
import { router } from "./app/app.routes"

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App