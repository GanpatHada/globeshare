import React, { useContext, useRef, useState } from "react";
import "./LeftSideBar.css";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineMenu,
  AiTwotoneHome,
  AiFillHeart,
} from "react-icons/ai";
import {GoHome, GoHomeFill} from 'react-icons/go'
import {IoSearch, IoSearchOutline} from 'react-icons/io5'
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BsBookmarks, BsBookmarksFill, BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import globeshare from "../../images/globeshare.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/Firebase";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { ModalContext } from "../../contexts/ModalContext";
import gs from '../../images/gs-favicon.svg'
import defaultProfile from '../../images/profile.png'

const Menu=({handleLogout,ref,closeMenu})=>{
  const menuRef=useRef(null)
  useClickOutsideHandler(menuRef,closeMenu)
  return(
    <div id="menu-box"  ref={menuRef} >
      <ul>
        <li><button className="all-centered">Switch appearence</button></li>
        <li><button className="all-centered">Switch appearence</button></li>
        <li><button id="logout-btn" className="all-centered" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  )
}



const LeftSideBar = () => {
 
  const menuRef=useRef(null)
  const[expandMenu,setExpandMenu]=useState(false)
  const{openCreatePostModal,displayMode,openSearchModal,showSearchModal,closeSearchModal}=useContext(ModalContext)
  const location=useLocation();
  const navigate=useNavigate()
  const{user,userDetails,logOut}=useContext(UserContext)
  const [showBox, setShowBox] = useState(false);
  const closeMenu=()=>setExpandMenu(false)
  console.log(user)
  
  const isActive = (match) => {
    // Add your custom logic here to determine if the NavLink is active
    // For example, you can check the location pathname
    return match===location.pathname
    return false;
  };

  const handleMenuClick=(e)=>{
     setExpandMenu(!expandMenu)
  }


  return (
    <nav id={displayMode==='PC'?"left-nav":'left-nav-tablet'}>
      <div id={displayMode==='TABLET'?'main-logo-tablet':"main-logo"}>
        {displayMode==='PC'?<img src={globeshare} alt="..." />:<img src={gs} alt="..." />}
      </div>
      <ul>
        <li>
          <NavLink to='/'>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'} style={{fontWeight:isActive('/')&&'bold'}}>
              <div className="nav-icons">
                {isActive('/')?<GoHomeFill />:<GoHome/>}
              </div>
              {displayMode==='PC'&&<span>Home </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/' onClick={!showSearchModal?openSearchModal:closeSearchModal}>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'}>
              <div className="nav-icons">
                {isActive('/')?<IoSearch/>:<IoSearchOutline />}   
              </div>
              {displayMode==='PC'&&<span>Search </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'}>
              <div className="nav-icons">
                {isActive('/')? <MdExplore/>:<MdOutlineExplore />}
              </div>
              {displayMode==='PC'&&<span>Explore </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/' onClick={openCreatePostModal}>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'}>
              <div className="nav-icons">
                {isActive('/')?<BsPlusSquareFill/>:<BsPlusSquare />}
              </div>
              {displayMode==='PC'&&<span>Create </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user.uid}/likes`}>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'}>
              <div className="nav-icons">
                {isActive('/profile/likes')? <AiFillHeart/>:<AiOutlineHeart />}
              </div>
              {displayMode==='PC'&&<span>Likes </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user.uid}/bookmarks`}>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'}>
              <div className="nav-icons">
                {isActive('/profile/likes')?<BsBookmarksFill />:<BsBookmarks/>}
              </div>
              {displayMode==='PC'&&<span>Bookmarks </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user.uid}`}>
            <div className={displayMode==='TABLET'?'list-items-tablet':'list-items'}>
              <div id="nav-profile-box" className="nav-icons">
                <img src={userDetails?.profilePhoto?userDetails.profilePhoto:defaultProfile} alt="" />
              </div>
              {displayMode==='PC'&&<span>Profile</span>}
            </div>
          </NavLink>
        </li>
        <li>
          <div 
            className={displayMode==='TABLET'?'list-items-tablet':'list-items'}
            id="more"
            onClick={handleMenuClick}
          >
            <div className="nav-icons">
              <AiOutlineMenu />
            </div>
            {displayMode==='PC'&&<span >More</span>}
          </div>
        </li>
      </ul>
      {
        expandMenu&&<Menu handleLogout={logOut} closeMenu={closeMenu}/>
      } 
    </nav>
  );
};

export default LeftSideBar;
