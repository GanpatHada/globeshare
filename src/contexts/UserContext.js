import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../assets/Firebase";

export const UserContext = createContext();
export function UserProvider({ children }) {
  //states here
  const [user,setUser]=useState({});
  const[userDetails,setUserDetails]=useState(null)
  useEffect(() => {
    
    const unsub=onAuthStateChanged(auth,user=>{
        setUser(user);
   })
    return () => {
      unsub();
    }
  }, [])
  return (
    <UserContext.Provider
      value={{
        user,
        userDetails,setUserDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
