import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import '../Login.css'
import Loading from '../../../images/loading.svg'
import GoogleButton from './GoogleButton';
import GuestButton from './GuestButton';
import { useState } from 'react';
import { SignupUser, areThereSignupErrors } from './authAssets';
const SignupBox = ({ setPage }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [signupData, setSignupData] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    });
    const { email, password, cpassword, fname, lname } = signupData;
    const handleSignup = async () => {
      if(areThereSignupErrors(signupData))
        return 0;
      SignupUser(signupData,setLoading);
      
    };
    return (
      <div id="login-box" className="authbox">
        <h2>Signup</h2>
        <div className="namebox">
          <input
            type="text"
            value={fname}
            onChange={(e) =>
              setSignupData({ ...signupData, fname: e.target.value })
            }
            placeholder="Enter First Name"
          />
          <input
            type="text"
            value={lname}
            onChange={(e) =>
              setSignupData({ ...signupData, lname: e.target.value })
            }
            placeholder="Enter Last Name"
          />
        </div>
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
            placeholder="Enter password atleast 6 characters"
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
          style={{
            marginBottom: "20px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
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
        <GoogleButton />
        <hr />
        <p>
          Already have  an account ? 
          <span onClick={() => setPage("login")}> Login</span>{" "}
        </p>
        <GuestButton />
      </div>
    );
  };
  export default SignupBox;