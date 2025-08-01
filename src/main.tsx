import { GlobalComponentProvider } from "./components/GlobalProvider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <GlobalComponentProvider>
            <App />
        </GlobalComponentProvider>
    </StrictMode>
)
