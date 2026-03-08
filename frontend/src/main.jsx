import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import "./styles/globals.scss"
import { store } from "./app/store"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
