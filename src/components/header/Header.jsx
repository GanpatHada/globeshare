import React, { useState } from "react";
import "./Header.css";
import globeshareLogo from "../../images/mainLogoText.svg";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const[headerHeight,setHeaderHeight]=useState('0px')
  const navigate=useNavigate()
  return (
    <header id="top-header">
      <div onClick={()=>navigate("/")} id="logo-section" style={{transform:`translateY(${headerHeight})`}}>
        <img src={globeshareLogo} alt="" />
      </div>
    </header>
  );
};

export default Header;
