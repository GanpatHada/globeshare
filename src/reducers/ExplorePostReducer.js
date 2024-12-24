export const initialExplorePostState={
    posts:[],
    loading:false
}

export function explorePostReducer(state,action){
    switch(action.type)
    {
        case "SET_POSTS":return {
            ...state,posts:action.payload
        }
        case "START_LOADING":return{
            ...state,loading:true
        }
        case "STOP_LOADING":return{
            ...state,loading:false
        }
        
    }
}