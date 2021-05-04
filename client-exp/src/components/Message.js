import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import * as Constants from "../constants";
import { useConversations } from "../contexts/ConversationsProvider";
import ActivityFeed from "./ActivityFeed";

export default function UserView({ id }) {
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
    <div style={{ width: "250px" }} className="flex-column d-flex">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          {id === Constants.userId
            ? "User Page *TESTING*"
            : "Helper Page *TESTING*"}
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
      <ActivityFeed />
    </div>
  );
}
