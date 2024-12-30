import React, {useEffect, useState } from "react";
import "./Explore.css";
import PostsCard from "../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import { IoCloseCircle } from "react-icons/io5";
import Waiting from '../../components/waiting/Waiting'
import Spinner from '../../images/loading2.gif'
import {useUser} from '../../hooks/useUser'
import {usePosts} from "../../hooks/usePosts"
import { fetchExploringPosts } from "../../services/PostService";

const SmallDeviceSearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults,setShowSearchResult]=useState(false);
  return (
    <>
    <div id="small-device-search-box">
      <section id="search-input">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={(e)=>setShowSearchResult(true)}
        />
        <button id="clear-search-input" className="all-centered">{searchInput.length>0? <img src={Spinner} alt="..." />:<IoCloseCircle /> }</button>
      </section>
      {showSearchResults && <button id="cancel-search" onClick={()=>setShowSearchResult(false)}>Cancel</button>}
    </div>
    {showSearchResults && <SmallDeviceSearchResults />}
    </>
  );
};

const SmallDeviceSearchResults = () => {
  return <div id="small-device-search-results" onClick={()=>console.log('clicked')}></div>;
};

const Explore = () => {
  const{user}=useUser();
  const{posts,loading,addPosts,startLoadingPosts,stopLoadingPosts}=usePosts();

  const getExploringPosts = async () => {
    try {
      startLoadingPosts()
      const exploringPosts = await fetchExploringPosts([user.userId,...user.following]);
      addPosts(exploringPosts);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      stopLoadingPosts()
    }
  };

  const finalPosts=()=>posts.filter(post=>!user.following.includes(post.user) && post.user!==user.userId)

  useEffect(() => {
    getExploringPosts();
  }, []);
  return (
    <div id="explore-page" className="app-pages">
      {loading ? <Waiting />:
      <>
      <SmallDeviceSearchBox />
      <div id="posts-wrapper">
        {finalPosts().map((post) => {
          return <PostsCard key={post.postId} post={post} />;
        })}
      </div>
      </>}
    </div>
  );
};

export default Explore;
