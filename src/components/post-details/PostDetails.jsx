import React, { useContext, useRef } from "react";
import "./PostDetails.css";
import { PostDetailsContext } from "../../contexts/PostDetailsContext";
import useOutsideClickHandler from "../../hooks/useClickOutsideHandler";
import { MdMoreHoriz } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const PostComment = () => {
  return (
    <div className="post-comment">
      <div className="user-profile"></div>
      <div className="comment-info">
        <h5>username</h5>
        <p>
          comment is this Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Vel eum esse, voluptas rem non quos accusamus unde quo iste
          earum?
        </p>
      </div>
    </div>
  );
};

const ImageSlider = ({ images }) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {images.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <img src={image} alt="No image found" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const PostDetails = ({ closeModal }) => {
  const postDetailsRef = useRef(null);
  const { state, dispatch } = useContext(PostDetailsContext);
  const { images, user, likes } = state.postDetails;
  useOutsideClickHandler(postDetailsRef, closeModal);
  return (
    <div id="post-details" ref={postDetailsRef}>
      <section className="image-section">
        <ImageSlider images={images} />
      </section>
      <section className="post-info-section">
        <header className="post-header">
          <div>
            <div className="user-image"></div>
            <p className="user-name">{user}</p>
          </div>
          <button className="all-centered">
            <MdMoreHoriz />
          </button>
        </header>
        <main className="post-comments">
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
          <PostComment />
        </main>
        <div className="post-actions">
          <div>
            <button className="all-centered">
              <IoMdHeartEmpty />
            </button>
            <button className="all-centered">
              <BsChat />
            </button>
            <button className="all-centered">
              <BsSend />
            </button>
          </div>
          <div>
            <button className="all-centered">
              <FaRegBookmark />
            </button>
          </div>
        </div>
        <div className="likes-count">
          <h5>{likes.length} likes</h5>
        </div>
        <div className="post-time">
          <p>5 hours ago</p>
        </div>
        <footer className="do-comment">
          <button className="emoji-button all-centered">
            <BsEmojiSmile />
          </button>
          <input
            type="text"
            placeholder="Add a comment"
            className="comment-input"
          />
          <button className="post-comment-button">Post</button>
        </footer>
      </section>
    </div>
  );
};

export default PostDetails;
