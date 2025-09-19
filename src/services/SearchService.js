import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../assets/Firebase";


export async function fetchSearchedUsers({ prefix, nGrams }) {
  const usersRef = collection(db, "users");

  if (prefix) {
    const end = prefix.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    const q = query(
      usersRef,
      where("userNameLower", ">=", prefix),
      where("userNameLower", "<", end)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
  }

  if (nGrams && nGrams.length) {
    const q = query(
      usersRef,
      where("userNameIndex", "array-contains", nGrams[0])
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
  }

  return [];
}
