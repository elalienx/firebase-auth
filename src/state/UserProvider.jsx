// NPM packages
import { createContext, useContext, useState } from "react";

// Project files
import initialState from "data/new-user.json";

// Properties
const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Local state
  const [user, setUser] = useState(initialState);
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
