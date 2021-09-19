import React from "react";
import { Image } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Robot() {
  const { robotText } = useConversations();
  return (
    <div className="d-flex justify-content-left">
      {" "}
      <Image style={{ width: "200px" }} src="/robot_static.png" />
      <p className="align-self-center p-3">{robotText}</p>
    </div>
  );
}
