import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { RootStore } from './store/index.js'
// import { RootStore } from '../src/store/index'

// const store = RootStore.create({})

// export const StoreContext = createContext(store)

const store = RootStore.create({})

export const StoreContext = createContext(store)



createRoot(document.getElementById('root')).render(
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <App />
    </StoreContext.Provider>
,
)
