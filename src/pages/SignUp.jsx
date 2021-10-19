// NPM packages
import { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-sign-up.json";
import { createAccount } from "scripts/authentification";

export default function Login() {
  // Local state
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };

    setUser({ ...user, ...field });
  }

  async function onSubmit(event) {
    event.preventDefault();
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
        <button>Create account</button>
      </form>
      <Link to="/login">Login instead</Link>
    </div>
  );
}
