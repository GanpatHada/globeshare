import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../assets/Firebase";

export async function login(email='guest@gmail.com', password='guest123') {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch ({ code }) {
    throw code;
  }
}

export async function logout(){
  try {
    const auth = getAuth();
  await signOut(auth);
  
  } catch (error) {
    throw error;
  }
  

}