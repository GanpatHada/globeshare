export const initialSearchState={
    searchText:'',
    loading:false,
    searchResults:[],

}

export function searchReducer(state,action){
    switch(action.type)
    {
        case 'SET_SEARCH':return{
            ...state,searchText:action.payload
        }
        case 'START_LOADING':return {
            ...state,loading:true
        }
        case 'STOP_LOADING':return {
            ...state,loading:false
        }
        case 'SET_SEARCH_RESULTS':return {
            ...state,searchResults:action.payload
        }
        case 'RESET_SEARCH':return {...initialSearchState}

        default:return {...state}
    }
}