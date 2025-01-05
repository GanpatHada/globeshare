import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "../Login.css";
import Loading from "../../../images/loading.svg";
import GoogleButton from "./GoogleButton";
import GuestButton from "./GuestButton";
import { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  initialSignupFormState,
  signupFormReducer,
} from "../../../reducers/SignupReducer";
import { areThereSignupErrors, getSignupError } from "../../../utils/SignupHelper";
import { signup } from "../../../services/SignupService";
const SignupBox = ({ setPage }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    signupFormReducer,
    initialSignupFormState
  );
  const {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    loading,
    error,
  } = state;

  const handleFieldChange = ({ target: { name, value } }) => {
    return dispatch({ type: "SET_FIELD", payload: { field: name, value } });
  };

  const handleTogglePassword = () => dispatch({ type: "TOGGLE_SHOW_PASSWORD" });
  const handleToggleConfirmPassword = () =>
    dispatch({ type: "TOGGLE_SHOW_CONFIRM_PASSWORD" });


  const startLoading=()=>dispatch({type:'START_LOADING'})
  const stopLoading=()=>dispatch({type:'STOP_LOADING'})




  const signupUser = async () => {
    startLoading();
    try {
      await signup(email.trim(),password.trim());
      navigate("/")
    } catch (errorCode) {
      toast.error(getSignupError(errorCode), { autoClose: 2000 });
    }
    finally{
      stopLoading();
    }
  };

  const handleSignup = () => {
    const signupError = areThereSignupErrors(email,password,confirmPassword);
    if (!signupError) {
      return signupUser();
    }
    return toast.warning(signupError, { autoClose: 2000 });
  };

  return (
    <div id="login-box" className="authbox">
      <h2>Signup</h2>

      <div className="emailbox">
        <input
          type="text"
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
          placeholder="Enter password atleast 6 characters"
        />
        <button id="eyebox" onClick={handleTogglePassword}>
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
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleFieldChange(e)}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
        />
        <button id="eyebox" onClick={handleToggleConfirmPassword}>
          {showConfirmPassword ? (
            <BsEyeSlashFill className="eye" />
          ) : (
            <BsEyeFill className="eye" />
          )}
        </button>
      </div>
      <button
        disabled={loading}
        id="signup-btn"
        onClick={handleSignup}
        className="all-centered login-page-btns"
      >
        {loading ? (
          <img src={Loading} id="loadingimg" alt="..." />
        ) : (
          "Create Account"
        )}
      </button>
      {/* <GoogleButton /> */}
      <hr />
      <p>
        Already have an account ?
        <span onClick={() => setPage("login")}> Login</span>{" "}
      </p>
      <GuestButton />
    </div>
  );
};
export default SignupBox;
