// NPM packages
import { BrowserRouter, Switch } from "react-router-dom";

// Project files
import { useUser } from "state/UserProvider";
import Logged from "routes/Logged";
import Unlogged from "routes/Unlogged";

export default function App() {
  // Global state
  const { isLogged } = useUser();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>{isLogged ? <Logged /> : <Unlogged />}</Switch>
      </BrowserRouter>
    </div>
  );
}
