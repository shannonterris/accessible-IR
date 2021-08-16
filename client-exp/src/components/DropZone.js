import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive, GridLayout } from "react-grid-layout";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import _ from "lodash";

export default function DropZone() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const { sendImage } = useConversations();
  let currentLayout = []; // i think this will get reset every render??????
  const [tiles, setTiles] = useState([]); // maybe move this outside....?
  // TODO: set gridChanged to disable button when relevant
  const [gridChanged, setGridChanged] = useState(true);

  const onLayoutChange = (layout, layouts) => {
    currentLayout = layout; // This stores the current layout to be sent through the button
  };

  const onRemoveItem = (itemKey) => {
    const currentTiles = currentLayout;
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
    // const yRatio = height / width; // this is wrong making it too small
    // const heightItem = (gridWidth * yRatio) / 200; // calculate current height and divide by 100px

    const currentTiles = layout;
    const results = currentTiles.filter(
      (tile) => tile.i !== "__dropping-elem__"
    );
    results.push({
      w: 1,
      h: 1,
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
    console.log(currentLayout);
    sendImage(JSON.stringify(currentLayout), timestamp);
  };

  return (
    <div className="w-100">
      <ResponsiveGridLayout
        isDraggable
        measureBeforeMount={true}
        useCSSTransforms={true}
        compactType={"vertical"}
        isDroppable={true}
        rowHeight={200}
        cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
        maxRows={4}
        onDrop={onDrop}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        {tiles.map((tile) => (
          <div
            className="dashboard-item"
            key={tile.i}
            data-grid={tile}
            style={{ overflow: "hidden" }}
          >
            <span className="remove" onClick={(e) => onRemoveItem(tile.i)}>
              x
            </span>
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
      </ResponsiveGridLayout>
      {gridChanged ? (
        <Button onClick={sendImages}>Send Grid</Button>
      ) : (
        <Button disabled>Send Grid</Button>
      )}
    </div>
  );
}
