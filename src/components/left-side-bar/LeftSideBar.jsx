import { useState } from "react";
import "./LeftSideBar.css";
import globeShare from "../../images/mainLogoText.svg";
import globeShareMin from "../../images/mainLogoMin.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Menu from "./Menu";
import { BsPlusSquare } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import defaultProfileImage from "../../images/profile.png";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../hooks/useModal";

const SideNavHeader = ({ searchBox }) => {
  const navigate = useNavigate();
  return (
    <section
      onClick={() => navigate("/")}
      id={"main-logo"}
      className={searchBox ? "all-centered" : ""}
    >
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

const SideNavs = ({ openSearchBox, searchBox }) => {
  const {
    user: { profilePhoto, userId },
  } = useUser();
  const { openModal } = useModal();

  return (
    <section id="side-navs">
      <ul>
        <li>
          <NavLink to={"/"} className="navs">
            <span className="icons">
              <GoHome />
            </span>
            Home
          </NavLink>
        </li>
        <li
          className={`navs ${searchBox && "active-search-nav"}`}
          onClick={openSearchBox}
        >
          <Link className="navs">
            <span className="icons">
              <IoSearch />
            </span>
            Search
          </Link>
        </li>
        <li>
          <NavLink to={"/explore"} className="navs">
            <span className="icons">
              <MdOutlineExplore />
            </span>
            Explore
          </NavLink>
        </li>
        <li className="navs" onClick={() => openModal(null, "CREATE_POST")}>
         
            <span className="icons">
              <BsPlusSquare />
            </span>
            Create
          
        </li>
        <li>
          <NavLink to={"/notifications"} className="navs">
            <span className="icons">
              <AiOutlineHeart />
            </span>
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink className="navs" to={`/profile/${userId}`}>
            <span className="icons">
              <div id="profile">
                <img src={profilePhoto?.url ?? defaultProfileImage} alt="" />
              </div>
            </span>
            Profile
          </NavLink>
        </li>
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
