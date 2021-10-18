// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import fields from "../data/fields-sign-up.json";
import newUser from "../data/new-user.json";
import { useUser } from "../state/UserProvider";
import { createAccount } from "../scripts/authentification";
import { createDocumentWithId } from "../scripts/firestore";

export default function Login() {
  // Global state
  const { setUser, setIsLogged } = useUser(newUser);
  const history = useHistory();

  // Local state
  const [form, setForm] = useState(user);
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
