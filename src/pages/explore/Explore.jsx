import React, { useContext, useEffect, useState } from "react";
import "./Explore.css";
import { collection, getDocs } from "firebase/firestore";
import { db, imageRef } from "../../assets/Firebase";
import PostsCard from "../../components/posts-card/PostsCard";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { IoCloseCircle } from "react-icons/io5";
import loading from '../../images/loading2.gif'

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
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState("");
  const { posts } = useContext(PostContext);
  const fetchAllPosts = async () => {
    try {
      setLoadingInfo("fetching Posts...");
      setLoading(true);
      let allPosts = [];
      const posts = await getDocs(collection(db, "posts"));
      posts.forEach((doc) => {
        allPosts.push({ postId: doc.id, ...doc.data() });
      });
      setAllPosts([...allPosts, ...allPosts, ...allPosts]);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingInfo("");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div id="explore-page" className="app-pages">
      {loading && <Loader info={loadingInfo} />}
      <SmallDeviceSearchBox />
      <div id="posts-wrapper">
        {allPosts.map((post) => {
          return <PostsCard key={post.postId} myPost={post} />;
        })}
      </div>
    </div>
  );
};

export default Explore;
