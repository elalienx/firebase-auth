// NPM package
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // refactor

// Project files
import { authInstance } from "scripts/firebase"; // refactor

// Properties
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Local state
  const [isLogged, setIsLogged] = useState(false);
  const [uid, setUID] = useState("");

  // Methods
  useEffect(() => {
    onAuthStateChanged(authInstance, (user) => {
      if (user) setUID(user.uid);
      else setUID("no user");
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, uid, setUID }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  useContext(AuthContext);
}
