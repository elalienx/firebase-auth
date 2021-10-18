// NPM packages
import { Link } from "react-router-dom";

// Project files
import InputField from "components/InputField";
import fields from "data/fields-login.json";
import { useUser } from "state/UserProvider";

export default function Login() {
  // Global state
  const { user, setUser } = useUser();

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
      </form>
      <Link to="/sign-up">Create an account</Link>
    </div>
  );
}
