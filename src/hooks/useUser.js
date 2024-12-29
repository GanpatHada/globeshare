import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { followUser, saveUserDetails, stopUserLoading, unfollowUser } from "../actions/UserAction";


export const useUser=()=>{
    const{state,dispatch}=useContext(UserContext);
    const {user,loading}=state;

    const follow=(userIdToFollow)=>followUser(dispatch,userIdToFollow)

    const unFollow=(userIdToUnfollow)=>unfollowUser(dispatch,userIdToUnfollow)

    const stopLoading=()=>stopUserLoading(dispatch);

    const saveUser=(userDetails)=>saveUserDetails(dispatch,userDetails)

    return {user,loading,follow,unFollow,stopLoading,saveUser}
}