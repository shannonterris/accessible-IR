import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import _ from "lodash";

export default function DropZone() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const { sendImage } = useConversations();
  let currentLayout = []; // i think this will get reset every render??????
  const [tiles, setTiles] = useState([]); // maybe move this outside....?

  const onLayoutChange = (layout, layouts) => {
    // Saving to a State doesn't work for some reason so just save to a const
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
    <div>
      <ResponsiveGridLayout
        isDraggable
        measureBeforeMount={true}
        useCSSTransforms={true}
        compactType={"vertical"}
        isDroppable={true}
        cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
        onDrop={onDrop}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        {tiles.map((tile) => (
          <div className="dashboard-item" key={tile.i} data-grid={tile}>
            <span className="remove" onClick={(e) => onRemoveItem(tile.i)}>
              x
            </span>
            <Image src={tile.i} fluid draggable={false} />
          </div>
        ))}
      </ResponsiveGridLayout>
      <Button onClick={sendImages}>Send Grid</Button>
    </div>
  );
}
