import React, { useState } from "react";
import "./Feed.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsSend, BsBookmarks, BsEmojiSmile } from "react-icons/bs";

const Feed = () => {
  const [fullCaption, setFullCaption] = useState(false);
  const myText =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus repellendus tenetur quibusdam officiis et id labore rem laudantium nobis nesciunt quam, consequatur iure, temporibus dicta explicabo cupiditate nostrum, nam eveniet.";
  return (
    <div className="feed">
      <header>
        <div className="feed-owner-image"></div>
        <div className="feed-owner-name">
          <strong>ganpat_hada</strong>
        </div>
        <div className="feed-time">3h ago</div>
      </header>
      <section className="feed-image">
        <div className="feed-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
      </section>
      <section className="feed-actions">
        <ul>
          <li>
            <AiOutlineHeart />
          </li>
          <li>
            <FaRegComment />
          </li>
          <li>
            <BsSend />
          </li>
        </ul>
        <ul>
          <li>
            <BsBookmarks />
          </li>
        </ul>
      </section>
      <div className="feed-info-wrapper">
        <p className="feed-likes">3250 likes</p>
        <div className="caption">
          <p>{fullCaption ? myText : `${myText.substring(0, 100)} .....`}</p>
          {myText.length > 100 && (
            <button
              onClick={() => setFullCaption(!fullCaption)}
              className="show-more"
            >
              show {fullCaption ? "less" : "more"}
            </button>
          )}
        </div>
        <div>
          <button className="view-all-comments-btn">vew all comments</button>
        </div>
        <div className="feed-comment-box">
          <input type="text" placeholder="add a comment" />
          <button className="post-btn">post</button>
          <button className="emoji-btn">
            <BsEmojiSmile />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
