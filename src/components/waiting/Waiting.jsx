import React from 'react'
import './Waiting.css'
import waiting from '../../images/loading2.gif'
const Waiting = () => {
  return (
    <div id='waiting' className='all-centered'>
         <div>
             <img src={waiting} alt="wating..." />
         </div>
    </div>
  )
}

export default Waiting
