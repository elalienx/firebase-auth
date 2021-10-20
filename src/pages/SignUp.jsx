/**
 * Note:
 * We can further refactor by creating an file called SignUpModel.js that abstract firebase from React
 */
// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import InputFields from "components/InputFields";
import fields from "data/fields-sign-up.json";
import { createAccount } from "scripts/authentification";
import { createDocumentWithId } from "scripts/firestore";
import { useUser } from "state/UserProvider";

export default function Login() {
  // Global state
  const { user, setUser, setIsLogged } = useUser();
  const history = useHistory();

  // Local state
  const [form, setForm] = useState({
    name: "",
    city: "",
    email: "",
    password: "",
  });
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
        <InputFields fields={fields} state={[form, setForm]} />
        <p>{errorMessage}</p>
        <button>Create account</button>
      </form>
      <Link to="/login">Login instead</Link>
    </div>
  );
}
