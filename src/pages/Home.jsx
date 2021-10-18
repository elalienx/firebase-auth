// NPM packages
import { useHistory } from "react-router-dom";

export default function Home() {
  // Global state
  const history = useHistory();

  // Methods
  function onLogout() {
    alert("On logout...");
    history.push("/login");
  }

  return (
    <div>
      <h1>Home</h1>
      <p>
        Welcome to our page @<b>NAME_GOES_HERE</b>@
      </p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
