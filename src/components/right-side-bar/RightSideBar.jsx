import React from "react";
import "./RightSideBar.css";
import User from "../user/User";
const UsersList = () => {
  return (
    <div id="user-list">
      
      <User type={'normal'}/>
      <User type={'normal'}/>
      <User type={'normal'}/>
      <User type={'followers'}/>
      <User type={'normal'}/>
      <User type={'following'}/>
      <User type={'normal'}/>
      <User type={'normal'}/>
      
    </div>
  );
};

const RightSideBar = () => {
  return (
    <div id="right-side-bar">
      <input type="search" placeholder="Search users" />
      <UsersList />
      
    </div>
  );
};

export default RightSideBar;
