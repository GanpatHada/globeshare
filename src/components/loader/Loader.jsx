import React from 'react'
import './Loader.css'
import loader from '../../images/loader3.svg'
const Loader = ({info}) => {
  return (
    <div id='loader' className='all-centered'>
        <div>
            <div className='all-centered' id='loader-box'>
                  <img  src={loader} alt="" />
            </div>  
            <p>{info??'Please Wait'}</p>  
        </div>    
    </div>
  )
}

export default Loader