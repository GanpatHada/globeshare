import React, {useRef, useState } from "react";
import "./Suggestion.css";
import funnel from "../../images/funnel.svg";
import User from "../user/User";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";


const FilterModal = ({setShowFilterModal}) => {

  const closeFilterModal=()=>setShowFilterModal(false)
  const filterRef=useRef(null)
  useClickOutsideHandler(filterRef,closeFilterModal)
  return (
    <div id="filter-modal" ref={filterRef}>
      <button>Latest First</button>
      <button>Trending First</button>
    </div>
  );
};

const Suggestion = () => {
  const[showFilterModal,setShowFilterModal]=useState(false)
  return (
    <div id="suggestion-box" onClick={()=>setShowFilterModal(true)}>
      <section id="filter-box" className="all-centered">
        <span>Filter Posts</span>
        <div id="filter-image">
          <img src={funnel} alt=".." id="funnel" />
        </div>
        {showFilterModal&&<FilterModal setShowFilterModal={setShowFilterModal}/>}
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
