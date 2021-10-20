// NPM packages
import { useEffect, useState } from "react";

// Project files
import { useAuth } from "state/AuthProvider";
import { getDocument } from "scripts/firestore2";
import Browser from "components/Browser";

export default function App() {
  // Global state
  const { isLogged, setIsLogged, setUser } = useAuth();

  // Local state
  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  // Methods
  useEffect(() => {
    async function checkLogin() {
      const uid = localStorage.getItem("uid");
      console.log("App.jsx uid", uid);

      if (uid) {
        const user = await getDocument("users", uid);

        setUser(user);
        setIsLogged(true);
        setStatus(1);
      } else {
        setStatus(1);
      }
    }
    checkLogin();
  }, [setIsLogged, setUser]);

  return (
    <div className="App">
      {status === 0 && <p>loading</p>}
      {status === 1 && <Browser isLogged={isLogged} />}
      {status === 2 && <p>error</p>}
    </div>
  );
}
