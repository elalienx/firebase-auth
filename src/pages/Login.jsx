// NPM packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Project files
import InputCheckbox from "components/InputCheckbox";
import InputFields from "components/InputFields";
import fields from "data/fields-login.json";
import { signIn } from "scripts/authentification";
import { useAuth } from "state/AuthProvider";

export default function Login() {
  // Global state
  const { setIsLogged } = useAuth();
  const history = useHistory();

  // Local state
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Methods
  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    const account = await signIn(form.email, form.password);

    account.isLogged ? onSuccess(account.payload) : onFailure(account.payload);
  }

  async function onSuccess(uid) {
    if (remember) localStorage.setItem("uid", uid);
    setIsLogged(true);
    history.push("/");
  }

  function onFailure(message) {
    setErrorMessage(message);
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <InputFields fields={fields} state={[form, setForm]} />
        <InputCheckbox state={[remember, setRemember]}>
          Remember me
        </InputCheckbox>
        <p>{errorMessage}</p>
        <button>Login</button>
      </form>
      <Link to="/sign-up">Create an account</Link>
    </div>
  );
}
