// NPM packages
import { useState } from "react";
import { Link } from "react-router-dom";

// Project files
import InputFields from "components/InputFields"
import fields from "data/fields-login.json";

export default function Login() {
  // Local state
  const [form, setForm] = useState({ email: "", password: "" });

  // Methods
  function onSubmit(event) {
    event.preventDefault();
    alert("Login not implemented");
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <InputFields fields={fields} state={[form, setForm]} />
        <button>Login</button>
      </form>
      <Link to="/sign-up">Create an account</Link>
    </div>
  );
}
