// NPM packages
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Project files
import InputFields from "components/InputFields";
import fields from "data/fields-sign-up.json";
import { useAuth } from "state/AuthProvider";
import { createAccount } from "scripts/authentification";
import { createDocumentWithId } from "scripts/fireStore";

export default function Login() {
  // Global state
  const { setIsLogged, setUser } = useAuth();
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
    const account = await createAccount(form.email, form.password);

    account.isCreated ? onSuccess(account.payload) : onFailure(account.payload);
  }

  async function onSuccess(uid) {
    const newUser = { name: form.name, city: form.city };

    await createDocumentWithId("users", uid, newUser);
    setIsLogged(true);
    setUser(newUser);
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
