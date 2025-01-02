import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/Firebase";
import Loader from "../loader/Loader";
import { useUser } from "../../hooks/useUser";
import { fetchCurrentUserDetails } from "../../services/UserService";
import { toast } from "react-toastify";
export const PrivateRoute = ({ children }) => {
  const { user, loading, stopLoading, saveUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFound) => {
      try {
        if (userFound) {
          const userDetails = await fetchCurrentUserDetails(userFound.uid);
          saveUser(userDetails);
        } else saveUser(null);
      } catch (error) {
        toast.error("Unable to get User Details");
        console.log(error);
      } finally {
        stopLoading();
      }
    });
    return () => unsubscribe();
  }, []);
  if (loading) return <Loader />;
  else return user ? children : <Navigate to={"/auth"} />;
};
