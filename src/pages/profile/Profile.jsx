import React, {useEffect} from "react";
import "./Profile.css";
import ProfileHeader from "./components/profile-header/ProfileHeader";
import ProfileNav from "./components/profile-nav/ProfileNav";
import { useUser } from "../../hooks/useUser";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Waiting from "../../components/waiting/Waiting";

import { fetchCurrentUserDetails } from "../../services/UserService";
import { useProfile } from "../../hooks/useProfile";

const Profile = () => {
  const { userId: currrentUserId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { profile, stopProfileLoading, profileLoading, saveProfileDetails } =
    useProfile();
  const getUserProfile = async () => {
    try {
      if (user.userId === currrentUserId) saveProfileDetails(user);
      else {
        const userProfile = await fetchCurrentUserDetails(currrentUserId);
        if (userProfile) saveProfileDetails(userProfile);
        else {
          toast.error("Unable to find user");
          navigate(-1);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      stopProfileLoading();
    }
  };
  useEffect(() => {
    getUserProfile();
  }, [currrentUserId]);
  return (
    <div id="profile-page" className="app-pages">
      {profileLoading ? (
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
