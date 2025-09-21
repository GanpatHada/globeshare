import React, { useState } from "react";
import { useModal } from "./hooks/useModal";
import { useDialog } from "./hooks/useDialog";
import LeftSideBar from "./components/left-side-bar/LeftSideBar";
import Header from "./components/header/Header";
import BottomNavbar from "./components/bottom-navbar/BottomNavbar";
import SearchBox from "./components/search-box/SearchBox";
import ModalManager from "./components/modal-manager/ModalManager";
import CreatePost from "./components/create-post/CreatePost";
import PostDetails from "./components/post-details/PostDetails";
import LikesModal from "./components/likes-modal/LikesModal";
import Dialog from "./components/dialog/Dialog";
import MyFriends from "./pages/profile/components/myFriends/MyFriends";

import "./Main.css";
import { Outlet } from "react-router-dom";
import { useMenu } from "./hooks/useMenu";
import Menu from "./components/menu/Menu";

const AppSideNav = () => {
  const [searchBox, setSearchBox] = useState(false);
  const openSearchBox = () => setSearchBox(true);
  const closeSearchBox = () => setSearchBox(false);
  return (
    <React.Fragment>
      <LeftSideBar openSearchBox={openSearchBox} searchBox={searchBox} />
      <SearchBox searchBox={searchBox} closeSearchBox={closeSearchBox} />
    </React.Fragment>
  );
};

const AppContent = () => {
  return (
    <section id="app-content">
      <div className="app-pages">
        <Outlet/>
      </div>
    </section>
  );
};

const MenuController=()=>{
  const {isMenuOpen}=useMenu()
  if(isMenuOpen)
    return <Menu/>
}

const ModalController = () => {
  const { isModalOpen, modalContentType} = useModal();
 

  return (
    <React.Fragment>
      {isModalOpen &&  (
        <ModalManager>
          {modalContentType === "CREATE_POST" && <CreatePost mode={"CREATE"} />}
          {modalContentType === "EDIT_POST" && <CreatePost mode={"EDIT"} />}
          {modalContentType === "POST_DETAILS" && <PostDetails />}    
        </ModalManager>
      )}
    </React.Fragment>
  );
};

const DialogController = () => {
  const { isDialogOpen, dialogContentType } = useDialog();
  return (
    <React.Fragment>
      {isDialogOpen && (
        <Dialog>
          {dialogContentType === "LIKES" && <LikesModal />}
          {(dialogContentType==='FOLLOWING' || dialogContentType==='FOLLOWERS') && <MyFriends mode={dialogContentType}/>}
        </Dialog>
      )}
     
    </React.Fragment>
  );
};



const Main = () => {
  return (
    <main id="main-app">
      <MenuController/>
      <ModalController />
      <DialogController />
      <AppSideNav />
      <Header />
      <AppContent />
      <BottomNavbar />
    </main>
    
  );
};

export default Main;
