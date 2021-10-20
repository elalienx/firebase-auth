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
  const fetchUser = useCallback(async (auth) => {
    const user = await getDocument("users", auth);

    console.log("App.jsx fetchUser() user", user);
  }, []);

  useEffect(() => {
    if (auth !== "") fetchUser(auth);
  }, []);

  return (
    <div className="App">
      @<small>{loginUID}</small>@
      <BrowserRouter>
        <Switch>{isLogged ? <Logged /> : <Unlogged />}</Switch>
      </BrowserRouter>
    </div>
  );
}
