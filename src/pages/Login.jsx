// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import InputFields from "components/InputFields";
import fields from "data/fields-login.json";
import { useUser } from "state/UserProvider";
import { signIn } from "scripts/authentification";
import { getDocument } from "scripts/firestore";

export default function Login() {
  // Global state
  const { user, setUser, setIsLogged } = useUser();
  const history = useHistory();

  // Local state
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Methods
  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    const account = await signIn(user.email, user.password);

    account.isLogged ? onSuccess(account.payload) : onFailure(account.payload);
  }

  async function onSuccess(uid) {
    const document = await getDocument("users", uid);

    setUser(document);
    setIsLogged(true);
    history.push("/");
  }

  function onFailure(message) {
    setErrorMessage(message);
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <InputFields fields={fields} state={[form, setForm]} />
        <p>{errorMessage}</p>
        <button>Login</button>
      </form>
      <Link to="/sign-up">Create an account</Link>
    </div>
  );
}
