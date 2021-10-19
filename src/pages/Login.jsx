// NPM packages
import { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-login.json";

export default function Login() {
  // Local state
  const [user, setUser] = useState({ email: "", password: "" });

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };

    setUser({ ...user, ...field });
  }

  function onSubmit(event) {
    event.preventDefault();
    alert("On submit...");
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
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        {InputFields}
        <button>Login</button>
        <p>
          Not a user? <Link to="/sign-up">Create an account now.</Link>
        </p>
      </form>
    </div>
  );
}
