import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import * as Constants from "../constants";

export default function Login({ onIdSubmit }) {
  function createNewId(e) {
    onIdSubmit(e.target.id); // Set id according to the button profile clicked
  }

  return (
    <Container
      className="align-items-center justify-content-center d-flex"
      style={{ height: "100vh" }}
    >
      <Button id={Constants.userId} onClick={createNewId} className="mr-2">
        User
      </Button>
      <Button id={Constants.helperId} onClick={createNewId}>
        Helper
      </Button>
    </Container>
  );
}
