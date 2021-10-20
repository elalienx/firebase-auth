// NPM packages
import { useEffect, useState } from "react";

// Project files
import Browser from "components/Browser";
import { getDocument } from "scripts/firestore";
import { useAuth } from "state/AuthProvider";
import { useUser } from "state/UserProvider";

export default function App() {
  // Global state
  const { uid, setIsLogged } = useAuth();
  const { setUser } = useUser();
  const isLogged = false;

  // Local state
  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  // Methods
  useEffect(() => {
    async function fetchUser() {
      if (uid === "no user") setStatus(1);
      if (uid !== "") {
        const user = await getDocument("users", uid);

        setUser(user);
        setIsLogged(true);
        setStatus(1);
      }
    }

    fetchUser();
  }, [setIsLogged, setUser, uid]);

  return (
    <div className="App">
      {status === 0 && <p>loading</p>}
      {status === 1 && <Browser isLogged={isLogged} />}
      {status === 2 && <p>error</p>}
    </div>
  );
}
