import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import TextInput from "./TextInput";

export default function UserView() {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page
    return false;
  }

  return (
    <div style={{ width: "250px" }} className="flex-column d-flex">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
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
  );
}
