import React, { useContext, useEffect } from 'react'
import './User.css'
import defaultProfile from '../../images/profile.png'
import { UserContext } from '../../contexts/UserContext'
import { toast } from 'react-toastify'
const User = ({type,userInfo}) => {
  const {userDetails,followUser,unFollowUser,followBackUser}=useContext(UserContext)

  const getUserRelationToMe=()=>{
    const{followers,following}=userDetails;
    if((!followers.includes(userInfo.userId))&&(!following.includes(userInfo.userId)))   
       return 'Follow'  
    if(followers.includes(userInfo.userId)&&following.includes(userInfo.userId))
       return 'Message'
    if(followers.includes(userInfo.userId))
       return 'Follow back'
    if(following.includes(userInfo.userId)) 
       return 'Unfollow'    
  }    

  const handleUserRelationClick=(e)=>{
     const{userId}=userInfo
     const action=e.target.innerText;
     if(action==='Follow')
        return followUser(userId)
     if(action==='Follow back')   
        return followBackUser(userId)
     if(action==='Unfollow')
        return unFollowUser(userId)  
     if(action==='Message')
        return toast.warning('Messenging services will start shortly')    
  }

  useEffect(()=>{
    getUserRelationToMe()
  })
  return (
    <div className="user-basic all-centered">
        <div className="all-centered">
          <div className="user-basic-image"><img src={userInfo.profilePic?userInfo.profilePic:defaultProfile} alt="..." /></div>
          <div className="user-basic-info">
            <h4>{userInfo.userName}</h4>
            <h6>followed by xyz</h6>
          </div>
        </div>
        <div>
          <button className='follow-btn' onClick={handleUserRelationClick}>{getUserRelationToMe()}</button>
        </div>
      </div>
  )
}

export default User