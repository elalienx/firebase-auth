// NPM packages
import { useHistory } from "react-router-dom";

// Project files
import { useAuth } from "state/AuthProvider";
import { useUser } from "state/UserProvider";
import { logout } from "scripts/authentification";

export default function Home() {
  // Global state
  const { user } = useUser();
  const { setIsLogged } = useAuth();
  const history = useHistory();

  // Methods
  async function onLogout() {
    const account = await logout();

    console.log("Home.jsx account", account);
    setIsLogged(false);
    history.push("/");
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our page {user.name}.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
