import React, {useRef } from "react";
import "./Menu.css";
import { AiOutlineLogout } from "react-icons/ai";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { logout } from "../../services/LoginService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
const Menu = ({menuBox,closeMenuBox}) => {
  const{logoutUser,startLoading}=useUser()
  const menuRef=useRef(null);
  useClickOutsideHandler(menuRef,closeMenuBox);
  const navigate=useNavigate(null);

  const handleLogout=async()=>{
    try {
      startLoading()
      await logout();
      logoutUser()
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
