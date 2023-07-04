import "../Login.css";
import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import GuestButton from "./GuestButton";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Loading from '../../../images/loading.svg'
import { LoginUser, areThereLoginErrors } from "./authAssets";
const LoginBox = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const handleLogin = () => {
    if(areThereLoginErrors(loginData))
       return false
    LoginUser(email,password,setLoading)   
  };
  return (
    <div id="login-box" className="authbox">
      <h2>Login</h2>
      <div className="emailbox">
        <input
          type="email"
          value={email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          placeholder="Enter email"
        />
      </div>
      <div className="passwordbox">
        <input
          autoComplete="new-password"
          value={password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
        />
        <button id="eyebox" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <BsEyeSlashFill className="eye" title="Hide Password" />
          ) : (
            <BsEyeFill className="eye" title="Show Password" />
          )}
        </button>
      </div>
      <a href="/">forgotten Password ?</a>
      <button
        onClick={handleLogin}
        id="login-btn"
        className="all-centered login-page-btns"
      >
        {loading ? <img src={Loading} id="loadingimg" alt="..." /> : "Login"}
      </button>
      <GoogleButton />

      <hr />
      <p>
        Don't have an Account ?
        <span onClick={() => setPage("signup")}> SignUp</span>
      </p>
      <GuestButton />
    </div>
  );
};

export default LoginBox;
