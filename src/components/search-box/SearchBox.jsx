import React, { useEffect, useRef, useState } from "react";
import "./SearchBox.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { useSearch } from "../../hooks/useSearch";
import { fetchAllUsers } from "../../services/UserService";
import Waiting from "../waiting/Waiting";
import UserInfo from "../user-info/UserInfo";

const SearchBox = ({ searchBox, closeSearchBox }) => {
  const { searchText,loading, setSearchText, startSearchLoading,setSearchResults, stopSearchLoading ,searchResults} =
    useSearch();
  const searchRef = useRef(null);
  useClickOutsideHandler(searchRef, closeSearchBox);

  const getAllUsers = async () => {
    try {
      startSearchLoading();
      const results=await fetchAllUsers();
      setSearchResults(results)
    } catch (error) {
    } finally {
      stopSearchLoading();
    }
  };

  useEffect(() => { 
    getAllUsers();
  }, [])

  const getSearchResults=()=>{
    return searchResults.filter(result=>result.userName.toLowerCase().includes(searchText.toLowerCase()))
  }
  
  return (
    <div
      id="search-box"
      ref={searchRef}
      style={{ transform: `translateX(${searchBox ? "70px" : "-400px"})` }}
    >
      {loading &&<Waiting/>}
      <header>
        <h3>Search</h3>
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
         
        />
      </header>
      <div id="search-content">
       
        {
          getSearchResults().map(result=><div key={result.userId}><UserInfo  userId={result.userId}/></div>)
        }  
       
      </div>
    </div>
  );
};

export default SearchBox;
