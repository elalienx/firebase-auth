// NPM packages
import { useHistory } from "react-router-dom";

// Project files
import { useAuth } from "state/AuthProvider";
import { useUser } from "state/UserProvider";

export default function Home() {
  // Global state
  const { user } = useUser();
  const { setIsLogged } = useAuth();
  const history = useHistory();

  // Methods
  function onLogout() {
    setIsLogged(false);
    localStorage.setItem("uid", "");
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
