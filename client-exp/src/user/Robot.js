import React from "react";
import { Image } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Robot() {
  const { robotText } = useConversations();
  return (
    <div className="d-flex justify-content-center">
      {" "}
      <Image
        className="robot col-5"
        style={{ width: "200px" }}
        src="/robot_static.png"
      />
      <div className="align-self-center pl-5 col-7">
        <h4 style={{ overflow: "auto" }}>{robotText}</h4>
      </div>
    </div>
  );
}
