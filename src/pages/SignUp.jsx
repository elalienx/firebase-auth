// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import fields from "../data/fields-sign-up.json";
import { useUser } from "../state/UserProvider";
import { createAccount } from "../scripts/authentification";
import { createDocumentWithId } from "../scripts/firestore";

export default function Login() {
  // Global state
  const { setUser } = useUser();
  const history = useHistory();

  // Local state
  const [form, setForm] = useState({
    id: "",
    name: "Eduardo",
    city: "Stockholm",
    email: "eduardo.alvarez@novare.se",
    password: "12345678",
  });
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
    console.log("Account success");
    console.log(uid);
    const newUser = {
      name: form.name,
      city: form.city,
    };

    const document = await createDocumentWithId("users", uid, newUser);
    console.log("document", document);
    newUser.isLogged = true;
    setUser(newUser);
    history.push("/");
  }

  function onFailure(errorMessage) {
    console.log("Account failed");
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
