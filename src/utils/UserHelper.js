export function isUserInMyFollowing(myDetails,toUser){
    const{following}=myDetails;
    return following.includes(toUser)
}

export function isUserInMyFollowers(myDetails,toUser){
    const{followers}=myDetails;
    return followers.includes(toUser)
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