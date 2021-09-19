import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

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
    <div id="message-component">
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group className="p-3">
          <InputGroup>
            <Form.Control
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Form.Control>
            <InputGroup.Append>
              <Button type="submit">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
