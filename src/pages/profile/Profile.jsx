import React from 'react'
import './Profile.css'
import ProfileHeader from './components/profile-header/ProfileHeader'
import ProfileNav from './components/profile-nav/ProfileNav'
import Posts from './components/posts/Posts'

const Profile = () => {
  return (
    <div id='profile-page'>
        <ProfileHeader/>
        <ProfileNav/>
        <Posts/>
        
    </div>
  )
}

export default Profile