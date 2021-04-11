import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import TextInput from "./TextInput";

export default function UserView() {
  const [innerText, setInnerText] = useState();
  return (
    <div style={{ width: "250px" }} className="flex-column d-flex">
      <Form>
        <Form.Label>Text to Speech</Form.Label>
        <TextInput innerText={innerText} setInnerText={setInnerText} />
      </Form>
    </div>
  );
}
