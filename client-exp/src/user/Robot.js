import React from "react";
import { Image } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Robot() {
  const { robotText } = useConversations();
  return (
    <div className="d-flex justify-content-left">
      {" "}
      <Image
        className="robot"
        style={{ width: "200px" }}
        src="/robot_static.png"
      />
      <p className="align-self-center pl-5">{robotText}</p>
    </div>
  );
}
