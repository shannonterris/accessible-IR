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
  const serverURL = "http://localhost:5000/download";
  // const serverURL = "https://accessible-ir-server.herokuapp.com/download";

  function downloadLog() {
    fetch(serverURL).then((res) => {
      res.blob().then((blob) => {
        const newBlob = new Blob([blob]);

        const blobUrl = window.URL.createObjectURL(newBlob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", `activity.log`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        window.URL.revokeObjectURL(blob);
      });
    });
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
        <Button onClick={downloadLog}>Download Log</Button>
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
