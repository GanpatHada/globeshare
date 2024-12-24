import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/Firebase";
import Loader from "../loader/Loader";
export const PrivateRoute = ({ children }) => {
  const { state, dispatch } = useContext(UserContext);
  const { user, loading } = state;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({type:"SET_USER",payload:{userId:currentUser.uid}})
    });
    return () => unsubscribe();
  }, []);
  if(!user)
    return <Loader/>
  else
    return user?children:<Navigate to={"/login"}/>  
};
