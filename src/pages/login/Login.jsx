import React, { useState } from "react";
import "./Login.css";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import loading from '../../images/loading.svg'
const Info = () => (
  <>
    <h1>globeshare</h1>
    <p>
      Let's connect with your friends across <br /> the globe through{" "}
      <strong>globeshare</strong>{" "}
    </p>
  </>
);

const LoginBox = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="login-box">
        <h2>Login</h2>
        <div className="emailbox">
          <input type="email" placeholder="Enter email" />
        </div>
        <div className="passwordbox">
          <input
            autoComplete="new-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <button id="eyebox" onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? (
              <BsEyeSlashFill className="eye" />
            ) : (
              <BsEyeFill className="eye" />
            )}
          </button>
        </div>
        <a href="/">forgotten Password</a>
        <button onClick={()=>console.log('clicked')} id="login-btn" className="all-centered"><img src={loading} id="loadingimg" alt="..." /></button>
        <hr />
        <button id="signup-btn">Create New Account</button>
    </div>
  );
};
const Login = () => {
  return (
    <div id="login-page" className="all-centered">
      <aside>
        <Info />
      </aside>
      <main>
        <LoginBox />
      </main>
    </div>
  );
};

export default Login;
