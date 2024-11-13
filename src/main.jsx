import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { StoreContext } from './context/StoreContext.jsx'
// import { RootStore } from '../src/store/index'

// const store = RootStore.create({})

// export const StoreContext = createContext(store)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContext>
      <CssBaseline />
      <App />
    </StoreContext>
  </StrictMode>,
)
