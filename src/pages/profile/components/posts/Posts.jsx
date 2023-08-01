import React from "react";
import Icon from "../../../../components/copy/Copy";
import "./Posts.css";
const Posts = ({ myPost }) => {
  console.log(myPost)  
  return (
    <section id="user-posts-image">
      {myPost.images.length > 1 && (
        <div className="more-images-sign">
          <Icon />
        </div>
      )}
      {myPost.images.length > 0 ? (
        <img src={myPost.images[0]} alt="..." />
      ) : (
        <span>{myPost.caption}</span>
      )}
    </section>
  );
};

export default Posts;
