import { likeHandler, postsHandler, unlikeHandler } from "../utils/PostsHelper"

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
        case 'LIKE_POST':return{
            ...state,posts:likeHandler(state.posts,action.payload.userId,action.payload.postId)
        }
        case 'UNLIKE_POST':return{
            ...state,posts:unlikeHandler(state.posts,action.payload.userId,action.payload.postId)
        }
    }
}