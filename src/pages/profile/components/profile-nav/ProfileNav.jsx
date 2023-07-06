import React from 'react'
import './ProfileNav.css'
import { BsFillGrid3X3GapFill,BsFillBookmarksFill } from "react-icons/bs";
import { AiOutlineHeart } from 'react-icons/ai';
const ProfileNav = () => {
  return (
    <nav id="profile-nav">
       
        <ul className='all-centered'>
        <div id="active-nav"></div>
            <li className='all-centered'> <span><BsFillGrid3X3GapFill/></span> Posts</li>
            <li className='all-centered'> <span> <AiOutlineHeart /></span>Likes</li>
            <li className='all-centered'> <span> <BsFillBookmarksFill/></span>Saved</li>
        </ul>
      </nav>
  )
}

export default ProfileNav