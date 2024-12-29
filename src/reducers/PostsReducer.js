import { postsHandler } from "../utils/PostsHelper"

export const initialPostsState={
    posts:[],
    loading:false,
    
}
export const postsReducer=(state,action)=>{
    switch(action.type)
    {
        case 'SET_POSTS':return{
            ...state,posts:postsHandler([...state.posts,...action.payload])
        }
        case 'START_LOADING':return{
            ...state,loading:true
        }
        case 'STOP_LOADING':return{
            ...state,loading:false
        }
    }
}