// NPM packages
import { useCallback, useEffect, useState } from "react";

// Project files
import Browser from "components/Browser";
import { useUser } from "state/UserProvider";

export default function App() {
  // Global state
  const { isLogged } = useUser();

  // Local state
  const [status, setStatus] = useState(0); // 0 loading, 1 ready, 2 error

  // Methods
  const fetchUser = useCallback(async () => {
    

  }, []);

  useEffect(() => {}, []);

  return (
    <div className="App">
      {status === 0 && <p>loading</p>}
      {status === 1 && <Browser isLogged={isLogged} />}
      {status === 2 && <p>error</p>}
    </div>
  );
}
