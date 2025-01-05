import React, { useState } from "react";
import "../Login.css";
import Loading from "../../../images/loading.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/LoginService";
const GuestButton = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);

  const guestLogin=async()=>{
      setLoading(true)
      try {
        await login();
        navigate("/")
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
      onClick={guestLogin}
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
