import React, { useEffect, useState } from "react";
import "./FullPost.css";
import PostDetails from "../../components/post-details/PostDetails";
import { useParams } from "react-router-dom"
import {getPostOwnerWithPosts } from "../../services/PostService";
import PostsCard from "../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import Loader from '../../images/loading2.gif'

const FullPost = () => {
  const [userInfo,setUserInfo]=useState({userId:null,userName:'',posts:[]});
  const [loading,setLoading]=useState(true)
  const { postId } = useParams();


  const getUserInfo=async()=>{
    try {
      const data=await getPostOwnerWithPosts(postId)
      setUserInfo(data);
    } catch (error) {
      toast.error('Unable to fetch Posts')
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getUserInfo()
  },[])
  return (
    <div id="full-post" className="app-pages">
      <div id="post-details-wrapper">
        <PostDetails postId={postId} />
      </div>
      <hr />
      <div className="more-posts">
        <h4>More Posts from {userInfo.userName}</h4>
        <div className="posts-wrapper">
          {loading&&<div className="loading">
             <img src={Loader} alt="" />
          </div>}
          {userInfo.posts.map(post=>{
          return <PostsCard post={post} key={post.postId}/>
        })}
        </div>
      </div>
    </div>
  );
};

export default FullPost;
