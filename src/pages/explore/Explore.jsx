import React, { useContext, useEffect, useState } from "react";
import "./Explore.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import PostsCard from "../../components/posts-card/PostsCard";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
const Explore = () => {
  const [allPosts, setAllPosts] = useState([]);
  const[loading,setLoading]=useState(false)
  const[loadingInfo,setLoadingInfo]=useState('')
  const { posts } = useContext(PostContext);
  const fetchAllPosts = async () => {
    try {
        setLoadingInfo('fetching Posts...')
        setLoading(true);
        let allPosts = [];
        const posts = await getDocs(collection(db, "posts"));
        posts.forEach((doc) => {
        allPosts.push({ postId: doc.id, ...doc.data() });
    });
    setAllPosts(allPosts);  
    } catch (error) {
        toast.error('Something went wrong!')
    }
    finally{
        setLoadingInfo('')
        setLoading(false)
    }
    
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div id="explore-page">
      {loading&&<Loader info={loadingInfo}/>}  
      <div id="posts-wrapper">
        {allPosts.map((post) => {
          return <PostsCard key={post.postId} myPost={post} />;
        })}
      </div>
    </div>
  );
};

export default Explore;
