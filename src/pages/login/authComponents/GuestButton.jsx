import React, { useState } from "react";
import "../Login.css";
import Loading from "../../../images/loading.svg";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../assets/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const GuestButton = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);

  const guestLogin=async(email,password)=>{
      setLoading(true)
      try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password.trim()
        );
        toast.success('Logged in successfully',{autoClose: 2000})
        navigate('/');
      } catch ({code}) {
         toast.error('Something went wrong !')    
      } finally {
        setLoading(false)
      }
    }

  return (
    <button
      id="guest-btn"
      disabled={loading}
      className="all-centered login-page-btns"
      onClick={() => guestLogin('guest@gmail.com','guest123')}
    >
      {loading ? (
        <img src={Loading} id="loadingimg" alt="..." />
      ) : (
        "Login as a Guest"
      )}
    </button>
  );
};

export default GuestButton;
