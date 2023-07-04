import React, { useState } from "react";
import "../Login.css";
import { LoginUser } from "./authAssets";
import Loading from "../../../images/loading.svg";
const GuestButton = () => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      id="guest-btn"
      disabled={loading}
      className="all-centered login-page-btns"
      onClick={() => LoginUser('guest@gmail.com','guest123',setLoading)}
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
