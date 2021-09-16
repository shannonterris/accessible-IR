import React, { useState } from "react";
import * as Constants from "../constants";
import { useConversations } from "../contexts/ConversationsProvider";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

export default function SendText() {
  const [text, setText] = useState("");
  const { sendTextInfo } = useConversations();
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page

    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();

    sendTextInfo(text, timestamp);
    setText(""); // Reset text entry field to empty
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="p-3">
        <Form.Label>Send Text Information</Form.Label>
        <InputGroup>
          <Form.Control
            as="textarea"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: "75px", width: "500px", resize: "none" }}
          ></Form.Control>
          <InputGroup.Append>
            <Button type="submit">Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}
