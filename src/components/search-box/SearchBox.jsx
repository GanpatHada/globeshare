import React, { useState } from 'react'
import './SearchBox.css'
import RightSideBar from '../right-side-bar/RightSideBar';
const SearchBox = () => {
  const[openSearch,setOpenSearch]=useState(true);
  return (
    <div id='search-box' style={{transform:openSearch?'translateX(0px)':'translateX(-360px)'}}>
        <RightSideBar/>
    </div>
  )
}

export default SearchBox