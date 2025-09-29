import React from 'react'
import './Notifications.css'
import EmptyIcon from '../../images/emptyIcon.svg'

const Notifications = () => {
  return (
    <div id='notifications' className='app-pages'>
         <img src={EmptyIcon} alt="" />
         <p>No notifications</p>
    </div>
  )
}

export default Notifications
