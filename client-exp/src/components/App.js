import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Logout from "./Logout";
import useLocalStorage from "../hooks/useLocalStorage";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ConversationsProvider id={id}>
        <Logout onIdSubmit={setId} />;
        <Dashboard id={id} />
      </ConversationsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
