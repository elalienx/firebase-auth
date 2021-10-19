/**
 * Note: This should be 2 Providers:
 * 1. UserProvier
 * 2. LoginStatusProvider
 */

// NPM packages
import { createContext, useContext, useState } from "react";

// Properties
const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Local state
  const [user, setUser] = useState({
    email: "el_alienx@hotmail.com",
    password: "12345678",
  });
  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  return context;
}
