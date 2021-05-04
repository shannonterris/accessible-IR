import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import { ConversationsProvider } from "../contexts/ConversationsProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <ConversationsProvider id={id}>
      <Dashboard id={id} />
    </ConversationsProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
