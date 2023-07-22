import React from 'react'
import './PageNotFound.css'
import { useNavigate } from 'react-router-dom'
const PageNotFound = () => {
  const navigate=useNavigate()
  return (
    <div  className='all-centered' id='page-not-found-page'>
        <div>
            <h1 className='all-centered'>Error : <span>&nbsp;404</span></h1>
            <h5 className='all-centered'>Opps ! Page Not Found</h5>
            <p className='all-centered'>The page you are looking for does not seems to exist</p>
            <div className='all-centered'> 
                <button onClick={()=>navigate('/')}>Go Back</button>
            </div>
        </div>
        
    </div>
  )
}

export default PageNotFound