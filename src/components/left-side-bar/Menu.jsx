import React, { useEffect, useRef } from "react";
import "./Menu.css";
import { GoMoon, GoSun } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
const Menu = ({menuBox,closeMenuBox}) => {
  const menuRef=useRef(null);
  useClickOutsideHandler(menuRef,closeMenuBox)
  
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
        <button>
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
