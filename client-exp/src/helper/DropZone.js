import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { Image, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useConversations } from "../contexts/ConversationsProvider";
import _ from "lodash";

export default function DropZone({ tiles, setTiles }) {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const { sendImage } = useConversations();
  const gridWidth = 600;

  const onLayoutChange = (layout, layouts) => {
    setTiles(layout);
  };

  const onRemoveItem = (itemKey) => {
    const currentTiles = tiles;
    setTiles(currentTiles.filter((tile) => tile.i !== itemKey));
  };

  const onDrop = (layout, layoutItem, _event) => {
    const dt = _event.dataTransfer;
    // get image url
    const html = dt.getData("text/html");
    const match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
    const url = match && match[1];
    const width = parseInt(/\bwidth: "?([^"\s]+)"?\s*px;/.exec(html)[1]);
    const height = parseInt(/\bheight: "?([^"\s]+)"?\s*px;/.exec(html)[1]);

    // TODO: calculate w and h according to the items width and height!
    const yRatio = height / width; // this is wrong making it too small
    const heightItem = ((gridWidth / 2) * yRatio) / 200; // calculate current height and divide by 100px

    const currentTiles = layout;
    const results = currentTiles.filter(
      (tile) => tile.i !== "__dropping-elem__"
    );
    results.push({
      w: 1,
      h: heightItem,
      x: layoutItem.x,
      y: layoutItem.y,
      i: url,
      moved: false,
      static: false,
    });
    setTiles(results);
  };

  const sendImages = () => {
    // send new image message using server
    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();
    console.log(tiles);
    sendImage(JSON.stringify(tiles), timestamp);
    setTiles([]); // After sending image clear current grid
  };

  return (
    <div className="w-100">
      {tiles.length === 0 ? (
        <h4
          className="justify-content-center d-flex p-4 mb-0"
          style={{ "background-color": "#adfff4" }}
        >
          Drag Images Here
        </h4>
      ) : null}
      <GridLayout
        isDraggable
        measureBeforeMount={true}
        useCSSTransforms={true}
        compactType={"vertical"}
        isDroppable={true}
        rowHeight={200}
        cols={2}
        maxRows={4}
        width={gridWidth}
        onDrop={onDrop}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        style={{ minHeight: "200px" }}
      >
        {tiles.map((tile) => (
          <div
            className="dashboard-item"
            key={tile.i}
            data-grid={tile}
            style={{ overflow: "hidden", position: "relative" }}
          >
            <Button className="remove" onClick={(e) => onRemoveItem(tile.i)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            >
              <Image src={tile.i} fluid draggable={false} />
            </div>
          </div>
        ))}
      </GridLayout>
      <div className="border-bottom p-3 justify-content-end d-flex">
        <Button onClick={sendImages}>Send Grid</Button>
      </div>
    </div>
  );
}
