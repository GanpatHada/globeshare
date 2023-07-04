import { toast, } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import isEmail from 'validator/lib/isEmail';
import { auth } from "../../../assets/Firebase";


export const areThereSignupErrors = ({ fname, lname, email, password, cpassword }) => {
  if (fname.length === 0) {
    toast.warning("Please enter your name !",{autoClose: 2000});
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
  return false;
};


export const areThereLoginErrors=({email,password})=>{
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



export const SignupUser=async({ fname, lname, email, password},setLoading)=>{

  setLoading(true)
  try {
    await setPersistence(auth, browserLocalPersistence);
    const {user} = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    await updateProfile(user, {
      displayName: `${fname.trim()} ${lname.trim()}`  
    });
    toast.success('Account Created successfully',{autoClose: 2000})
  } catch ({code}) {
    if(code.includes('auth/email-already-in-use'))
        return toast.error('There is already an account with this email');
    return toast.error('Something went wrong !')    

  } finally {
    setLoading(false)
  }
}


export const LoginUser=async(email='guest@gmail.com',password='guest123',setLoading)=>{
  setLoading(true)
  try {
    await setPersistence(auth, browserLocalPersistence);
    const {user} = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    toast.success('Logged in successfully',{autoClose: 2000})
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
