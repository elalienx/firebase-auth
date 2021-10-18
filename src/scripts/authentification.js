// NPM packages
import { createUserWithEmailAndPassword } from "firebase/auth";

// Project files
import { auth } from "./firebase";

export async function createAccount(email, password) {
  try {
    const userUID = await createUserWithEmailAndPassword(auth, email, password);

    console.log(userUID);
  } catch (error) {
    console.error("Error code", error.code);
    console.error("Error message", error.message);
  }
}
