import React from 'react'
import './EditProfile.css'
import Waiting from '../../components/waiting/Waiting'
const EditProfile = () => {
  return (
    <div id='edit-profile-page' className='app-pages'>
      <main id="edit-profile-page-content">
      <h1>Edit Profile</h1>
         <section className="profile-image-section">
             <div className="profile-image">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ30Xba8wtKFAixbwttyB8L0skXGghce3t8NmiS-p1gGvUa5bJsoEIFq7ZLxAFklmGI7KA&usqp=CAU" alt="" />
             </div>
             <button className='primary-btn'>Change Photo</button>
         </section>
         <section className="porfile-username">
               <label htmlFor="user-name">Username</label>
                <input type="text" placeholder='username' id='user-name' />
                <p>username is not avialable</p>
         </section>
         <section className="profile-name">
              <label htmlFor="full-name">Full Name</label>
              <input type="text" id='full-name' placeholder='Enter full name' />
         </section>
         <section className="profile-bio">
               <label htmlFor="bio">Bio
               </label>
               <span>120/150</span>
               <textarea  id="bio" rows={1}></textarea>
               <p>Bio must not be more than 150 characters</p>
         </section>
         <section className="profile-website">
               <label htmlFor="website">Your Personal website</label>
               <input type="text" id='website' placeholder='Your Website link' />
         </section>
         <section className="private-account-box">
               <div className="private-account-info">
                   <h4>Private Account</h4>
                   <p>only your followers will be able to see your Posts</p>
               </div>
               <input type="checkbox" />
         </section>
         <section>
         <button id='update-profile-button' className="primary-btn">Update Profile</button>
         </section>
         
      </main>
         
    </div>
  )
}

export default EditProfile

