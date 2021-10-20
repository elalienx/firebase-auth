// NPM packages
import { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-login.json";
import { signIn } from "scripts/authentification";
import { getDocument } from "scripts/fireStore";
import { useAuth } from "state/AuthProvider";

export default function Login() {
  // Global state
  const { setUser } = useAuth();

  // Local state
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };

    setForm({ ...form, ...field });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    const account = await signIn(form.email, form.password);

    account.isLogged ? onSuccess(account.payload) : onFailure(account.payload);
  }

  async function onSuccess(uid) {
    // 1. get the user data from Firestore using the uid as the document id.
    const loggedUser = await getDocument("users", uid);

    // 2. update the global state (AuthProvider)
    setUser(loggedUser);

    // 3. store the auth token (let's discuss options)
    localStorage.setItem("uid", uid);

    // 4. redirect to home page ("/")
  }

  function onFailure(message) {
    setErrorMessage(message);
  }

  // Components
  const InputFields = fields.map((item) => (
    <InputField
      key={item.key}
      options={item}
      state={form[item.key]}
      onChange={onChange}
    />
  ));

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        {InputFields}
        <p>{errorMessage}</p>
        <button>Login</button>
      </form>
      <Link to="/sign-up">Create an account</Link>
    </div>
  );
}
