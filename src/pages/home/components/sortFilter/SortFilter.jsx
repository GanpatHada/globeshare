import React, { useRef, useState } from 'react'
import './SortFilter.css'
import UserInfo from '../../../../components/user-info/UserInfo'
import { useUser } from '../../../../hooks/useUser'
import { FaSort } from "react-icons/fa6";
import useClickOutsideHandler from '../../../../hooks/useClickOutsideHandler';
const SortFilter = ({filter,setFilter}) => {
  const [filterPopup,setFilterPopup]=useState(false)
  const {user}=useUser();
  const {profilePhoto,userName,fullName}=user;  
  const popupRef=useRef(null);
  useClickOutsideHandler(popupRef,()=>setFilterPopup(false));

  const handleFilterClick=(e)=>{
   if (e.target.tagName === "LI")
    {
      setFilter(e.target.innerText);
      setFilterPopup(false)
    }
  }


  return (
    <div id='sort-filter'>
      <UserInfo userId={user.userId} userData={{profilePhoto,userName,fullName}}/>
      {filterPopup&&<div ref={popupRef} className="filters">
        <header>
          <h5>Sort posts</h5>
        </header>
        <main onClick={handleFilterClick}>
          <ul>
          <li>Trending</li>
          <li>Date Posted</li>
        </ul>
        </main>
      </div>}
      <button onClick={()=>setFilterPopup(true)}><span>{filter}</span><FaSort /></button>
    </div>
  )
}

export default SortFilter
