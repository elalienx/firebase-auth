// NPM packages
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-sign-up.json";
import { createAccount } from "scripts/authentification";
import { createDocumentWithId } from "scripts/fireStore";

export default function Login() {
  // Global state
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
    await createDocumentWithId("users", uid, newUser);
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
