import React, { useEffect } from "react";
import { Image, Spinner } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import speak from "../components/SpeechSynthesis";

const LOADING_TEXT = "I am thinking...";

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
        style={{ width: "200px", height: "255px" }}
        src="/robot_static.png"
      />
      <div className="align-self-center pl-5 col-7">
        <h4 style={{ overflow: "hidden", padding: "5px" }}>{robotText}</h4>
        {robotText === LOADING_TEXT ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          <Image
            className="pulse-animation p-1"
            style={{ width: "50px" }}
            src="/recording.png"
          />
        )}
      </div>
    </div>
  );
}
