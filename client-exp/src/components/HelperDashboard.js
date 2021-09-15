import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import Message from "./Message";
import { Button } from "react-bootstrap";
import { useSocket } from "../contexts/SocketProvider";

export default function HelperDashboard({ id }) {
  const socket = useSocket();

  function restartLogs() {
    // Show confirmation modal
    socket.emit("delete-log", {});
  }

  function downloadLogs() {
    // socket emit
  }

  return (
    <div>
      <div className="p-1">
        <Button>Download Logs</Button>
        <Button onClick={restartLogs}>Restart Logs</Button>
      </div>
      <div className="row">
        <div className="col">
          <SearchSystem />
          <UserFeed />
        </div>
        <div style={{ width: "600px" }}>
          <Message id={id} />
        </div>
      </div>
    </div>
  );
}
