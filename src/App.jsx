// NPM packages
import { useEffect, useCallback, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// Project files
import { getDocument } from "scripts/fireStore";
import { useAuth } from "state/AuthProvider";
import Logged from "routes/Logged";
import Unlogged from "routes/Unlogged";

export default function App() {
  // Global state
  const { isLogged, auth, setUser, setIsLogged } = useAuth();

  // Local state
  const [status, setStatus] = useState(0); // 0 loading, 1 loaded, 2 error

  // Methods
  const fetchUser = useCallback(
    async (path, auth) => {
      try {
        const user = await getDocument(path, auth);
        setUser(user);
        setIsLogged(true);
        setStatus(1);
      } catch (error) {
        console.error("Error loading profile", error);
        setStatus(2);
      }
    },
    [setUser]
  );

  useEffect(() => {
    if (auth !== "") fetchUser("users", auth);
  }, [fetchUser, auth]);

  // Components
  const Browser = (
    <BrowserRouter>
      <Switch>{isLogged ? <Logged /> : <Unlogged />}</Switch>
    </BrowserRouter>
  );

  return (
    <div className="App">
      @<small>{auth}</small>@
      <br />
      {status === 0 && <p>Loading</p>}
      {status === 1 && Browser}
      {status === 2 && <p>Error</p>}
    </div>
  );
}
