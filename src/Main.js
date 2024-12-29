import React, { useContext,useState } from "react";
import LeftSideBar from "./components/left-side-bar/LeftSideBar";
import "./Main.css";
import Header from "./components/header/Header";
import BottomNavbar from "./components/bottom-navbar/BottomNavbar";
import AppRoutes from "./AppRoutes";
import SearchBox from "./components/search-box/SearchBox";
import ModalManager from "./components/modal-manager/ModalManager";
import { ModalContext } from "./contexts/ModalContext";
import CreatePost from "./components/create-post/CreatePost";
import PostDetails from "./components/post-details/PostDetails";

const AppSideNav = () => {
  const [searchBox, setSearchBox] = useState(false);

  const openSearchBox = () => setSearchBox(true);
  const closeSearchBox = () => setSearchBox(false);
  return (
    <>
      <LeftSideBar openSearchBox={openSearchBox} searchBox={searchBox} />
      <SearchBox searchBox={searchBox} closeSearchBox={closeSearchBox} />
    </>
  );
};

const AppContent = () => {
  return (
    <section id="app-content">
      <div className="app-pages">
        <AppRoutes />
      </div>
    </section>
  );
};

const Main = () => {
  const { isModalOpen, closeModal, modalType } = useContext(ModalContext);
  return (
    <main id="main-app">
      {isModalOpen && modalType === "CREATE_POST" && (
        <ModalManager closeModal={closeModal}>
          <CreatePost mode={"CREATE"} closeModal={closeModal} />
        </ModalManager>
      )}
      {isModalOpen && modalType === "POST_DETAILS" && (
        <ModalManager closeModal={closeModal}>
          <PostDetails closeModal={closeModal} />
        </ModalManager>
      )}
      <AppSideNav />
      <Header />
      <AppContent />
      <BottomNavbar />
    </main>
  );
};

export default Main;
