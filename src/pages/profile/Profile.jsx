import React, { useCallback, useEffect } from "react";
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
  const { userId: currentUserId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { profile, stopProfileLoading, profileLoading, saveProfileDetails } = useProfile();

  const getUserProfile = useCallback(async () => {
    try {
      let userProfile;

      if (user.userId === currentUserId) {
        userProfile = user;
      } else {
        userProfile = await fetchCurrentUserDetails(currentUserId);
      }

      if (userProfile) {
        saveProfileDetails(userProfile);
      } else {
        toast.error("Unable to find user");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      stopProfileLoading();
    }
  }, [user, currentUserId, saveProfileDetails, stopProfileLoading, navigate]);

  useEffect(() => {
    // Only fetch profile if it's not the current profile
    if (!profile || profile.userId !== currentUserId) {
      getUserProfile();
    }
  }, [currentUserId, getUserProfile, profile]);

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
