export const setSearchTextAction=(dispatch,searchText)=>dispatch({type:'SET_SEARCH',payload:searchText})
export const setSearchResultsAction=(dispatch,searchResults)=>dispatch({type:'SET_SEARCH_RESULTS',payload:searchResults})
export const startSearchLoadingAction=(dispatch)=>dispatch({type:'START_LOADING'});
export const stopSearchLoadingAction=(dispatch)=>dispatch({type:'STOP_LOADING'});