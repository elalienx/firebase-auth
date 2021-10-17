// NPM packages
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Project files

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Login} exact path="/login" />
          <Route component={SignUp} exact path="/sign-up" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
