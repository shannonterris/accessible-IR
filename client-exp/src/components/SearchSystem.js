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
    // bingSearch(searchText, setImages);
    setImages(IMAGES);
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

  // image testing
  const imagesTest = [
    {
      image:
        "https://blog.playstation.com/tachyon/2020/11/Featured-Image-Genshin-Impact-update-out-tomorrow.jpg?resize=1088,612&crop_strategy=smart",
    },
    {
      image:
        "https://media.wired.com/photos/5f74d2f4df8a35780989d792/master/pass/Genshin%20Impact%20_Keyart.png",
    },
    {
      image:
        "https://cdn.vox-cdn.com/thumbor/lr3mKvP6Dnd-rJnEyEow2Qkf9ak=/0x0:1200x720/1200x800/filters:focal(504x264:696x456)/cdn.vox-cdn.com/uploads/chorus_image/image/69053656/genshin.0.jpg",
    },
    {
      image:
        "https://blog.playstation.com/tachyon/2021/04/PS5-KeyArt_No-Logo.jpg?resize=1088,612&crop_strategy=smart",
    },
    {
      image:
        "https://www.pcgamesn.com/wp-content/uploads/2021/05/genshin-impact-1-6-release-date-update-patch-1-1-900x506.jpg",
    },
    {
      image:
        "https://blog.playstation.com/tachyon/2020/11/Featured-Image-Genshin-Impact-update-out-tomorrow.jpg",
    },
    {
      image:
        "https://media.wired.com/photos/5f74d2f4df8a35780989d792/191:100/w_3819,h_1999,c_limit/Genshin%20Impact%20_Keyart.png",
    },
    {
      image:
        "https://i.pcmag.com/imagery/articles/0011VhJ38AwfUQlBjwzV2F9-1..1602863308.png",
    },
    {
      image:
        "https://media.npr.org/assets/img/2020/11/25/genshin_wide-59ae4e3c66176e7b048f5c7dbf2abd4b136cbe00.jpg",
    },
    {
      image:
        "https://blog.playstation.com/tachyon/2020/11/Featured-Image-Genshin-Impact-update-out-tomorrow.jpg?fit=1024,720",
    },
    {
      image:
        "https://media.wired.com/photos/5f74d2f4df8a35780989d792/master/w_2560%2Cc_limit/Genshin%252520Impact%252520_Keyart.png",
    },
    {
      image:
        "https://www.pcgamesn.com/wp-content/uploads/2021/05/genshin-impact-1-6-release-date-update-patch-1-1-900x506.jpg",
    },
    {
      image:
        "https://img.olhardigital.com.br/wp-content/uploads/2021/02/Genshin_Impact_Key_Art_EN.jpg",
    },
    {
      image:
        "https://sensortower-itunes.s3.amazonaws.com/blog/2021/03/genshin-impact-hits-1-billion-revenue.jpg",
    },
    {
      image:
        "https://cdn.images.express.co.uk/img/dynamic/143/590x/Genshin-Impact-Codes-1447334.jpg?r=1623211315321",
    },
    {
      image:
        "https://sensortower-itunes.s3.amazonaws.com/blog/2020/12/genshin-impact-400-million-first-two-months.jpg",
    },
    {
      image:
        "https://sm.pcmag.com/t/pcmag_uk/review/g/genshin-im/genshin-impact-for-pc_xds8.1920.jpg",
    },
    {
      image:
        "https://www.nme.com/wp-content/uploads/2021/03/Genshin-Impact-miHoYo.jpg",
    },
    {
      image:
        "https://cdn.vox-cdn.com/thumbor/kVnWt1ohHUsKtLLbQBChZChzI8s=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/67678719/paimon.0.jpeg",
    },
    {
      image: "https://cdn.mos.cms.futurecdn.net/y33vguPCnvSmfCWTUbimUf.jpg",
    },
    {
      image:
        "https://media.wired.com/photos/5f74d2f4df8a35780989d792/2:1/w_3839,h_1919,c_limit/Genshin%20Impact%20_Keyart.png",
    },
    {
      image:
        "https://www.pockettactics.com/wp-content/uploads/2021/03/genshin-impact-sucrose-1-1200x675.jpg",
    },
    {
      image:
        "https://specials-images.forbesimg.com/imageserve/5f7320fbad583ae941142a2e/960x0.jpg?fit=scale",
    },
    {
      image:
        "https://media.wired.com/photos/5f74d2f4df8a35780989d792/1:1/w_2160,h_2160,c_limit/Genshin%20Impact%20_Keyart.png",
    },
    {
      image: "https://img.youtube.com/vi/jEp9yyhwZFE/maxresdefault.jpg",
    },
    {
      image:
        "https://www.pockettactics.com/wp-content/uploads/2021/03/genshin-impact-sucrose-1.jpg",
    },
    {
      image:
        "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2020/10/12/02f3388a-0c44-11eb-94e0-02af7fd927c6_image_hires_142743.jpg?itok=ZUWS528M&v=1602484069",
    },
    {
      image:
        "https://www.pcgamesn.com/wp-content/uploads/2021/04/genshin-impact-eula-build-best.jpg",
    },
    {
      image:
        "https://cdn.vox-cdn.com/thumbor/_iYk4zB2dHdcqTs6YF4cGuWhKqk=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21955650/genshin.jpg",
    },
    {
      image:
        "https://www.nme.com/wp-content/uploads/2020/10/Genshin-Impact-2.jpg",
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
