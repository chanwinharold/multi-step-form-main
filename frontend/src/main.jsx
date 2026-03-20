import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from "axios"

axios.defaults.baseURL = "https://multi-step-form-main-iav4.onrender.com"
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
