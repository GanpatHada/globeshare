import { useContext } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import { saveProfile, stopLoading } from "../actions/ProfileAction";

export const useProfile=()=>{
    const{state,dispatch}=useContext(ProfileContext);
    const{profile,loading:profileLoading}=state;
    const saveProfileDetails=(profile)=>saveProfile(dispatch,profile)
    const stopProfileLoading=()=>stopLoading(dispatch);
    return {profile,profileLoading,stopProfileLoading,saveProfileDetails}
}