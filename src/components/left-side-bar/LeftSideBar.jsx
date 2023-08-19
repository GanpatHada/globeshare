import React, { useContext, useRef, useState } from "react";
import "./LeftSideBar.css";
import { AiOutlineHeart, AiOutlineMenu, AiFillHeart } from "react-icons/ai";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import {
  BsBookmarks,
  BsBookmarksFill,
  BsPlusSquare,
  BsPlusSquareFill,
} from "react-icons/bs";
import globeshare from "../../images/globeshare.svg";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { ModalContext } from "../../contexts/ModalContext";
import gs from "../../images/gs-favicon.svg";
import defaultProfile from "../../images/profile.png";

const Menu = ({ handleLogout, ref, closeMenu }) => {
  const menuRef = useRef(null);
  useClickOutsideHandler(menuRef, closeMenu);
  return (
    <div id="menu-box" ref={menuRef}>
      <ul>
        <li>
          <button className="all-centered">Switch appearence</button>
        </li>
        <li>
          <button className="all-centered">Switch appearence</button>
        </li>
        <li>
          <button
            id="logout-btn"
            className="all-centered"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

const LeftSideBar = () => {
  const [expandMenu, setExpandMenu] = useState(false);
  const { openCreatePostModal, displayMode, openSearchModal, showSearchModal } =
    useContext(ModalContext);
  const location = useLocation();
  const { user, userDetails, logOut } = useContext(UserContext);
  const { showCreatePostModal, showEditPostModal } = useContext(ModalContext);
  const closeMenu = () => setExpandMenu(false);
  

  const isActive = (match) => {
    if (match === "createPost") return showCreatePostModal || showEditPostModal;
    if (match === "search") return showSearchModal;
    return match === location.pathname;
  };

  const handleMenuClick = (e) => {
    setExpandMenu(!expandMenu);
  };

  const getNavLinkClasses = (activePath) => {
    let classes = [];
    if (displayMode === "TABLET") classes.push("list-items-tablet");
    else classes.push("list-items");
    if (isActive(activePath)) classes.push("nav-active");
    return classes.join(" ");
  };

  return (
    <nav id={displayMode === "PC" ? "left-nav" : "left-nav-tablet"}>
      <div id={displayMode === "TABLET" ? "main-logo-tablet" : "main-logo"}>
        {displayMode === "PC" ? (
          <img src={globeshare} alt="..." />
        ) : (
          <img src={gs} alt="..." />
        )}
      </div>
      <ul>
        <li>
          <NavLink to="/">
            <div
              className={getNavLinkClasses("/")}
              style={{ fontWeight: isActive("/") && "bold" }}
            >
              <div className="nav-icons">
                {isActive("/") ? <GoHomeFill /> : <GoHome />}
              </div>
              {displayMode === "PC" && <span>Home </span>}
            </div>
          </NavLink>
        </li>
        <li onClick={openSearchModal}>
          <div
            className={getNavLinkClasses("search")}
            style={{ border: isActive("search") && "1px solid lightgray" }}
          >
            <div className="nav-icons">
              {isActive("search") ? <IoSearch /> : <IoSearchOutline />}
            </div>
            {displayMode === "PC" && <span>Search </span>}
          </div>
        </li>
        <li>
          <NavLink to="/explore">
            <div className={getNavLinkClasses("/explore")}>
              <div className="nav-icons">
                {isActive("/explore") ? <MdExplore /> : <MdOutlineExplore />}
              </div>
              {displayMode === "PC" && <span>Explore </span>}
            </div>
          </NavLink>
        </li>
        <li onClick={openCreatePostModal}>
          <div className={getNavLinkClasses("createPost")}>
            <div className="nav-icons">
              {isActive("createPost") ? <BsPlusSquareFill /> : <BsPlusSquare />}
            </div>
            {displayMode === "PC" && <span>Create </span>}
          </div>
        </li>
        <li>
          <NavLink to={`/profile/${user.uid}/likes`}>
            <div className={getNavLinkClasses(`/profile/${user.uid}/likes`)}>
              <div className="nav-icons">
                {isActive(`/profile/${user.uid}/likes`) ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </div>
              {displayMode === "PC" && <span>Likes </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user.uid}/bookmarks`}>
            <div
              className={getNavLinkClasses(`/profile/${user.uid}/bookmarks`)}
            >
              <div className="nav-icons">
                {isActive(`/profile/${user.uid}/bookmarks`) ? (
                  <BsBookmarksFill />
                ) : (
                  <BsBookmarks />
                )}
              </div>
              {displayMode === "PC" && <span>Bookmarks </span>}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user.uid}`}>
            <div className={getNavLinkClasses(`/profile/${user.uid}`)}>
              <div id="nav-profile-box" className="nav-icons">
                <img src={userDetails?.profilePhoto ?? defaultProfile} alt="" />
              </div>
              {displayMode === "PC" && <span>Profile</span>}
            </div>
          </NavLink>
        </li>
        <li>
          <div
            className={
              displayMode === "TABLET" ? "list-items-tablet" : "list-items"
            }
            id="more"
            onClick={handleMenuClick}
          >
            <div className="nav-icons">
              <AiOutlineMenu />
            </div>
            {displayMode === "PC" && <span>More</span>}
          </div>
        </li>
      </ul>
      {expandMenu && <Menu handleLogout={logOut} closeMenu={closeMenu} />}
    </nav>
  );
};

export default LeftSideBar;
