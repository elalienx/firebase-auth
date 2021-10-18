// NPM packages
import { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import fields from "../data/fields-sign-up.json";

export default function Login() {
  // Local state
  const [user, setUser] = useState({
    name: "Eduardo",
    email: "eduardo.alvarez@novare.se",
    password: "12345678",
  });

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };

    setUser({ ...user, ...field });
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log("On submit with:", user.email, user.password);
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
