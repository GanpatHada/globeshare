import React, {useEffect,useState } from "react";
import "./Post.css";
import { MdMoreHoriz } from "react-icons/md";
import {
  getPostCreationDate,
  getTimeDifference,
} from "../../../../utils/PostsHelper";
import UserInfo from "../../../../components/user-info/UserInfo";
import PostActions from "../../../../components/post-actions/PostActions";
import DoComment from "../../../../components/do-comment/DoComment";
import PostImages from "../../../../components/post-images/PostImages";
import PostLikes from "../../../../components/post-likes/PostLikes";
import { useModal } from "../../../../hooks/useModal";

const PostHeader = ({ post }) => {
  const{time,user}=post;
  return (
    <header className="post-header">
      <UserInfo userId={user} />
      <span className="post-time" title={getPostCreationDate(time)}>
        {getTimeDifference(time)} ago
      </span>

      <button className="more all-centered">
        <MdMoreHoriz />
      </button>
    </header>
  );
};

const PostImage = ({ post: { images } }) => {
  return (
    <>
      {images.length !== 0 && (
        <section className="post-image">
          <PostImages images={images} />
        </section>
      )}
    </>
  );
};

const PostCaption = ({ post }) => {
  const { caption, images } = post;
  let finalCaption = caption;
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    if (finalCaption.length > 100) setShowMore(true);
  }, [caption]);

  return (
    <section
      className="post-caption"
      style={{ order: images.length === 0 ? "1" : "2" }}
    >
      {showMore ? finalCaption.substring(0, 100) : finalCaption}
      {finalCaption.length > 100 && (
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "read more" : "read less"}
        </button>
      )}
    </section>
  );
};

const CommentsCount = ({ post}) => {
  const{postId,comments}=post
  const { openModal } = useModal();
  const handleCommentsClick = () => {
    openModal(postId, "POST_DETAILS");
  };
  return (
    <section>
      <button
        id="post-comments-button"
        onClick={handleCommentsClick}
      >{`view all ${comments.length} comments`}</button>
    </section>
  );
};

const Post = ({ post }) => {
 

  return (
    <div className="post">
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostActions post={post} />
      <PostCaption post={post} />
      <PostLikes post={post} />
      <CommentsCount post={post}/>
      <DoComment post={post} />
    </div>
  );
};

export default Post;
