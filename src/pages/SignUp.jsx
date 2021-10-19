// NPM packages
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-sign-up.json";
import { useAuth } from "state/AuthProvider";
import { createAccount } from "scripts/authentification";
import { createDocumentWithId } from "scripts/fireStore";

export default function Login() {
  // Global state
  const { setIsLogged, setUser } = useAuth();
  const history = useHistory();

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
    const account = await createAccount(form.email, form.password);

    account.isCreated ? onSuccess(account.payload) : onFailure(account.payload);
  }

  async function onSuccess(uid) {
    const newUser = { name: form.name, city: form.city };

    // To do:
    // 1. create a user in the database using the UID as the document id.
    await createDocumentWithId("users", uid, newUser);

    // 2. update global state: user and isLogged
    setIsLogged(true);
    setUser(newUser);

    // 3. redirect to home
    history.push("/");
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
      <h1>Create an account</h1>
      <form onSubmit={onSubmit}>
        {InputFields}
        <p>{errorMessage}</p>
        <button>Create account</button>
      </form>
      <Link to="/login">Login instead</Link>
    </div>
  );
}
