// NPM packages
import { Link } from "react-router-dom";

// Project files
import InputFields from "components/InputFields";
import fields from "data/fields-login.json";

export default function Login() {
  function onSubmit(event) {
    event.preventDefault();
    alert("On submit...");
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <InputFields fields={fields} />
        <button>Login</button>
      </form>
      <Link to="/sign-up">Create an account</Link>
    </div>
  );
}
