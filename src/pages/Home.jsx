// NPM packages
import { useHistory } from "react-router-dom";

// Project files
import { useAuth } from "state/AuthProvider";

export default function Home() {
  // Global state
  const { user } = useAuth();
  const history = useHistory();

  // Methods
  function onLogout() {
    alert("We need to truly logout...");
    history.push("/login");
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our page {user.name}.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
