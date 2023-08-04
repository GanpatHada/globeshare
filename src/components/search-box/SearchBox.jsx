import React, { useContext, useRef, useState } from "react";
import "./SearchBox.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { ModalContext } from "../../contexts/ModalContext";

const SearchBox = () => {
  const{closeSearchModal}=useContext(ModalContext)
  const searchRef=useRef(null)
  useClickOutsideHandler(searchRef,closeSearchModal)
  return (
    <div id="search-box" ref={searchRef}>
      <header>
        <h3>Search</h3>
        <input type="search" placeholder="Search" />
      </header>
    </div>
  );
};

export default SearchBox;
