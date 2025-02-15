import React, { useReducer } from "react";
import GuestButton from "./GuestButton";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Loading from "../../../images/loading.svg";
import { toast } from "react-toastify";
import {
  initialLoginFormState,
  loginFormReducer,
} from "../../../reducers/LoginReducer";
import { areThereLoginErrors, getLoginError } from "../../../utils/LoginHelper";
import { login } from "../../../services/LoginService";
import "../Login.css";
const LoginBox = ({ setPage }) => {
  const [state, dispatch] = useReducer(loginFormReducer, initialLoginFormState);
  const { email, password, showPassword, loading } = state;
  const handleFieldChange = ({ target: { name, value } }) => {
    return dispatch({ type: "SET_FIELD", payload: { field: name, value } });
  };
  const handleShowPassword = () => {
    return dispatch({ type: "TOGGLE_SHOW_PASSWORD" });
  };

  const startLoading = () => dispatch({ type: "START_LOADING" });
  const stopLoading = () => dispatch({ type: "STOP_LOADING" });

  const loginUser = async () => {
    startLoading();
    try {
      await login(email.trim(), password.trim());
    } catch (errorCode) {
      toast.error(getLoginError(errorCode), { autoClose: 2000 });
    } finally {
      stopLoading();
    }
  };
  const handleLogin = () => {
    const loginError = areThereLoginErrors(email, password);
    if (!loginError) return loginUser();
    return toast.warning(loginError, { autoClose: 2000 });
  };
  return (
    <div id="login-box" className="authbox">
      <h2>Login</h2>
      <div className="emailbox">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleFieldChange(e)}
          placeholder="Enter email"
        />
      </div>
      <div className="passwordbox">
        <input
          autoComplete="new-password"
          name="password"
          value={password}
          onChange={(e) => handleFieldChange(e)}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
        />
        <button id="eyebox" onClick={handleShowPassword}>
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
