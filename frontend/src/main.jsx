import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from "axios"

axios.defaults.baseURL = "https://multi-step-form-main-b5p1.vercel.app"
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
