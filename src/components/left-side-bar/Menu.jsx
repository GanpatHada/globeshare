import React, { useContext, useEffect, useRef } from "react";
import "./Menu.css";
import { GoMoon, GoSun } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { logout } from "../../services/LoginService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
const Menu = ({menuBox,closeMenuBox}) => {
  const{state,dispatch}=useContext(UserContext)
  const menuRef=useRef(null);
  useClickOutsideHandler(menuRef,closeMenuBox);
  const navigate=useNavigate(null);

  const handleLogout=async()=>{
    try {
      logout();
      dispatch({type:'REMOVE_USER'})
      navigate("/auth")
    } catch (error) {
      toast.error('Something went wrong while logout')
    }
  }
  
  return (
    <div id="menu-box" ref={menuRef} style={{display:menuBox?'flex':'none'}}>
      {/* <li>
        <button>
          <span>
            <GoMoon />
          </span>
          Switch appearance
        </button>
      </li> */}
      <hr />
      <li>
        <button onClick={handleLogout}>
          <span>
            <AiOutlineLogout />
          </span>{" "}
          Log out
        </button>
      </li>
    </div>
  );
};

export default Menu;
