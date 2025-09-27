import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "../Login.css";
import Loading from "../../../images/loading.svg";
import GuestButton from "./GuestButton";
import { useReducer } from "react";
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
  } = state;

  // Input field change
  const handleFieldChange = ({ target: { name, value } }) => {
    dispatch({ type: "SET_FIELD", payload: { field: name, value } });
  };

  // Toggle password visibility
  const handleTogglePassword = () =>
    dispatch({ type: "TOGGLE_SHOW_PASSWORD" });
  const handleToggleConfirmPassword = () =>
    dispatch({ type: "TOGGLE_SHOW_CONFIRM_PASSWORD" });

  // Loading states
  const startLoading = () => dispatch({ type: "START_LOADING" });
  const stopLoading = () => dispatch({ type: "STOP_LOADING" });

  // Signup API call
  const signupUser = async () => {
    startLoading();
    try {
      await signup(email.trim(), password.trim());
      navigate("/");
    } catch (errorCode) {
      toast.error(getSignupError(errorCode), { autoClose: 2000 });
    } finally {
      stopLoading();
    }
  };

  // Handle form submit
  const handleSignup = (e) => {
    e.preventDefault();
    const signupError = areThereSignupErrors(email, password, confirmPassword);
    if (!signupError) {
      return signupUser();
    }
    toast.warning(signupError, { autoClose: 2000 });
  };

  return (
    <form onSubmit={handleSignup} autoComplete="new-user" id="login-box" className="authbox">
      <h2>Signup</h2>

      {/* Email */}
      <div className="emailbox">
        <input
          autoComplete="email"
          type="email"
          name="email"
          value={email}
          onChange={handleFieldChange}
          placeholder="Enter email"
        />
      </div>

      {/* Password */}
      <div className="passwordbox">
        <input
          autoComplete="new-password"
          id="new-password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleFieldChange}
          placeholder="Enter password at least 6 characters"
        />
        <button
          type="button"
          id="eyebox"
          onClick={handleTogglePassword}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <BsEyeSlashFill className="eye" />
          ) : (
            <BsEyeFill className="eye" />
          )}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="passwordbox">
        <input
          autoComplete="new-password"
          id="new-password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleFieldChange}
          placeholder="Confirm password"
        />
        <button
          type="button"
          id="eyebox"
          onClick={handleToggleConfirmPassword}
          aria-label="Toggle confirm password visibility"
        >
          {showConfirmPassword ? (
            <BsEyeSlashFill className="eye" />
          ) : (
            <BsEyeFill className="eye" />
          )}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        id="signup-btn"
        className="all-centered login-page-btns"
      >
        {loading ? (
          <img src={Loading} id="loadingimg" alt="Loading..." />
        ) : (
          "Create Account"
        )}
      </button>

      {/* Divider */}
      <hr />

      {/* Login Link */}
      <p>
        Already have an account?
        <span onClick={() => setPage("login")} style={{ cursor: "pointer" }}>
          {" "}Login
        </span>
      </p>
      <hr />
      {/* Guest Button */}
      <GuestButton />
    </form>
  );
};

export default SignupBox;
