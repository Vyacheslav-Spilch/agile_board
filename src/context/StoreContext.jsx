import { createContext } from 'react'
import { RootStore } from '../store'

const store = RootStore.create({})

export const RootStoreContext =  createContext(store)


export const StoreContext = ({children}) => {
    return (
        <RootStoreContext.Provider value={store}>
            {children}
        </RootStoreContext.Provider>
    )
}