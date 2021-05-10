import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Nav, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchSystem() {
  const [searchText, setSearchText] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page

    setSearchText(""); // Reset text entry field to empty
  }

  return (
    <div className="border">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="p-3">
          <Form.Label>Search System:</Form.Label>
          <InputGroup>
            <Form.Control
              required
              value={searchText}
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ "max-width": "50%" }}
            ></Form.Control>
            <InputGroup.Append>
              <Button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <Tab.Container>
        <Nav variant="tabs" defaultActiveKey="web">
          <Nav.Item>
            <Nav.Link eventKey="web">Web Results</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="images">Images</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="web">Web search results here</Tab.Pane>
          <Tab.Pane eventKey="images">Images search results here</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
