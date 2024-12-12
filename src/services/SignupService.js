import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../assets/Firebase";
import { getUserDetails } from "../utils/SignupHelper";
import { doc, setDoc } from "firebase/firestore";

export async function signup(email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (user) {
      await setDoc(doc(db, "users", user.uid), getUserDetails(email));
    }
  } catch ({ code }) {
    throw code;
  }
}
