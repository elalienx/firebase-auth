// NPM packages
import { Route } from "react-router-dom";

// Project files
import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";

export default function Logged() {
  return (
    <>
      <Route component={Home} exact path="/" />
      <Route component={Login} path="/login" />
      <Route component={SignUp} path="/sign-up" />
    </>
  );
}
