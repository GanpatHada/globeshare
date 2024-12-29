import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/Firebase";
import Loader from "../loader/Loader";
import { useUser } from "../../hooks/useUser";
import { getCurrentUserDetails } from "../../services/UserService";
import { toast } from "react-toastify";
export const PrivateRoute = ({ children }) => {
  const { user, loading, stopLoading, saveUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDetails = await getCurrentUserDetails(user.uid);
          saveUser(userDetails);
        }
        catch (error) {
          toast.error("Unable to get User Details");
          console.log(error);
        }
        finally {
          stopLoading();
        }
      } else saveUser(null);
    });
    return () => unsubscribe();
  }, []);
  if (loading) return <Loader />;
  else return user ? children : <Navigate to={"/auth"} />;
};
