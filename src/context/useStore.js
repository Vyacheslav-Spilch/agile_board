import { useContext } from "react"
import { RootStoreContext } from "./StoreContext"


export const useStore = () => {
    return useContext(RootStoreContext)
} 