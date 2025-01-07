import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";
import EditProfile from "./pages/edit-profile/EditProfile";
import MyBookmarks from "./pages/profile/components/my-bookmarks/MyBookmarks";
import MyPosts from "./pages/profile/components/my-posts/MyPosts";
import { EditProfileProvider } from "./contexts/EditProfileContext";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import Main from "./Main";
import PageNotFound from "./components/page-not-found/PageNotFound";
import Login from './pages/login/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"  element={<PrivateRoute><Main /></PrivateRoute>}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:userId" element={<Profile />}>
               <Route  index element={<MyPosts />} />
               <Route path="/profile/:userId/bookmarks" element={<MyBookmarks />} />
          </Route>
          <Route path="profile/edit" element={<EditProfileProvider><EditProfile /></EditProfileProvider>} />
          
    </Route >
    <Route path="/auth" element={<Login />} />
    <Route path="*" element={<PageNotFound />} /> 
    </Routes>
  );
};

export default AppRoutes;
