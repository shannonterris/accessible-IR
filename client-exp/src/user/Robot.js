import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import speak from "../components/SpeechSynthesis";

export default function Robot() {
  const { robotText } = useConversations();
  useEffect(() => {
    speak(robotText, "helperProfile", "userProfile"); // play introduction message
  }, []);
  return (
    <div className="d-flex justify-content-center">
      {" "}
      <Image
        className="robot col-5"
        style={{ width: "200px" }}
        src="/robot_static.png"
      />
      <div className="align-self-center pl-5 col-7">
        <h4 style={{ overflow: "hidden" }}>{robotText}</h4>
      </div>
    </div>
  );
}
