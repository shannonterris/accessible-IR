import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import DropZone from "./DropZone.js";
import SendText from "./SendText";
import SendSpeech from "./SendSpeech";

export default function CreateSERP() {
  const [textToSpeech, setTextToSpeech] = useState();
  const [textInformation, setTextInformation] = useState();
  const [images, setImages] = useState([]);

  const { sendMessage, sendTextInfo, sendImage } = useConversations();

  function sendAll() {
    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();
    // Send text to speech
    sendMessage(textToSpeech, timestamp);
    setTextToSpeech(""); // Reset text entry field to empty
    // Send text information
    sendTextInfo(textInformation, timestamp);
    setTextInformation(""); // Reset text entry field to empty
    // Send images
    sendImage(JSON.stringify(images), timestamp);
    setImages([]); // After sending image clear current grid

    // TODO: Should we send if its empty? Not sure cause you might want to clear it....
    // Could not send if empty and add a clear all button? !!!
  }

  return (
    <div>
      <div className="pb-1 d-flex justify-content-end">
        <Button onClick={sendAll}> Send All</Button>
      </div>
      <SendSpeech text={textToSpeech} setText={setTextToSpeech} />
      <div className="justify-content-center row border">
        <SendText text={textInformation} setText={setTextInformation} />
      </div>
      <div className="drop-zone">
        <DropZone tiles={images} setTiles={setImages} />
      </div>
    </div>
  );
}
