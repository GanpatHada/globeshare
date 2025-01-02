export function isUserInMyFollowing(myDetails,toUser){
    const {following}=myDetails;
    return following.includes(toUser)
}
export function isUserInMyFollowers(myDetails,toUser){
    const{followers}=myDetails;
    return followers.includes(toUser)
}
export function getActionForUser(user,targetUser)
{
    const isFollower=isUserInMyFollowers(user,targetUser);
    const isFollowing=isUserInMyFollowing(user,targetUser);
    if(isFollowing && isFollower)
        return ['Unfollow','Remove']
    if(!isFollowing && !isFollower)
        return ['Follow'] 
    if(isFollower && !isFollowing)
        return ['Followback','Remove']
    if(!isFollower && isFollowing)
        return ['Unfollow']
    
}
export function addToBookmarkHandler(user,postId)
{
    const updatedUser={...user,bookmarks:[...user.bookmarks,postId]}
    return updatedUser;
}
export function removeFromBookmarkHandler(user,postId)
{
    const updatedUser={...user,bookmarks:user.bookmarks.filter(bookmark=>bookmark!==postId)};
    return updatedUser;
}

export function followUserHandler(user,userToFollow)
{
    const updatedUser={...user,following:[...user.following,userToFollow]}
    return updatedUser
}

export function unfollowUserHandler(user,userToUnfollow)
{
    const updatedUser={...user,following:user.following.filter(followingUser=>followingUser!==userToUnfollow)}
    return updatedUser;
}