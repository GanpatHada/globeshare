import React from "react";
import "./RightSideBar.css";
const UsersList = () => {
  return (
    <div id="user-list">
      
      <div className="user-basic all-centered">
        <div className="all-centered">
          <div className="user-basic-image"><img src="https://w0.peakpx.com/wallpaper/93/23/HD-wallpaper-lion-animal-close-up-king-wild-thumbnail.jpg" alt="" /></div>
          <div className="user-basic-info">
            <h4>Name</h4>
            <h6>username</h6>
          </div>
        </div>
        <div>
          <button className='follow-btn' >follow</button>
        </div>
      </div>
      
      <div className="user-basic all-centered">
        <div className="all-centered">
          <div className="user-basic-image"><img src="https://w0.peakpx.com/wallpaper/93/23/HD-wallpaper-lion-animal-close-up-king-wild-thumbnail.jpg" alt="" /></div>
          <div className="user-basic-info">
            <h4>Name</h4>
            <h6>username</h6>
          </div>
        </div>
        <div>
          <button className='follow-btn' >follow</button>
        </div>
      </div>
      
      <div className="user-basic all-centered">
        <div className="all-centered">
          <div className="user-basic-image"><img src="https://w0.peakpx.com/wallpaper/93/23/HD-wallpaper-lion-animal-close-up-king-wild-thumbnail.jpg" alt="" /></div>
          <div className="user-basic-info">
            <h4>Name</h4>
            <h6>username</h6>
          </div>
        </div>
        <div>
          <button className='follow-btn' >follow</button>
        </div>
      </div>
      
      <div className="user-basic all-centered">
        <div className="all-centered">
          <div className="user-basic-image"><img src="https://w0.peakpx.com/wallpaper/93/23/HD-wallpaper-lion-animal-close-up-king-wild-thumbnail.jpg" alt="" /></div>
          <div className="user-basic-info">
            <h4>Name</h4>
            <h6>username</h6>
          </div>
        </div>
        <div>
          <button className='follow-btn' >follow</button>
        </div>
      </div>
      
    </div>
  );
};

const RightSideBar = () => {
  return (
    <div id="right-side-bar">
      <input type="search" placeholder="Search users across globeshare" />
      <UsersList />
    </div>
  );
};

export default RightSideBar;
