import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

import BottomNavbar from "./components/bottom-navbar/BottomNavbar";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import BackDrop from "./components/backdrop/BackDrop";
import CreatePost from "./components/create-post/CreatePost";
import EditProfile from "./pages/edit-profile/EditProfile";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/page-not-found/PageNotFound";
import Loader from "./components/loader/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./assets/Firebase";
import Profile from "./pages/profile/Profile";

function App() {
  
  
  

  return (
    <div className="App">
      <ToastContainer
        position={"top-center"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme={"light"}
      />
      {/* <Loader/> */}
      <Home/>
      


        {/* <Login/> */}
        {/* <BackDrop/> */}
        {/* <CreatePost/> */}

        {/* <BottomNavbar/> */}
    </div>
  );
}

export default App;
