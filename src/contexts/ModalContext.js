import { createContext, useState } from "react";

export const ModalContext = createContext();
export function ModalProvider({ children }) {
  //states here
  const [showCreatePostModal, setShwoCreatePostModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [displayMode, setDisplayMode] = useState("PC");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showEditPostModal,setShowEditPostModal]=useState(false)

  const [showFollowersModal,setShowFollowersModal]=useState(false)

  const openFollowersModal=()=>setShowFollowersModal(true)
  const closeFollowersModal=()=>setShowFollowersModal(false)

  const openCreatePostModal = () => setShwoCreatePostModal(true);
  const closeCreatePostModal = () => setShwoCreatePostModal(false);
  
  const openEditPostModal = () => setShowEditPostModal(true);
  const closeEditPostModal = () => setShowEditPostModal(false);



  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);

  const openCommentsModal = () => setShowCommentsModal(true);
  const closeCommentsModal = () => setShowCommentsModal(false);

  const openEditMenu = () => setShowEditMenu(true);
  const closeEditMenu = () => setShowEditMenu(false);

  const openSearchModal = () => {
    setShowSearchModal(true);
    setDisplayMode("TABLET");
  };
  const closeSearchModal = () => {
    setShowSearchModal(false);
    setDisplayMode("PC");
  };



  return (
    <ModalContext.Provider
      value={{
        openCreatePostModal,
        closeCreatePostModal,
        showCreatePostModal,
        currentPost,
        setCurrentPost,
        showProfileModal,
        openProfileModal,
        closeProfileModal,
        showCommentsModal,
        openCommentsModal,
        closeCommentsModal,
        displayMode,
        setDisplayMode,
        openSearchModal,
        closeSearchModal,
        showSearchModal,
        openEditMenu,
        closeEditMenu,
        showEditMenu,
        openEditPostModal,
        closeEditPostModal,
        showEditPostModal,
        openFollowersModal,
        closeFollowersModal,
        showFollowersModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
