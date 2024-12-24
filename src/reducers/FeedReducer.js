export const initialFeedState={
    feedList:[],
    loading:false
}

export function feedReducer(state,action){
    switch(action.type)
    {
        case "SET_FEED"
        :return{
            ...state,feedList:action.payload
        }
        case 'START_LOADING':return{
            ...state,loading:true
        }
        case 'STOP_LOADING':return{
            ...state,loading:false
        }
    }
}