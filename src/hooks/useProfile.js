import { useContext, useCallback } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { saveProfile, stopLoading } from "../actions/ProfileAction";

export const useProfile = () => {
  const { state, dispatch } = useContext(ProfileContext);
  const { profile, loading: profileLoading } = state;

  const saveProfileDetails = useCallback(
    (profile) => saveProfile(dispatch, profile),
    [dispatch]
  );

  const stopProfileLoading = useCallback(
    () => stopLoading(dispatch),
    [dispatch]
  );

  return {
    profile,
    profileLoading,
    stopProfileLoading,
    saveProfileDetails,
  };
};