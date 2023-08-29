import React, { useContext } from "react";
import "./ProfileNav.css";
import { BsGrid3X3, BsBookmarks } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../../../contexts/UserContext";
const ProfileNav = ({ setTab,tab,userProfile:{userId}}) => {
  const{user}=useContext(UserContext)
  const getMargin=()=>{
    if(tab==='POSTS')
       return '0px'
    if(tab==='LIKES')
       return '33.33%'   
    if(tab==='BOOKMARKS')
       return '66.66%'   
  }

  return (
    <nav id="profile-nav">
      <ul className="all-centered nav-container">
        {user.uid===userId&&<div id="active-nav" style={
          {
            marginLeft:getMargin()
          }
        }></div>}
        <li className="all-centered">
          <button onClick={() => setTab("POSTS")}>
            <span><BsGrid3X3 /></span>
            Posts
          </button>
        </li>
        {user.uid===userId&&<li className="all-centered">
          <button onClick={() => setTab("LIKES")}>
            <span><AiOutlineHeart /></span>
            Likes
          </button>
        </li>}
        {user.uid===userId&&<li className="all-centered">
          <button onClick={() => setTab("BOOKMARKS")}>
            <span><BsBookmarks /></span>
            Saved
          </button>
        </li>}
      </ul>
    </nav>
  );
};

export default ProfileNav;
