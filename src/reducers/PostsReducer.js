import { commentHandler, likeHandler, postDeleteHanlder, postEditHandler, postsHandler, unlikeHandler } from "../utils/PostsHelper"

export const initialPostsState={
    posts:[],
    loading:false,
    
}
export const postsReducer=(state,action)=>{
    switch(action.type)
    {
        case 'SET_POSTS':return{
            ...state,posts:postsHandler(state.posts,action.payload)
        }
        case 'DELETE_POST':return {
            ...state,posts:postDeleteHanlder(state.posts,action.payload)
        }
        case 'EDIT_POST':return {
            ...state,posts:postEditHandler(state.posts,action.payload)
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
        case 'ADD_COMMENT':return{
            ...state,posts:commentHandler(state.posts,action.payload.comment,action.payload.postId)
        }
    }
}