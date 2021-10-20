// NPM packages
import { useCallback, useEffect, useState } from "react";

// Project files
import Browser from "components/Browser";
import { getDocument } from "scripts/firestore";
import { useAuth } from "state/AuthProvider";
import { useUser } from "state/UserProvider";

export default function App() {
  // Global state
  const { uid, setIsLogged, isLogged } = useAuth();
  const { setUser } = useUser();

  // Local state
  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  // Methods
  const fetchUser = useCallback(
    async (path, uid) => {
      if (uid === "no user") {
        setStatus(1);
      } else if (uid !== "") {
        const user = await getDocument(path, uid);

        setUser(user);
        setIsLogged(true);
        setStatus(1);
      }
    },
    [setIsLogged, setUser]
  );

  useEffect(() => {
    fetchUser("users", uid);
  }, [fetchUser, uid]);

  return (
    <div className="App">
      {status === 0 && <p>loading</p>}
      {status === 1 && <Browser isLogged={isLogged} />}
      {status === 2 && <p>error</p>}
    </div>
  );
}
