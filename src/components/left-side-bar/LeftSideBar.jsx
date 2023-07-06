import React, { useState } from "react";
import "./LeftSideBar.css";
import { AiFillHome, AiOutlineSearch, AiOutlineHeart ,AiOutlineMenu} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
const LeftSideBar = () => {
  const[showBox,setShowBox]=useState(false)
  return (
    <nav id="left-nav">
      <h2>globeshare</h2>
      <ul>
        <li>
          <div className="list-items">
            <div className="nav-icons">
              <AiFillHome />
            </div>
            <span>Home </span>
          </div>
        </li>
        <li>
          <div className="list-items">
            <div className="nav-icons">
              <AiOutlineSearch />
            </div>
            <span>Search </span>
          </div>
        </li>
        <li>
          <div className="list-items">
            <div className="nav-icons">
              <MdOutlineExplore />
            </div>
            <span>Explore </span>{" "}
          </div>
        </li>
        <li>
          <div className="list-items">
            <div className="nav-icons">
              <BsPlusSquare />
            </div>
            <span>Create </span>{" "}
          </div>
        </li>
        <li>
          <div className="list-items">
            <div className="nav-icons">
              <AiOutlineHeart />
            </div>
            <span>Likes </span>
          </div>
        </li>
        <li>
          <div className="list-items">
        <div id="nav-profile-box" className="nav-icons">

        </div>
            <span>Profile</span>
          </div>
        </li>
        <li>
        <div className="list-items" id="more" onClick={()=>setShowBox(!showBox)}>
            <div className="nav-icons" >
            <AiOutlineMenu/>
            </div>
            <span>More</span>
          </div>
        </li>
      </ul>  
      <div id="menu-box" style={{opacity:showBox?'1':'0'}}>
          dfgdgdgdgfdgd
      </div>
      
    </nav>
  );
};

export default LeftSideBar;
