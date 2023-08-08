import React, {useContext, useRef, useState } from "react";
import "./Suggestion.css";
import funnel from "../../images/funnel.svg";
import User from "../user/User";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import tick from '../../images/tick.svg'
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";

const FilterModal = ({closeFilterModal}) => {

  const handleFilter=filter=>{
    setPostFilter(filter);
    toast.success(`${filter} filter has been applyed` )
  }

  const {postFilter,setPostFilter}=useContext(PostContext)
  const filterRef=useRef(null)
  useClickOutsideHandler(filterRef,closeFilterModal)
  return (
    <div id="filter-modal" ref={filterRef}  >
      <button onClick={()=>handleFilter('LATEST-FIRST')}><span>{postFilter==='LATEST-FIRST'&&<img src={tick} alt="" />}</span>Latest First</button>
      <button onClick={()=>handleFilter('TRENDING-FIRST')}><span>{postFilter==='TRENDING-FIRST'&&<img src={tick} alt="" />}</span>Trending First</button>
    </div>
  );
};

const Suggestion = () => {
  const[showFilterModal,setShowFilterModal]=useState(false)

  const closeFilterModal=()=>setShowFilterModal(false)

  const openFilterModal=()=>setShowFilterModal(true)
  return (
    <div id="suggestion-box" >
      <section id="filter-box" className="all-centered" onClick={openFilterModal}>
        <span>Filter Posts</span>
        <div id="filter-image">
          <img src={funnel} alt=".." id="funnel" />
        </div>
        {showFilterModal&&<FilterModal closeFilterModal={closeFilterModal}/>}
      </section>
      <p>suggested for you</p>
      <User type="followers" />
      <User type="followers" />
      <User type="followers" />
      <User type="followers" />
      <User type="followers" />
    </div>
  );
};

export default Suggestion;
