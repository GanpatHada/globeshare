import React from 'react'
import './Suggestion.css'
import funnel from '../../images/funnel.svg'
import User from '../user/User'
const Suggestion = () => {
  return (
    <div id='suggestion-box'>
        <section id="filter-box" className='all-centered'>
             <span>Filter Posts</span><img src={funnel} alt=".." id='funnel' />
        </section>
        <p>suggested for you</p>
        <User type='followers'/>
        <User type='followers'/>
        <User type='followers'/>
        <User type='followers'/>
        <User type='followers'/>
    </div>
  )
}

export default Suggestion