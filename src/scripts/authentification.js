// NPM packages
import { createUserWithEmailAndPassword } from "firebase/auth";

// Project files
import { authInstance } from "./firebase";

export async function createAccount(email, password) {
  const account = { uid: "", error: "", isCreated: false };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    account.uid = userCredential.user.uid;
    account.isCreated = true;
  } catch (error) {
    console.error("error.code", error.code);
    account.error = error.message;
  }

  return account;
}
