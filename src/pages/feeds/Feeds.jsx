import React, { useContext } from 'react'
import './Feeds.css'
import Feed from './components/feed/Feed'
import { PostContext } from '../../contexts/PostContext'
const Feeds = () => {
  const{posts}=useContext(PostContext)
  return (
    <div id='feeds-box'>
      {
        posts.map(post=><Feed key={post.postId} post={post}/>)
      }
    </div>
  )
}

export default Feeds