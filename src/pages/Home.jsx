export default function Home() {
  // Methods
  function onLogout() {
    alert("On logout...");
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
