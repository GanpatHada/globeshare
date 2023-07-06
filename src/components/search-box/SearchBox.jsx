import React, { useState } from 'react'
import './SearchBox.css'
const SearchBox = () => {
  const[openSearch,setOpenSearch]=useState(false);
  return (
    <div id='search-box' style={{transform:openSearch?'translateX(0px)':'translateX(-360px)'}}>

    </div>
  )
}

export default SearchBox