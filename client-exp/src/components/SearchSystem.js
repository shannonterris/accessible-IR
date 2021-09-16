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
import { bingSearch } from "../api/BingSearch";
// import Gallery from "./Gallery";
import Gallery from "react-grid-gallery";
import { useSocket } from "../contexts/SocketProvider";

export default function SearchSystem() {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const socket = useSocket();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the auto refresh of page
    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();
    setPage(1);
    // Logging of google search to server
    socket.emit("search-google", { searchText, timestamp });
    // TESTING COMMENT OUT FOR API LIMIT
    bingSearch(searchText, setImages);
    // setImages(IMAGES);
  }

  function clearSearch() {
    setSearchText("");
  }

  const IMAGES = [
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },

    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
  ];

  return (
    <div className="border-top">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="p-3">
          <Form.Label>
            {" "}
            <h4>Search System</h4>
          </Form.Label>
          <InputGroup>
            <Form.Control
              required
              value={searchText}
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ "max-width": "50%" }}
            ></Form.Control>
            <InputGroup.Append>
              <Button className="clear-button border" onClick={clearSearch}>
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
            <div
              style={{
                display: "block",
                minHeight: "1px",
                maxHeight: "500px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto",
              }}
            >
              <Gallery images={images} enableImageSelection={false} />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
