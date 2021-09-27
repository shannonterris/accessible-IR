import React from "react";
import { useState } from "react";
import ModalConfirmation from "./ModalConfirmation";
import { Button } from "react-bootstrap";
import { useSocket } from "../contexts/SocketProvider";

export default function LogsControl() {
  const [modalShow, setModalShow] = useState(false);
  const socket = useSocket();

  // const serverURL = "http://localhost:5000/download";
  const serverURL = "https://accessible-ir-server.herokuapp.com/download";

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
      <div className="p-1 btn-toolbar">
        <div class="btn-group px-1">
          <Button onClick={downloadLog}>Download Log</Button>
        </div>
        <div class="btn-group px-1">
          <Button onClick={() => setModalShow(true)}>Restart Log</Button>
        </div>
      </div>
    </div>
  );
}
