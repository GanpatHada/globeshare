import React, { useContext, useRef, useState } from "react";
import "./LeftSideBar.css";
import globeShare from "../../images/mainLogoText.svg";
import globeShareMin from "../../images/mainLogoMin.svg";
import { NavLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Menu from "./Menu";
import { BsBookmarks, BsPlusSquare } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import defaultProfileImage from "../../images/profile.png";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";

const SideNavHeader = ({ searchBox }) => {
  return (
    <section id={"main-logo"} className={searchBox ? "all-centered" : ""}>
      <img src={searchBox ? globeShareMin : globeShare} alt="..." />
    </section>
  );
};

const MenuNav = () => {
  const [menuBox, setMenuBox] = useState(false);

  const handleMenuClick = (e) => setMenuBox(true);

  const closeMenuBox = () => setMenuBox(false);
  return (
    <ul>
      <Menu menuBox={menuBox} closeMenuBox={closeMenuBox} />
      <li
        style={{ pointerEvents: menuBox ? "none" : "auto" }}
        className="navs"
        onClick={handleMenuClick}
      >
        <span className="icons">
          <AiOutlineMenu />
        </span>
        Menu
      </li>
    </ul>
  );
};

const SideNavs = ({ openSearchBox,searchBox }) => {
  const{state}=useContext(UserContext);
  const{user:{userId}}=state;
  const{openModal}=useContext(ModalContext)
  return (
    <section id="side-navs">
      <ul>
        <NavLink to={"/"} className="navs">
          <span className="icons">
            <GoHome />
          </span>
          Home
        </NavLink>
        <li className={`navs ${searchBox&&'active-search-nav'}`} onClick={openSearchBox}>
          <span className="icons">
            <Search />
          </span>
          Search
        </li>
        <NavLink to={'/explore'} className="navs">
          <span className="icons">
            <MdOutlineExplore />
          </span>
          Explore
        </NavLink>
        <li className="navs" onClick={openModal}>
          <span className="icons">
            <BsPlusSquare />
          </span>
          Create
        </li>
        <NavLink className="navs">
          <span className="icons">
            <AiOutlineHeart />
          </span>
          Likes
        </NavLink>
        <NavLink className="navs">
          <span className="icons">
            <BsBookmarks />
          </span>
          Saved
        </NavLink>
        <NavLink className="navs" to={`/profile/${userId}`}>
          <span className="icons">
            <div id="profile">
              <img src={defaultProfileImage} alt="" />
            </div>
          </span>
          Profile
        </NavLink>
      </ul>
      <MenuNav />
    </section>
  );
};

const LeftSideBar = ({ openSearchBox, searchBox }) => {
  return (
    <div id="left-nav-wrapper">
      <nav id={"left-nav"} style={{ width: searchBox ? "70px" : "100%" }}>
        <SideNavHeader searchBox={searchBox} />
        <SideNavs openSearchBox={openSearchBox} searchBox={searchBox} />
      </nav>
    </div>
  );
};

export default LeftSideBar;
