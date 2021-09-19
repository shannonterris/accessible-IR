import React from "react";
import Message from "../user/Message";
import ImageGrid from "./ImageGrid";
import ReceiveText from "./ReceiveText";

export default function UserDashboard() {
  return (
    <div className="" style={{ width: "600px" }}>
      <Message />
      <div className="justify-content-center row border">
        <ReceiveText />
      </div>
      <div className="drop-zone">
        <ImageGrid />
      </div>
    </div>
  );
}
