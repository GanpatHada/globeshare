import React from 'react'
import Posts from './components/posts/Posts'
import './Home.css'
import Suggestions from './components/suggestions/Suggestions'
const Home = () => {
  return (
    <div className='app-pages' id='home-page'>
         <Posts/>
         <Suggestions/>
    </div>
  )
}

export default Home

