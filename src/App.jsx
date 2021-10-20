// NPM packages
import { useEffect, useCallback } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// Project files
import { getDocument } from "scripts/fireStore";
import { useAuth } from "state/AuthProvider";
import Logged from "routes/Logged";
import Unlogged from "routes/Unlogged";

export default function App() {
  // Global state
  const { isLogged, auth } = useAuth();

  // Methods
  const fetchUser = useCallback(
    async (path, auth) => {
      try {
        const user = await getDocument(path, auth);
        setUser(user);
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
  }, [fetchUser]);

  return (
    <div className="App">
      @<small>{loginUID}</small>@
      <BrowserRouter>
        <Switch>{isLogged ? <Logged /> : <Unlogged />}</Switch>
      </BrowserRouter>
    </div>
  );
}
