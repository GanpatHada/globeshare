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
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import globeshare from "../../images/globeshare.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/Firebase";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { ModalContext } from "../../contexts/ModalContext";
const LeftSideBar = () => {
  const{openCreatePostModal}=useContext(ModalContext)
  const location=useLocation();
  const navigate=useNavigate()
  const{user}=useContext(UserContext)

  const [showBox, setShowBox] = useState(false);

  const handleLogout=async()=>{
    try{
      await signOut(auth);
      toast.success('Logged out successfully')
      navigate('/login')
    }
    catch(error){
      console.log(error)
    }
  }
  const Menu=()=>{
    const menuRef=useRef(null)
    return(
      <div ref={menuRef} id="menu-box" style={{ visibility: showBox ? 'visible' : 'hidden',opacity:showBox ? '1':'0' }}>
        <ul>
          <li><button className="all-centered">Switch appearence</button></li>
          <li><button className="all-centered">Switch appearence</button></li>
          <li><button id="logout-btn" className="all-centered" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    )
  }
  const isActive = (match) => {
    // Add your custom logic here to determine if the NavLink is active
    // For example, you can check the location pathname
    return location.pathname === match;
  };

  return (
    <nav id="left-nav">
      <div id="main-logo">
        <img src={globeshare} alt="..." />
      </div>
      <ul>
        <li>
          <NavLink to='/'>
            <div className="list-items" style={{fontWeight:isActive('/')&&'bold'}}>
              <div className="nav-icons">
                {isActive('/')?<GoHomeFill />:<GoHome/>}
              </div>
              <span>Home </span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/'>
            <div className="list-items">
              <div className="nav-icons">
                {isActive('/')?<IoSearch/>:<IoSearchOutline />}   
              </div>
              <span>Search </span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <div className="list-items">
              <div className="nav-icons">
                {isActive('/')? <MdExplore/>:<MdOutlineExplore />}
              </div>
              <span>Explore </span>{" "}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/' onClick={openCreatePostModal}>
            <div className="list-items">
              <div className="nav-icons">
                {isActive('/')?<BsPlusSquareFill/>:<BsPlusSquare />}
              </div>
              <span>Create </span>{" "}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/likes`}>
            <div className="list-items">
              <div className="nav-icons">
                {isActive('/profile/likes')? <AiFillHeart/>:<AiOutlineHeart />}
              </div>
              <span>Likes </span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile`}>
            <div className="list-items">
              <div id="nav-profile-box" style={{border:isActive&&'1px solid black'}} className="nav-icons">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99wz8XtNxseLZm4S3JSf2k2sbgMqhdrGEnQ&usqp=CAU" alt="" />
              </div>
              <span>Profile</span>
            </div>
          </NavLink>
        </li>
        <li>
          <div
            className="list-items"
            id="more"
            onClick={() => setShowBox(!showBox)}
          >
            <div className="nav-icons">
              <AiOutlineMenu />
            </div>
            <span>More</span>
          </div>
        </li>
      </ul>
      <Menu/>
    </nav>
  );
};

export default LeftSideBar;
