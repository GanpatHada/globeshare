import React, { useState } from "react";
import "./Feed.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsSend, BsBookmarks, BsEmojiSmile } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const FeedHeader = () => {
  return (
    <header className="feed-headers">
      <div className="feed-owner-image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99wz8XtNxseLZm4S3JSf2k2sbgMqhdrGEnQ&usqp=CAU" alt="" />
      </div>
      <div className="feed-owner-name">
        <strong>ganpat_hada</strong>
      </div>
      <div className="feed-time">3h ago</div>
    </header>
  );
};
export const FeedImage = () => {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="feed-image">
          <div className="feed-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1687813043106-2ff1331ee96b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
        </section>
      </SwiperSlide>
    </Swiper>
  );
};

export const MakeComment = () => {
  return (
    <div className="feed-comment-box">
      <input type="text" placeholder="add a comment" />
      <button className="post-btn">post</button>
      <button className="emoji-btn">
        <BsEmojiSmile />
      </button>
    </div>
  );
};

export const FeedActions = () => {
  return (
    <section className="feed-actions">
      <ul>
        <li>
          {/* <AiOutlineHeart /> */}
          <AiFillHeart id="fill-heart-icon" />
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
  );
};
const Feed = () => {
  const [fullCaption, setFullCaption] = useState(false);
  const myText =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus repellendus tenetur quibusdam officiis et id labore rem laudantium nobis nesciunt quam, consequatur iure, temporibus dicta explicabo cupiditate nostrum, nam eveniet.";
  return (
    <div className="feed">
      <FeedHeader />
      <FeedImage />
      <FeedActions />
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
        <MakeComment />
      </div>
    </div>
  );
};

export default Feed;
