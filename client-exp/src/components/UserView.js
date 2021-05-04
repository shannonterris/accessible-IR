import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import * as Constants from "../constants";

export default function UserView({ id }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page
    setText("");
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
    </div>
  );
}
