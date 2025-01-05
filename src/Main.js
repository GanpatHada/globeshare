import React, { useState } from "react";
import LeftSideBar from "./components/left-side-bar/LeftSideBar";
import "./Main.css";
import Header from "./components/header/Header";
import BottomNavbar from "./components/bottom-navbar/BottomNavbar";
import AppRoutes from "./AppRoutes";
import SearchBox from "./components/search-box/SearchBox";
import ModalManager from "./components/modal-manager/ModalManager";
import CreatePost from "./components/create-post/CreatePost";
import PostDetails from "./components/post-details/PostDetails";
import LikesModal from "./components/likes-modal/LikesModal";
import Dialog from "./components/dialog/Dialog";
import { useModal } from "./hooks/useModal";
import { useDialog } from "./hooks/useDialog";
import MyFriends from "./pages/profile/components/myFriends/MyFriends";
import Menu from "./components/menu/Menu";
import { usePosts } from "./hooks/usePosts";
import { useMenu } from "./hooks/useMenu";
import SelectProfilePhotoModal from "./pages/edit-profile/components/select-profile-photo-modal/SelectProfilePhotoModal";

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

const ModalController = () => {
  const { isModalOpen, modalContentType,modalContentId } = useModal();
  const {posts}=usePosts()
  console.log(modalContentType,modalContentId);

  return (
    <>
      {isModalOpen &&  (
        <ModalManager>
          {modalContentType === "CREATE_POST" && <CreatePost mode={"CREATE"} />}
          {modalContentType === "EDIT_POST" && <CreatePost mode={"EDIT"} />}
          {modalContentType === "POST_DETAILS" && <PostDetails />}
          
        </ModalManager>
      )}
    </>
  );
};

const DialogController = () => {
  const { isDialogOpen, dialogContentType } = useDialog();
  return (
    <>
      {isDialogOpen && (
        <Dialog>
          {dialogContentType === "LIKES" && <LikesModal />}
          {(dialogContentType==='FOLLOWING' || dialogContentType==='FOLLOWERS') && <MyFriends mode={dialogContentType}/>}
        </Dialog>
      )}
     
    </>
  );
};

const MenuController=()=>{
    const {isMenuOpen}=useMenu()
    return(
      <>
      {isMenuOpen && <Menu/>

      }
      </>
    )
}

const Main = () => {
  console.log('rubn');
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
