import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Nav,
  Tab,
  Pagination,
  PageItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { googleSearch } from "../api/GoogleSearch";
import Gallery from "./Gallery";

export default function SearchSystem() {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page
    // Need to also log this search
    googleSearch(searchText, setImages);
  }

  function clearSearch() {
    setSearchText("");
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
              <Button
                className="clear-button btn-light border"
                onClick={clearSearch}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <Tab.Container defaultActiveKey="images">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="web">Web Results</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="images">Images</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="web">Web search results here</Tab.Pane>
          <Tab.Pane eventKey="images">
            <Gallery images={images} currentPage={page} />
            {images.length === 0 ? null : (
              <Pagination>
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={(event) => setPage(page - 1)}
                />
                <Pagination.Item
                  active={page === 1 ? true : false}
                  onClick={(event) => setPage(1)}
                >
                  {1}
                </Pagination.Item>
                <Pagination.Item
                  active={page === 2 ? true : false}
                  onClick={(event) => setPage(2)}
                >
                  {2}
                </Pagination.Item>
                <Pagination.Item
                  active={page === 3 ? true : false}
                  onClick={(event) => setPage(3)}
                >
                  {3}
                </Pagination.Item>
                <Pagination.Next
                  disabled={page === 3}
                  onClick={(event) => setPage(page + 1)}
                />
              </Pagination>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
