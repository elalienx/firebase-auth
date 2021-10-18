// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import FieldsSignUp from "components/FieldsSignUp";
import newUser from "data/new-user.json";
import { createAccount } from "scripts/authentification";
import { createDocumentWithId } from "scripts/firestore";
import { useUser } from "state/UserProvider";

export default function Login() {
  // Global state
  const { setUser, setIsLogged } = useUser(newUser);
  const history = useHistory();

  // Local state
  const [form, setForm] = useState(newUser); // move to provider reducer?
  const [errorMessage, setErrorMessage] = useState("");

  // Methods
  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    console.log("onSubmit", form.email, form.password);
    const account = await createAccount(form.email, form.password);

    account.isCreated ? onSuccess(account.uid) : onFailure(account.error);
  }

  async function onSuccess(uid) {
    const newUser = { name: form.name, city: form.city };

    await createDocumentWithId("users", uid, newUser);
    setUser(newUser);
    setIsLogged(true);
    history.push("/");
  }

  function onFailure(errorMessage) {
    setErrorMessage(errorMessage);
  }

  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={onSubmit}>
        <FieldsSignUp state={[form, setForm]} />
        <p>{errorMessage}</p>
        <button>Create account</button>
      </form>
      <Link to="/login">Login instead</Link>
    </div>
  );
}
