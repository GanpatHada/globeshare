import { createContext, useReducer } from "react";
import { initialSearchState, searchReducer } from "../reducers/SearchReducer";

export const SearchContext=createContext();
export const SearchProvider=({children})=>{
    const[state,dispatch]=useReducer(searchReducer,initialSearchState)
    return <SearchContext.Provider value={{state,dispatch}}>
        {children}
    </SearchContext.Provider>
}