// NPM packages
import { createUserWithEmailAndPassword } from "firebase/auth";

// Project files
import { authInstance } from "scripts/firebase";

export async function createAccount(email, password) {
  const account = { isCreated: false, payload: "" };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    account.payload = userCredential.user.uid;
    account.isCreated = true;
  } catch (error) {
    account.payload = error.message;
  }

  return account;
}
