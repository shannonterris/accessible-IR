import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import Message from "./Message";
import { Button } from "react-bootstrap";
import { useSocket } from "../contexts/SocketProvider";
import { useState } from "react";
import ModalConfirmation from "./ModalConfirmation";

export default function HelperDashboard({ id }) {
  const socket = useSocket();
  const [modalShow, setModalShow] = useState(false);

  function downloadLog() {
    // socket emit
  }

  return (
    <div>
      <ModalConfirmation
        show={modalShow}
        heading="Restart Log"
        text="Are you sure you want to restart the current log file?"
        onClose={() => setModalShow(false)}
        onSave={() => {
          socket.emit("delete-log", {});
          setModalShow(false);
        }}
      />
      <div className="p-1">
        <Button>Download Log</Button>
        <Button onClick={() => setModalShow(true)}>Restart Log</Button>
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
