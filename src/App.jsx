// Project files
import Browser from "components/Browser";
import { useUser } from "state/UserProvider";

export default function App() {
  // Global state
  const { isLogged } = useUser();

  return (
    <div className="App">
      <Browser isLogged={isLogged} />
    </div>
  );
}
