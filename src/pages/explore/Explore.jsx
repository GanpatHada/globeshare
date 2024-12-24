import React, { useContext, useEffect, useReducer, useState } from "react";
import "./Explore.css";
import { collection, getDocs } from "firebase/firestore";
import { db, imageRef } from "../../assets/Firebase";
import PostsCard from "../../components/posts-card/PostsCard";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { IoCloseCircle } from "react-icons/io5";
import loading from '../../images/loading2.gif'
import Waiting from '../../components/waiting/Waiting'
import { explorePostReducer, initialExplorePostState } from "../../reducers/ExplorePostReducer";
import { getExplorePosts } from "../../services/ExplorePostService";

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
        <button id="clear-search-input" className="all-centered">{searchInput.length>0? <img src={loading} alt="..." />:<IoCloseCircle /> }</button>
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
  const[state,dispatch]=useReducer(explorePostReducer,initialExplorePostState);
  const{posts,loading}=state;

  const startLoading=()=>dispatch({type:'START_LOADING'});
  const stopLoading=()=>dispatch({type:'STOP_LOADING'})

  const fetchAllPosts = async () => {
    try {
      startLoading()
      const posts = await getExplorePosts();
      dispatch({type:'SET_POSTS',payload:[...posts,...posts]})
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div id="explore-page" className="app-pages">
      {loading ? <Waiting />:
      <>
      <SmallDeviceSearchBox />
      <div id="posts-wrapper">
        {posts.map((post) => {
          return <PostsCard key={post.postId} post={post} />;
        })}
      </div>
      </>}
    </div>
  );
};

export default Explore;
