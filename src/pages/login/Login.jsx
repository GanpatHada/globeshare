import React, { useState } from "react";
import "./Login.css";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import Loading from "../../images/loading.svg";
import googleIcon from "../../images/google-icon.svg";
import { GiEarthAmerica } from "react-icons/gi";
const Info = () => (
  <>
    <div>
    <h1 style={{justifyContent:'flex-start'}} className="all-centered">Gl<GiEarthAmerica/>beshare</h1>
    <p>
      Let's connect with your friends across the globe through{" "}
      <strong>Globeshare</strong>{" "}
    </p>
    </div>
  </>
);

const GoogleButton = () => {
  return (
    <button id="google-btn" className="all-centered login-page-btns">
      <img src={googleIcon} id="google-icon" alt="" /> Login with Google
    </button>
  );
};

const GuestButton = () => {
  return (
    <button id="guest-btn" className="all-centered login-page-btns">
      Login as a Guest
    </button>
  );
};

const LoginBox = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
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
            <BsEyeSlashFill className="eye" />
          ) : (
            <BsEyeFill className="eye" />
          )}
        </button>
      </div>
      <a href="/">forgotten Password ?</a>
      <button onClick={handleLogin} id="login-btn" className="all-centered login-page-btns">
        {loading ? <img src={Loading} id="loadingimg" alt="..." /> : "Login"}
      </button>
        <GoogleButton />
       
      <hr />
      <p>
        Don't have an Account{" "}
        <span onClick={() => setPage("signup")}> SignUp</span>
      </p>
      <GuestButton />
    </div>
  );
};

const SignupBox = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const { email, password, cpassword } = signupData;
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  return (
    <div id="login-box" className="authbox">
      <h2>Signup</h2>
      <div className="emailbox">
        <input
          type="email"
          value={email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          placeholder="Enter email"
        />
      </div>
      <div className="passwordbox">
        <input
          autoComplete="new-password"
          value={password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
        />
        <button id="eyebox" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <BsEyeSlashFill className="eye" />
          ) : (
            <BsEyeFill className="eye" />
          )}
        </button>
      </div>

      <div className="passwordbox">
        <input
          autoComplete="new-password"
          value={cpassword}
          onChange={(e) =>
            setSignupData({ ...signupData, cpassword: e.target.value })
          }
          type={showCPassword ? "text" : "password"}
          placeholder="Confirm password"
        />
        <button id="eyebox" onClick={() => setShowCPassword(!showCPassword)}>
          {showCPassword ? (
            <BsEyeSlashFill className="eye" />
          ) : (
            <BsEyeFill className="eye" />
          )}
        </button>
      </div>
      <button
        style={{ marginBottom: "20px" }}
        id="signup-btn"
        onClick={() => setPage("signup")}
        className="all-centered login-page-btns"
      >
        Create Account
      </button>
      <GoogleButton/>
      <hr />
      <p>
        Already have an account{" "}
        <span onClick={() => setPage("login")}> Login</span>{" "}
      </p>
      <GuestButton/>
    </div>
  );
};

const Login = () => {
  const [page, setPage] = useState("login");
  return (
    <div id="login-page" className="all-centered">
      <aside className="all-centered">
        <Info />
      </aside>
      <main>
        {page === "login" ? (
          <LoginBox setPage={setPage} />
        ) : (
          <SignupBox setPage={setPage} />
        )}
      </main>
    </div>
  );
};

export default Login;
