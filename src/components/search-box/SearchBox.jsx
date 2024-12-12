import React, {useRef, useState } from "react";
import "./SearchBox.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";

;
const SearchBox = ({searchBox,closeSearchBox}) => {
  const [searchValue, setSearchValue] = useState("");

  const searchRef=useRef(null)
  useClickOutsideHandler(searchRef,closeSearchBox);
  return (
    <div id="search-box" ref={searchRef} style={{transform:`translateX(${searchBox?'70px':'-400px'})`}}>
      <header>
        <h3>Search</h3>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
        />
      </header>
      {searchValue.length > 0 && (
        <div id="search-content">
          
        </div>
      )}
    </div>
  );
};

export default SearchBox;
