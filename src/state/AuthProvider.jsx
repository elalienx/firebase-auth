// NPM package
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

// Project files
import { authInstance } from "scripts/firebase";

// Properties
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Local state
  const [isLogged, setIsLogged] = useState(false); // this will be deleted
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState({});

  // Methods
  useEffect(() => {
    onAuthStateChanged(authInstance, (user) => {
      if (user) setAuth(user.uid);
      else console.log("AuthProvider user signed out");
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, auth, setAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
