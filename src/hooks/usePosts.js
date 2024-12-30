import { useContext } from "react"
import { PostsContext } from "../contexts/PostsContext"
import { likePost, savePosts,startLoading,stopLoading, unlikePost } from "../actions/PostsAction";

export const usePosts=()=>{
    const{state,dispatch}=useContext(PostsContext);
    const{posts,loading}=state;

    const addPosts=(newPosts)=>savePosts(dispatch,newPosts)

    const startLoadingPosts=()=>startLoading(dispatch)
    const stopLoadingPosts=()=>stopLoading(dispatch)

    const likePostOnClient=(userId,postId)=>likePost(dispatch,userId,postId)
    const unlikePostOnClient=(userId,postId)=>unlikePost(dispatch,userId,postId)

    return {posts,loading,addPosts,startLoadingPosts,stopLoadingPosts,likePostOnClient,unlikePostOnClient}
}