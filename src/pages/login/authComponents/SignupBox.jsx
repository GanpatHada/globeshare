import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import '../Login.css'
import Loading from '../../../images/loading.svg'
import GoogleButton from './GoogleButton';
import GuestButton from './GuestButton';
import { useState } from 'react';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "../../../assets/Firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
const SignupBox = ({ setPage }) => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [signupData, setSignupData] = useState({
      username:'',
      email: "",
      password: "",
      cpassword: "",
    });
    const[usernameError,setUsernameError]=useState(false)
    const { email, password, cpassword, username } = signupData;


    const areThereSignupErrors = () => {
      if (username.length === 0) {
        toast.warning("Please enter your user name !",{autoClose: 2000});
        return true;
      }
      if (email.length === 0) {
        toast.warning("Please enter email",{autoClose: 2000});
        return true;
      }
      if (password.length === 0) {
        toast.warning("Please enter password",{autoClose: 2000});
        return true;
      }
      if (cpassword.length === 0) {
        toast.warning("Please confirm password",{autoClose: 2000});
        return true;
      }
      if (password.length < 6) {
        toast.warning("Password should be atleast six characters",{autoClose: 2000});
        return true;
      }
      if (cpassword !== password) {
        toast.warning("Passwords do no match",{autoClose: 2000});
        return true;
      }
      if(!isEmail(email))
      {
        toast.warning("Enter a valid email",{autoClose: 2000});
        return true;
      }
      if(username.trim().includes(" "))
      {
        toast.warning("invalid username",{autoClose: 2000});
        return true;
      }
      return false;
    };


    const signupUser=async()=>{
      setLoading(true)
      try {
        const {user} = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password.trim()
        );
        if(user)
        {
              await setDoc(doc(db, "users",user.uid), {
              userName:username,
              profilePhoto:null,
              followers:[],
              following:[],
              bookmarks:[],
              likes:[],
              bio:'i am using globeshare',
              website:null,
            });
            toast.success('Account Created successfully',{autoClose: 2000})
            navigate('/')        
        }
        
      } catch ({code}) {
        if(code.includes('auth/email-already-in-use'))
            toast.error('There is already an account with this email');    
        else
           toast.error('Something went wrong !')  
        console.log(code)   
        return false     
    
      } finally {
        setLoading(false)
      }
    }
    


    const handleSignup = async() => {
      
      if(!areThereSignupErrors())
      {
        return await signupUser()          
      }   
      return 0;
    };

    const handleUserName=e=>{
      setSignupData({ ...signupData, username: e.target.value })
      if(e.target.value.trim().includes(" "))
         return setUsernameError(true);
      return setUsernameError(false)   
    }

    return (
      <div id="login-box" className="authbox">
        <h2>Signup</h2>
        <div className="namebox"  >
          <input
            style={{border:usernameError&&'1px solid #c50303'}}
            type="text"
            value={username}
            onChange={handleUserName}
            placeholder="Create user name"
          /> 
        </div>
         <p style={{color:usernameError&&'#c50303'}} id='username-warning'>username must not contain whitespace</p>
        
        
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
        {/* <GoogleButton /> */}
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