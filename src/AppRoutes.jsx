import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";
import EditProfile from "./pages/edit-profile/EditProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:userId" element={<Profile content={"POSTS"} />} />
      <Route path="/explore" element={<Explore />} />
      <Route
        path="/profile/:userId/likes"
        element={<Profile content={"LIKES"} />}
      />
      <Route
        path="/profile/:userId/bookmarks"
        element={<Profile content={"BOOKMARKS"} />}
      />
      <Route path="profile/edit" element={<EditProfile />} />
      <Route  path='*' element={<Navigate to='404'/>}/>
    </Routes>
  );
};

export default AppRoutes;
