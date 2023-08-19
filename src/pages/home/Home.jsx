import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import LeftSideBar from "../../components/left-side-bar/LeftSideBar";
import Profile from "../profile/Profile";
import Feeds from "../feeds/Feeds";
import Suggestion from "../../components/suggestions/Suggestion";
import EditProfile from "../edit-profile/EditProfile";
import CreatePost from "../../components/create-post/CreatePost";
import { db } from "../../assets/Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/loader/Loader";
import { ModalContext } from "../../contexts/ModalContext";
import Modal from "../../components/modal/Modal";
import { toast } from "react-toastify";
import { PostContext } from "../../contexts/PostContext";
import Comments from "../../components/comments/Comments";
import SearchBox from "../../components/search-box/SearchBox";
import EditMenu from "../../components/edit-menu/EditMenu";
import BottomNavbar from '../../components/bottom-navbar/BottomNavbar'

const FeedsList = () => (
  <div id="feed-content">
    <Feeds />
    <Suggestion />
  </div>
);

const Home = () => {
  const {
    showCreatePostModal,
    showCommentsModal,
    closeCommentsModal,
    currentPost,
    showSearchModal,
    closeEditMenu,
    showEditMenu,
    showEditPostModal,
    openFollowersModal,
    closeFollowersModal,
    showFollowersModal,
  } = useContext(ModalContext);
  const { setUserDetails, userDetails, user } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState("Initializing...");

  const fetchPosts = async () => {
    try {
      setLoading(false);
      setLoadingInfo("Getting data...");
      const postList = await getDocs(collection(db, "posts"));
      let initialPosts = [];
      postList.forEach((post) => {
        initialPosts.push({ ...post.data(), postId: post.id });
      });
      setPosts(initialPosts);
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingInfo("");
    }
  };

  const fetchCurrentUserDetails = async () => {
    try {
      setLoading(true);
      setLoadingInfo("Getting user details...");
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setLoadingInfo("");
    }
  };
  useEffect(() => {
    if (user.uid) {
      fetchCurrentUserDetails();
      fetchPosts();
    }
  }, [user]);
  return (
    <div id="home-page">
      {user.uid && userDetails ? (
        <>
          {showCreatePostModal && (
            <Modal>
              <CreatePost mode="CREATE" />
            </Modal>
          )}
          {showCommentsModal && (
            <Modal onClose={closeCommentsModal}>
              <Comments currentPost={currentPost} posts={posts} />
            </Modal>
          )}
          {showSearchModal && <SearchBox />}
          {showEditMenu && (
            <Modal onClose={closeEditMenu}>
              <EditMenu posts={posts} currentPost={currentPost} />
            </Modal>
          )}
          {showEditPostModal && (
            <Modal>
              <CreatePost mode="EDIT" />
            </Modal>
          )}
          <LeftSideBar />
          {!loading ? (
            <main id="content">
              <div id="main-content" >
                <Routes>
                  <Route path="/" element={<FeedsList />} />
                  <Route
                    path="/profile/:userId"
                    element={<Profile content={"POSTS"} />}
                  />
                  <Route
                    path="/profile/:userId/likes"
                    element={<Profile content={"LIKES"} />}
                  />
                  <Route
                    path="/profile/:userId/bookmarks"
                    element={<Profile content={"BOOKMARKS"} />}
                  />
                  <Route path="profile/edit" element={<EditProfile />} />
                  {/* <Route  path='*' element={<Navigate to='404'/>}/> */}
                </Routes>
                
              </div>
            </main>
          ) : (
            <Loader info={loadingInfo} />
          )}
          <BottomNavbar />
        </>
      ) : (
        <Loader info={loadingInfo} />
      )}
    </div>
  );
};

export default Home;
