import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import * as Constants from "../constants";
import DropZone from "./DropZone.js";
import SendText from "./SendText";

export default function Message({ id }) {
  const [text, setText] = useState("");
  const { sendMessage } = useConversations();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page

    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();

    sendMessage(text, timestamp);
    setText(""); // Reset text entry field to empty
  }

  return (
    <div className="" style={{ width: "600px" }}>
      <div
        className="border-top row justify-content-center"
        id="message-component"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="p-3">
            <Form.Label>
              {id === Constants.helperId
                ? "Send Text to Speech:"
                : "Send Message:"}
            </Form.Label>
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ height: "75px", resize: "none" }}
              ></Form.Control>
              <InputGroup.Append>
                <Button type="submit">Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <div className="justify-content-center row border">
        <SendText />
      </div>
      <div className="drop-zone">
        <DropZone />
      </div>
    </div>
  );
}
