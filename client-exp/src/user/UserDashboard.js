import React from "react";
import Message from "../user/Message";
import ImageGrid from "./ImageGrid";
import ReceiveText from "./ReceiveText";
import Robot from "./Robot";

export default function UserDashboard() {
  return (
    <div className="" style={{ width: "600px" }}>
      <Robot />
      <Message />
      <ReceiveText />
      <div className=" py-3 drop-zone">
        <ImageGrid />
      </div>
    </div>
  );
}
