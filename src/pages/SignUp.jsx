// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import FieldsSignUp from "components/FieldsSignUp";
import { createAccount } from "scripts/authentification";
import { createDocumentWithId } from "scripts/firestore";
import { useUser } from "state/UserProvider";

export default function Login() {
  // Global state
  const { user, setUser, setIsLogged } = useUser();
  const history = useHistory();

  // Local state
  const [errorMessage, setErrorMessage] = useState("");

  // Methods
  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    const account = await createAccount(user.email, user.password);

    account.isCreated ? onSuccess(account.payload) : onFailure(account.payload);
  }

  async function onSuccess(uid) {
    const newUser = { name: user.name, city: user.city };

    await createDocumentWithId("users", uid, newUser);
    setUser(newUser);
    setIsLogged(true);
    history.push("/");
  }

  function onFailure(message) {
    setErrorMessage(message);
  }

  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={onSubmit}>
        <FieldsSignUp />
        <p>{errorMessage}</p>
        <button>Create account</button>
      </form>
      <Link to="/login">Login instead</Link>
    </div>
  );
}
