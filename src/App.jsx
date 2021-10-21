// NPM packages
import { useCallback, useEffect, useState } from "react";

// Project files
import Browser from "components/Browser";
import { useUser } from "state/UserProvider";
import { getDocument } from "scripts/firestore";

export default function App() {
  // Global state
  const { isLogged, setUser, setIsLogged } = useUser();

  // Local state
  const [status, setStatus] = useState(0); // 0 loading, 1 ready, 2 error

  // Methods
  const fetchUser = useCallback(
    async (path) => {
      const uid = localStorage.getItem("uid");

      if (uid) {
        const user = await getDocument(path, uid);

        setUser(user);
        setIsLogged(true);
      }
      setStatus(1);
    },
    [setUser, setIsLogged]
  );

  useEffect(() => fetchUser("users"), [fetchUser]);

  return (
    <div className="App">
      {status === 0 && <p>loading</p>}
      {status === 1 && <Browser isLogged={isLogged} />}
      {status === 2 && <p>error</p>}
    </div>
  );
}
