// NPM packages
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Project files
import { authInstance } from "scripts/firebase";
import { getDocument } from "scripts/fireStore";
import { useAuth } from "state/AuthProvider";
import Logged from "routes/Logged";
import Unlogged from "routes/Unlogged";

export default function App() {
  // Global state
  const { setUser, isLogged } = useAuth();

  // Local state
  const [loginUID, setLoginUID] = useState("");

  // Methods
  // 1. check if the user is login
  const checkLogin = useCallback(async () => {
    onAuthStateChanged(authInstance, (user) => {
      if (user) setLoginUID(user.uid);
      else console.log("AuthProvider user signed out");
    });
  }, []);

  // 2. if so, load profile
  const getUser = useCallback(async () => {
    console.log("getUser");

    const user = await getDocument("users", loginUID);
    console.log("user");
    setUser(user);
  }, [loginUID, setUser]);

  useEffect(() => {
    checkLogin();

    if (loginUID !== "") getUser();
  }, [checkLogin, getUser, loginUID]);

  return (
    <div className="App">
      @<small>{loginUID}</small>@
      <BrowserRouter>
        <Switch>{isLogged ? <Logged /> : <Unlogged />}</Switch>
      </BrowserRouter>
    </div>
  );
}
