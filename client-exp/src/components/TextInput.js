import React from "react";
import { Form } from "react-bootstrap";

export default function TextInput(props) {
  return (
    <Form.Control
      type="text"
      value={props.innerText}
      onChange={(event) => {
        props.setInnerText(event.target.value);
      }}
    />
  );
}
