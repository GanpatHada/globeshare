import React, { useContext, useEffect, useReducer, useState } from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";

import { UserContext } from "../../contexts/UserContext";

import {
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";
import Waiting from "../../components/waiting/Waiting";

import { getCurrentUserDetails } from "../../services/UserService";
import { ProfileContext } from "../../contexts/ProfileContext";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const { state: profileState, dispatch: profileDispatch } =
    useContext(ProfileContext);
  const {profile, loading } = profileState;
  const fetchUserProfileAndPosts = async () => {
    try {
      if (state.user.userId === userId)
        profileDispatch({ type: "SET_PROFILE", payload: state.user });
      else {
        const userProfile = await getCurrentUserDetails(userId);
        if (userProfile)
          profileDispatch({
            type: "SET_PROFILE",
            payload: { ...userProfile, userId },
          });
        else {
          toast.error("Unable to find User");
          navigate("-1");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      profileDispatch({ type: "STOP_LOADING" });
    }
  };
  useEffect(() => {
    fetchUserProfileAndPosts();
  }, []);

  return (
    <div id="profile-page" className="app-pages">
      {loading ? (
        <Waiting />
      ) : (
        <>
          <ProfileHeader userProfile={profile} />
          <ProfileNav />
          <div id="profile-content">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
