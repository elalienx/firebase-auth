s;
// NPM packages
import { createContext, useContext, useState } from "react";

// Project files

// Properties
const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Local state
  const [user, setUser] = useState({});

  return (
    <UserProvider.Provider value={{ user, setUser }}>
      {children}
    </UserProvider.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  return context;
}
