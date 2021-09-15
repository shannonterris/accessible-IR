import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalConfirmation(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          No
        </Button>
        <Button variant="primary" onClick={props.onSave}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
