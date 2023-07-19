import React from 'react'
import './Comments.css'
import { FeedActions, FeedHeader, MakeComment } from '../../pages/feeds/components/feed/Feed'
import User from '../user/User'
const Comments = () => {
  return (
    <div id='comments-box'>
        <section id="comment-image-section">
            <img src='https://images.pexels.com/photos/16972014/pexels-photo-16972014/free-photo-of-greenway.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt="" />
        </section>
        <section id="comments">
           <FeedHeader/>
           <section id="all-comments">
              <User/>
              <User/>
              <User/>
              <User/>
              <User/>
              <User/>
              <User/>
              <User/>
              <User/>
           </section>
           <FeedActions/>
           <MakeComment/>
        </section>
    </div>
  )
}

export default Comments