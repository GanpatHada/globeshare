import React, { useContext, useEffect, useRef, useState } from "react";
import "./SearchBox.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { ModalContext } from "../../contexts/ModalContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import User from '../../components/user/User'
const SearchBox = () => {
  const { closeSearchModal } = useContext(ModalContext);
  const searchRef = useRef(null);
  useClickOutsideHandler(searchRef, closeSearchModal);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      let tempUsers=[]
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
         tempUsers.push({userId:doc.id,...doc.data()})
      });
      setUsers(tempUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers=()=>{
    return users.filter(({userName})=>userName.toLowerCase().includes(searchValue.toLowerCase()))
  }

  useEffect(() => {
    getAllUsers();
    return () => {

    };
  }, []);

  return (
    <div id="search-box" ref={searchRef}>
      <header>
        <h3>Search</h3>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
        />
      </header>
      {searchValue.length>0&&<div id="search-content">
      {getUsers().map(eachUser=>{
        return(
          <User userInfo={eachUser} noRelation/>
        )
      })}
      </div>}
      
    </div>
  );
};

export default SearchBox;
