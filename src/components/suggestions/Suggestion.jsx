import React from 'react'
import './Suggestion.css'
import {GrFilter} from 'react-icons/gr'
import User from '../user/User'
const Suggestion = () => {
  return (
    <div id='suggestion-box'>
        <section id="filter-box" className='all-centered'>
             <span>Filter Posts</span><GrFilter/>
        </section>
        <p>suggested for you</p>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
    </div>
  )
}

export default Suggestion