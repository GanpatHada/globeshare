export const initialPostDetailsState={
    postDetails:null
}
export function postDetailsReducer(state,action){
    switch(action.type)
    {
        case "SET_POST_DETAILS":return {
            ...state,postDetails:action.payload
        }
    }
}