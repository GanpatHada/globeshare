import React, { useContext, useEffect, useState } from "react";
import LeftSideBar from "./components/left-side-bar/LeftSideBar";
import "./Main.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import BottomNavbar from "./components/bottom-navbar/BottomNavbar";
import AppRoutes from "./AppRoutes";
import SearchBox from "./components/search-box/SearchBox";
import ModalManager from "./components/modal-manager/ModalManager";
import { ModalContext } from "./contexts/ModalContext";
import Loader from "./components/loader/Loader";
import { UserContext } from "./contexts/UserContext";
import { getCurrentUserDetails } from "./services/UserService";
import { toast } from "react-toastify";

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
  const { showModal, openModal, closeModal } = useContext(ModalContext);
  const { state, dispatch } = useContext(UserContext);
  const {
    user: { userId },
    loading,
  } = state;
  const fetchUserDetails = async () => {
    try {
      const user = await getCurrentUserDetails(userId);
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      toast.error("Unable to fetch user details");
    } finally {
      
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <main id="main-app">
      {loading ? (
        <Loader />
      ) : (
        <>
          {showModal && <ModalManager closePopup={closeModal} />}
          <AppSideNav />
          <Header />
          <AppContent />
          <BottomNavbar />
        </>
      )}
    </main>
  );
};

export default Main;
