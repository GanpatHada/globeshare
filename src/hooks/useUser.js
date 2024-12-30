import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { addToBookmark, followUser, removeFromBookmark, saveUserDetails, stopUserLoading, unfollowUser } from "../actions/UserAction";


export const useUser=()=>{
    const{state,dispatch}=useContext(UserContext);
    const {user,loading}=state;

    const follow=(userIdToFollow)=>followUser(dispatch,userIdToFollow)

    const unFollow=(userIdToUnfollow)=>unfollowUser(dispatch,userIdToUnfollow)

    const addToBookmarkOnClient=(postId)=>addToBookmark(dispatch,postId);
    const removeFromBookmarkOnClient=(postId)=>removeFromBookmark(dispatch,postId);

    const stopLoading=()=>stopUserLoading(dispatch);

    const saveUser=(userDetails)=>saveUserDetails(dispatch,userDetails)

    return {user,loading,follow,unFollow,stopLoading,saveUser,addToBookmarkOnClient,removeFromBookmarkOnClient}
}