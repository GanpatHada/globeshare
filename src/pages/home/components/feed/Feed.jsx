import React, { useEffect } from "react";
import "./Feed.css";
import { usePosts } from "../../../../hooks/usePosts";
import { fetchFeed } from "../../../../services/PostService";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import Post from "../post/Post";
import NoFeedIcon from "../../../../images/Home.svg";
import NoPostIcon from "../../../../images/NoPost.png";

const FeedLoading = () => {
  return (
    <div id="feed-loading">
      <div className="skeleton"></div>
      <div className="skeleton"></div>
    </div>
  );
};

const NoFeed = ({ noFollowers }) => {
  return (
    <div id="no-feed" className="all-centered">
      <div id="no-feed-content" className="all-centered">
        <section id="no-feed-icon">
          <img src={noFollowers ? NoFeedIcon : NoPostIcon} alt="no-feed" />
        </section>
        <h2>Welcome to globeshare</h2>
        {noFollowers ? (
          <p>Follow people, you'll find their posts here</p>
        ) : (
          <p>
            Whenever your followers post something, you'll find their posts
            here
          </p>
        )}
      </div>
    </div>
  );
};

const Feed = ({ filter }) => {
  const { addPosts, startLoadingPosts, stopLoadingPosts, loading, posts } = usePosts();
  const { user } = useUser();

  useEffect(() => {
    const getFeed = async () => {
      try {
        startLoadingPosts();
        const feeds = await fetchFeed(user);
        addPosts(feeds);
      } catch (error) {
        toast.error("Something went wrong while loading posts");
      } finally {
        stopLoadingPosts();
      }
    };
    getFeed();
  }, []);

  const getFeedFromPosts = () => {
    const feedPosts = posts.filter((post) => user.following.includes(post.user));
    if (filter === "Trending") {
      return feedPosts.sort(
        (a, b) =>
          (b.likes?.length + b.comments?.length) -
          (a.likes?.length + a.comments?.length)
      );
    } else if (filter === "Date Posted") {
      return feedPosts.sort(
        (a, b) => b.time -a.time
      );
    }
    return feedPosts;
  };

  const feedToShow = getFeedFromPosts();

  return (
    <div id="feed">
      {user.following.length === 0 ? (
        <NoFeed noFollowers={true} />
      ) : loading ? (
        <FeedLoading />
      ) : feedToShow.length === 0 ? (
        <NoFeed noFollowers={false} />
      ) : (
        feedToShow.map((post) => <Post key={post.postId} post={post} />)
      )}
    </div>
  );
};

export default Feed;
