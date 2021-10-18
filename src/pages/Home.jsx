// NPM packages
import { useHistory } from "react-router-dom";

// Project files
import { useUser } from "state/UserProvider";

export default function Home() {
  // Global state
  const { user } = useUser();
  const history = useHistory();

  // Methods
  function onLogout() {
    alert("On logout...");
    history.push("/login");
  }

  return (
    <div>
      <h1>Home</h1>
      <p>
        Welcome to our page @<b>{user.name}</b>@
      </p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
