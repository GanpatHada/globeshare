import { followUser, removeUser, unfollowUser } from "../../services/UserService"
import {useUser} from '../../hooks/useUser'
import { toast } from "react-toastify"

export const FollowButton=({targetUser})=>{
    const {user,followUserOnClient}=useUser();
    const handleFollowUser=async()=>{
       try {
        await followUser(user.userId,targetUser);
        followUserOnClient(targetUser)
       } catch (error) {
        toast.error('unable to perform')
        console.log(error)
       }
    }
    return <button onClick={handleFollowUser} className="primary-btn">Follow</button>
}
export const FollowingButton=({targetUser})=>{
    const {user,unFollowUserOnClient}=useUser();
    const handleUnFollowUser=async()=>{
       try {
        await unfollowUser(user.userId,targetUser);
        unFollowUserOnClient(targetUser)
       } catch (error) {
        toast.error('unable to perform')
        console.log(error)
       }
    }
    return <button onClick={handleUnFollowUser} className="secondary-btn">Following</button>
}
export const RemoveButton=({targetUser})=>{
     const {user,removeFollowerOnClient}=useUser();
     const handleRemoveFollower=async()=>{
       try {
        await removeUser(user.userId,targetUser);
        removeFollowerOnClient(targetUser)
       } catch (error) {
        toast.error('unable to perform')
        console.log(error)
       }
    }
    return <button onClick={handleRemoveFollower} className="secondary-btn">Remove</button>
}
