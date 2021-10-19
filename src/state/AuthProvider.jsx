// NPM package
import { createContext, useContext, useState } from "react";

// Properties
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Local state
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
