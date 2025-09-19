import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../assets/Firebase";
import Loader from "../loader/Loader";
import { useUser } from "../../hooks/useUser";
import { fetchCurrentUserDetails } from "../../services/UserService";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export const PrivateRoute = ({ children }) => {
  const { user, loading, stopLoading, saveUser } = useUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDetails = await fetchCurrentUserDetails(firebaseUser.uid);
          saveUser({ userId: firebaseUser.uid, ...userDetails });
          stopLoading();
        } catch (error) {
          toast.error('user not found')
          saveUser(null);
        }
      } else {
        saveUser(null);
        stopLoading();
      }
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) return <Loader />;
  return user ? children : <Navigate to="/auth" />;
};
