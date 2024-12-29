import { useContext } from "react"
import { PostsContext } from "../contexts/PostsContext"
import { savePosts,startLoading,stopLoading } from "../actions/PostsAction";

export const usePosts=()=>{
    const{state,dispatch}=useContext(PostsContext);
    const{posts,loading}=state;

    const addPosts=(posts)=>savePosts(dispatch,posts)

    const startLoadingPosts=()=>startLoading(dispatch)
    const stopLoadingPosts=()=>stopLoading(dispatch)

    return {posts,loading,addPosts,startLoadingPosts,stopLoadingPosts}
}