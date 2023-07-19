import React, { useEffect } from "react";
import "./Home.css";
import LeftSideBar from "../../components/left-side-bar/LeftSideBar";
import RightSideBar from "../../components/right-side-bar/RightSideBar";
import BottomNavbar from "../../components/bottom-navbar/BottomNavbar";
import Profile from "../profile/Profile";
import SearchBox from "../../components/search-box/SearchBox";
import Feeds from "../feeds/Feeds";
import Suggestion from "../../components/suggestions/Suggestion";
import EditProfile from "../edit-profile/EditProfile";
import Followers from "../../components/followers/Followers";
import Comments from "../../components/comments/Comments";
import CreatePost from "../../components/create-post/CreatePost";
import { db } from "../../assets/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { Login } from "@mui/icons-material";
import PageNotFound from "../../components/page-not-found/PageNotFound";
const FeedsList=()=><> <Feeds/>
<Suggestion/></>

const Home = () => {
  useEffect(()=>{
    (async function getPosts() {
      const postsCol = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCol);
      const postList = postSnapshot.docs.map(doc => doc.data());
      return console.log(postList);
    })();
  })
  return (
    <div id="home-page">
       {/* <SearchBox/> */}
      <LeftSideBar />
      <main id="content">
        <div id="main-content">
          <Routes>
             <Route exact path="/" element={<FeedsList />} />
             <Route exact path="/profile" element={<Profile />}>
                  <Route  path="likes" element={<Profile />} />    
             </Route>  
             <Route exact path="/login" element={<Login />} />
             <Route exact path="*" element={<PageNotFound/>} />
          </Routes>
          {/* <Profile /> */}
          {/* <CreatePost/> */}
          {/* <EditProfile/> */}
          {/* <Followers/> */}
          {/* <Comments/> */}
        </div>
      </main>
      
    </div>
  );
};

export default Home;
