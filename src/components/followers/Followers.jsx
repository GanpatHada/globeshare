import React from 'react'
import './Followers.css'
import User from '../user/User'
const Followers = ({type}) => {
    type='following'
  return (
    <div id='connections-modal'>
        <h4>{type}</h4>
        <div>
            <User type={type}/>
            <User type={type}/>
            <User type={type}/>
            <User type={type}/>
            <User type={type}/>
            <User type={type}/>
            <User type={type}/>
        </div>
    </div>
  )
}

export default Followers