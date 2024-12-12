import React, { useContext, useRef } from 'react'
import './Feeds.css'
import Feed from './components/feed/Feed'
import { PostContext } from '../../contexts/PostContext'
const Feeds = ({explore}) => {
  
  const{posts,postFilter}=useContext(PostContext)
  const filteredPosts=()=>{
    let tempPosts=posts
    if(postFilter==='LATEST-FIRST')
    {
        tempPosts=tempPosts.sort((p1,p2)=>p2.time-p1.time)
    }
    if(postFilter==='TRENDING-FIRST')
    {
        tempPosts=tempPosts.sort((p1,p2)=>p2.likes.length-p1.likes.length)
    }
    return tempPosts
  }

  return (
    <div id='feeds-box'>
      {
        filteredPosts().map(post=><Feed key={post.postId} post={post}/>)
      }
    </div>
    
  )
}

export default Feeds