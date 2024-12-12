import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../assets/Firebase";

export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch ({ code }) {
    throw code;
  }
}

