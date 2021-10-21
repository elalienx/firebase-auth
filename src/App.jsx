// NPM packages
import { useEffect, useState } from "react";

// Project files
import Browser from "components/Browser";
import { useUser } from "state/UserProvider";
import { getDocument } from "scripts/firestore";

export default function App() {
  // Global state
  const { isLogged, setUser, setIsLogged } = useUser();

  // Local state
  const [status, setStatus] = useState(0); // 0 loading, 1 ready, 2 error

  // Methods

  useEffect(() => {
    async function fetchUser() {
      const uid = localStorage.getItem("uid");
      console.log("App.jsx", uid);

      if (uid) {
        const user = await getDocument("users", uid);

        setUser(user);
        setIsLogged(true);
        setStatus(1);
      } else {
        setStatus(1);
      }
    }

    fetchUser();
  }, [setUser, setIsLogged]);

  return (
    <div className="App">
      {status === 0 && <p>loading</p>}
      {status === 1 && <Browser isLogged={isLogged} />}
      {status === 2 && <p>error</p>}
    </div>
  );
}
