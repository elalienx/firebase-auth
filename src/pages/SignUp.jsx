// NPM packages
import { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-sign-up.json";
import { createAccount } from "scripts/authentification";

export default function Login() {
  // Local state
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };

    setUser({ ...user, ...field });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    const account = await createAccount(user.email, user.password);

    account.isCreated ? onSuccess(account.payload) : onFailure(account.payload);
  }

  function onSuccess(uid) {
    // To do:
    // 1. create a user in the database using the UID as the document id.
    // 2. update global state: user and isLogged
    // 3. redirect to home
  }

  function onFailure(message) {
    setErrorMessage(message);
  }

  // Components
  const InputFields = fields.map((item) => (
    <InputField
      key={item.key}
      options={item}
      state={user[item.key]}
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
