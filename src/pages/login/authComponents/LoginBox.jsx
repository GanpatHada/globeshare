import "../Login.css";
import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import GuestButton from "./GuestButton";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Loading from '../../../images/loading.svg'
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../assets/Firebase";
import { useNavigate } from "react-router-dom";
const LoginBox = ({ setPage }) => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;


  const areThereLoginErrors=()=>{
    if(email.length===0)
    {
      toast.warning("Please enter email",{autoClose: 2000});
      return true;
    }
    if(password.length===0)
    {
      toast.warning("Please enter password",{autoClose: 2000});
      return true;
    }
    if(!isEmail(email))
    {
      toast.warning("Enter a valid email",{autoClose: 2000});
      return true;
    }
    return false
  
  }
  const loginUser=async(email,password)=>{
    setLoading(true)
    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      toast.success('Logged in successfully',{autoClose: 2000})
      navigate('/');
    } catch ({code}) {
      if(code.includes('user-not-found'))
          return toast.error('account does not exists with this email');
      if(code.includes('auth/wrong-password'))
          return toast.error('Incorrect password');    
      return toast.error('Something went wrong !')    
  
    } finally {
      setLoading(false)
    }
  }
  const handleLogin = async() => {
    if(!areThereLoginErrors())
    {
        return await loginUser(email,password);
    }
    return 0;
      
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
