// NPM packages
import { Route } from "react-router-dom";

// Project files
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function Unlogged() {
  return (
    <>
      <Route component={Login} exact path="/" />
      <Route component={SignUp} path="/sign-up" />
    </>
  );
}
