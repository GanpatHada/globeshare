import React, { useState } from "react";
import "./Header.css";
import globeshareLogo from "../../images/mainLogoText.svg";
const Header = () => {
  const[headerHeight,setHeaderHeight]=useState('0px')
  return (
    <header id="top-header">
      <div id="logo-section" style={{transform:`translateY(${headerHeight})`}}>
        <img src={globeshareLogo} alt="" />
      </div>
    </header>
  );
};

export default Header;
