import { useContext } from "react"
import { SearchContext } from "../contexts/SearchContext"
import { setSearchResultsAction, setSearchTextAction, startSearchLoadingAction, stopSearchLoadingAction } from "../actions/SearchAction";

export const useSearch=()=>{
    const{state,dispatch}=useContext(SearchContext);
    const{searchText,loading,searchResults}=state;

    const setSearchText=(searchText)=>setSearchTextAction(dispatch,searchText);
    const stopSearchLoading=()=>stopSearchLoadingAction(dispatch)
    const startSearchLoading=()=>startSearchLoadingAction(dispatch)
    const setSearchResults=(searchResults)=>setSearchResultsAction(dispatch,searchResults)

    return {searchText,loading,searchResults,startSearchLoading,setSearchText,stopSearchLoading,setSearchResults}
}