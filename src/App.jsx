// NPM packages
import { BrowserRouter, Switch } from "react-router-dom";

// Project files
import { useUser } from "./state/UserProvider";
import Logged from "./routes/Logged";
import Unlogged from "./routes/Unlogged";

export default function App() {
  // Global state
  const { user } = useUser();

  console.log("App.jsx user", user);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>{user.isLogged ? <Logged /> : <Unlogged />}</Switch>
      </BrowserRouter>
    </div>
  );
}
