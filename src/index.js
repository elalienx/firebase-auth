// NPM packages
import React from "react";
import ReactDOM from "react-dom";

// Project files
import App from "./App";
import { UserProvider } from "state/UserProvider";
import { AuthProvider } from "state/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
