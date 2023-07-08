import React from 'react'
import './User.css'
const User = ({type}) => {
  return (
    <div className="user-basic all-centered">
        <div className="all-centered">
          <div className="user-basic-image"><img src="https://w0.peakpx.com/wallpaper/93/23/HD-wallpaper-lion-animal-close-up-king-wild-thumbnail.jpg" alt="" /></div>
          <div className="user-basic-info">
            <h4>Name</h4>
            <h6>username</h6>
          </div>
        </div>
        <div>
          {type==='normal'&& <button className='follow-btn' >follow</button>}
          {type==='followers'&& <button className='follow-btn' >block</button>}
          {type==='following'&& <button className='follow-btn' >unfollow</button>}
        </div>
      </div>
  )
}

export default User