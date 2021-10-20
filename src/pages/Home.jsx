// NPM packages
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";

// Project files
import { useAuth } from "state/AuthProvider";
import { authInstance } from "scripts/firebase";

export default function Home() {
  // Global state
  const { user, setIsLogged } = useAuth();
  const history = useHistory();

  // Methods
  function onLogout() {
    alert("We need to truly logout...");
    history.push("/login");

    signOut(authInstance)
      .then(() => {
        alert("user logout");
        setIsLogged(false);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our page {user.name}.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
