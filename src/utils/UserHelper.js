export function isUserInMyFollowing(myDetails,toUser){
    const{following}=myDetails;
    return following.includes(toUser)
}

export function isUserInMyFollowers(myDetails,toUser){
    const{followers}=myDetails;
    return followers.includes(toUser)
}


export function getUserRelation(myDetails,toUser){
    
    if(following.includes(toUser))
        return 'Follow'
    else
    {
        if(!followers.includes(toUser))
    }
}